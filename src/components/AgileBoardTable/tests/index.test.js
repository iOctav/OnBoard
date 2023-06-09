import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardTable from '../index';
import { useGetSpecificSprintForSpecificAgileQuery } from '../../../features/sprint/sprintSlice';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
  useDispatch: () => mockDispatch
}));
jest.mock('@jetbrains/ring-ui/dist/loader-screen/loader-screen', () => () => (<div data-testid="loader-screen"/>));

jest.mock('../../../features/card/cardSlice');
jest.mock('../../../features/sprint/sprintSlice');

const mockSwimlanesDepth = jest.fn();
jest.mock('../../AgileBoardHeader', () => ({swimlanesDepth}) => {
  mockSwimlanesDepth(swimlanesDepth);
  (<thead data-testid="agile-board-header"/>)
});
jest.mock('../../AgileBoardData', () => () =>
  (<tbody data-testid="agile-board-data"/>));
jest.mock('../AgileBoardColGroup', () => ({swimlanesDepth}) => {
  mockSwimlanesDepth(swimlanesDepth);
  (<thead data-testid="agile-board-col-group"/>)
});
jest.mock('../../ErrorPage', () => ({message, description}) =>
  (<div data-testid="error-page" title={description}>{message}</div>));


describe('AgileBoardTable', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileBoardTable with props', () => {
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isSuccess: true, data: {name: 'sprint-name'}});
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    expect(screen.getByTestId('agile-board-table')).toBeInTheDocument();
  });

  it('should render LoaderScreen while loading', () => {
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isLoading: true});
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    expect(screen.getByTestId('loader-screen')).toBeInTheDocument();
  });

  it('should render LoaderScreen while not data', () => {
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isSuccess: true, data: undefined});
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    expect(screen.getByTestId('loader-screen')).toBeInTheDocument();
  });

  it('should render AgileBoardTable when error but data was loaded', () => {
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isSuccess: true, isError: true, data: {name: 'sprint-name'}});
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    expect(screen.getByTestId('agile-board-table')).toBeInTheDocument();
  });

  it('should render ErrorPage when error and data was not loaded', () => {
    const errorData = {errorTitle: 'error-title', errorDescription: 'error-message'};
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isError: true, error: errorData});
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
    expect(errorPage.textContent).toBe(errorData.errorTitle);
    expect(errorPage.title).toBe(errorData.errorDescription);
  });

  it('should provide swimlanesDepth depends on count of swimlanes in settings', () => {
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isSuccess: true, data: {name: 'sprint-name'}});
    mockSelector
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce([{key: 'key-1'}, {key: 'key-2'}])
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    expect(screen.getByTestId('agile-board-table')).toBeInTheDocument();
    expect(mockSwimlanesDepth).toHaveBeenNthCalledWith(2, 2);
  });

  it('should click on table dispatch event', () => {
    useGetSpecificSprintForSpecificAgileQuery.mockReturnValue({isSuccess: true, data: {name: 'sprint-name'}});
    act(() => {
      root.render(<AgileBoardTable visible agileId="agile-id" agileName="agile-name" sprintId="sprint-id" columnFieldName="column-field"/>);
    });

    const table = screen.getByTestId('agile-board-table');
    fireEvent.click(table);
    expect(table).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
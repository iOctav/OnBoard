import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardHeader from '../index';

const mockColumnsSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockColumnsSelector(),
}));

jest.mock('../../../features/sprint/sprintSlice');
jest.mock('../../FakeTableCells', () => ({swimlanesDepth}) =>
  [...Array(swimlanesDepth).keys()].map((ind) => (<td key={ind} data-testid="fake-table-cell" />)));
jest.mock('../HeaderCell', () => ({agileName, sprintName, fieldName, cardsCount, column, explicitQuery}) =>
  (<td data-testid="header-cell" />));

describe('AgileBoardHeader', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("table");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileBoardHeader without column', () => {
    act(() => {
      root.render(<AgileBoardHeader agileName="agile-test" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('agile-board-header')).toBeInTheDocument();
  });

  it('should render AgileBoardHeader with one column', () => {
    const columns = [{
      id: 'column-1',
      cardsCount: 0
    }];
    mockColumnsSelector.mockReturnValue(columns);
    act(() => {
      root.render(<AgileBoardHeader agileName="agile-test" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('agile-board-header')).toBeInTheDocument();
    expect(screen.getAllByTestId('header-cell').length).toBe(1);
  });

  it('should render AgileBoardHeader with several column', () => {
    const columns = [{
      id: 'column-1',
      cardsCount: 0
    },{
      id: 'column-2',
      cardsCount: 3
    },{
      id: 'column-3',
      cardsCount: 7
    }];
    mockColumnsSelector.mockReturnValue(columns);
    act(() => {
      root.render(<AgileBoardHeader agileName="agile-test" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('agile-board-header')).toBeInTheDocument();
    expect(screen.getAllByTestId('header-cell').length).toBe(3);
  });

  it('should render sticky AgileBoardHeader', () => {
    act(() => {
      root.render(<AgileBoardHeader agileName="agile-test" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('agile-board-header')).toHaveStyle('position: sticky');
  });

  it('should render AgileBoardHeader with swimlanesDepth more than 0', () => {
    act(() => {
      root.render(<AgileBoardHeader agileName="agile-test" fieldName="field-name" swimlanesDepth={5}/>);
    });

    expect(screen.getAllByTestId('fake-table-cell').length).toBe(5);
  });

  it('should render AgileBoardHeader with swimlanesDepth is 0', () => {
    act(() => {
      root.render(<AgileBoardHeader agileName="agile-test" fieldName="field-name" swimlanesDepth={0}/>);
    });

    expect(screen.queryAllByTestId('fake-table-cell').length).toBe(0);
  });
});

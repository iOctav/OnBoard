import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import HeaderCell from '../HeaderCell';
import { updateColumn } from '../../../features/sprint/sprintSlice';
import { issuesQueryUri } from '../../../services/linkService';
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

jest.mock('../../../features/sprint/sprintSlice');

const mockHref = jest.fn();
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children, href, ...props}) => {
  mockHref(href);
  return (<button data-testid="button" {...props}>{children}</button>);
});
describe('HeaderCell', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("tr");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render HeaderCell with correct props', () => {
    act(() => {
      root.render(<HeaderCell agileName="agile-test" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('header-cell-td')).toBeInTheDocument();
  });

  it('should render Button with correct collapse/expand icon', () => {
    const columnData = { collapsed: true, agileColumn: { presentation: 'agileColumn-test' }};
    act(() => {
      root.render(<HeaderCell column={columnData} agileName="agile-test" fieldName="field-name"/>);
    });

    const button = screen.getByTestId('collapse-button');
    expect(button).toHaveTextContent('agileColumn-test');
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(updateColumn({changes: {collapsed: false}}))
  });

  it('should render Button with cards count', () => {
    const cardsCount = 5;
    const columnData = { collapsed: true, agileColumn: { presentation: 'agileColumn-test' }};
    act(() => {
      root.render(<HeaderCell column={columnData} cardsCount={cardsCount} agileName="agile-test" fieldName="field-name"/>);
    });

    const cardsCounter = screen.getByTestId('cards-count');
    expect(cardsCounter).toHaveTextContent(cardsCount);
    expect(cardsCounter.title).toBe('1 card');
  });

  it('should render Button with issues link', () => {
    const cardsCount = 5;
    act(() => {
      root.render(<HeaderCell cardsCount={cardsCount} agileName="agile-test" fieldName="field-name"/>);
    });

    const issuesLink = screen.getByTestId('issues-link-button');
    expect(issuesLink).toBeInTheDocument();
    expect(issuesLink.title).toBe('View all {{columnPresentation}} issues on the Issues list');
  });

  it('should render Button with hidden issues link', () => {
    const cardsCount = 5;
    act(() => {
      root.render(<HeaderCell cardsCount={cardsCount} agileName="agile-test" fieldName="field-name"/>);
    });

    const issuesLink = screen.getByTestId('issues-link-button');
    expect(issuesLink).toBeInTheDocument();
    expect(issuesLink).toHaveStyle('display: none;');
  });

  it('should make correct query for issue link', () => {
    const expectedQuery = 'has: {Board agile-test}';
    act(() => {
      root.render(<HeaderCell agileName="agile-test" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });

  it('should make correct query for issue link includes sprintname', () => {
    const expectedQuery = '{Board agile-test}: {test-sprint}';
    act(() => {
      root.render(<HeaderCell agileName="agile-test" sprintName="test-sprint" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });

  it('should make correct query for issue link includes sprintname and several fieldValues', () => {
    const columnData = { collapsed: true,
      agileColumn: { presentation: 'agileColumn-test', fieldValues: [ {presentation: 'test-value-1'},  {presentation: 'test-value-2'},  {presentation: 'test-value-3'}] }};
    const expectedQuery = '{Board agile-test}: {test-sprint} field-name: {test-value-1} field-name: {test-value-2} field-name: {test-value-3}';
    act(() => {
      root.render(<HeaderCell column={columnData} agileName="agile-test" sprintName="test-sprint" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });

  it('should make correct query for issue link includes sprintname and one fieldValue', () => {
    const columnData = { collapsed: true,
      agileColumn: { presentation: 'agileColumn-test', fieldValues: [ {presentation: 'test-value-1'}] }};
    const expectedQuery = '{Board agile-test}: {test-sprint} field-name: {test-value-1}';
    act(() => {
      root.render(<HeaderCell column={columnData} agileName="agile-test" sprintName="test-sprint" fieldName="field-name"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });

  it('should make correct query for issue link includes explicitQuery', () => {
    const expectedQuery = 'has: {Board agile-test} and (test-explicit-query)';
    act(() => {
      root.render(<HeaderCell agileName="agile-test" fieldName="field-name" explicitQuery="test-explicit-query"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });

  it('should make correct query for issue link includes sprintName and explicitQuery', () => {
    const expectedQuery = '{Board agile-test}: {test-sprint} and (test-explicit-query)';
    act(() => {
      root.render(<HeaderCell agileName="agile-test" sprintName="test-sprint" fieldName="field-name" explicitQuery="test-explicit-query"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });

  it('should make correct query for issue link includes sprintName, fieldValues and explicitQuery', () => {
    const columnData = { collapsed: true,
      agileColumn: { presentation: 'agileColumn-test', fieldValues: [ {presentation: 'test-value-1'}] }};
    const expectedQuery = '{Board agile-test}: {test-sprint} field-name: {test-value-1} and (test-explicit-query)';
    act(() => {
      root.render(<HeaderCell column={columnData} agileName="agile-test" sprintName="test-sprint" fieldName="field-name" explicitQuery="test-explicit-query"/>);
    });

    expect(screen.getByTestId('issues-link-button')).toBeInTheDocument();
    expect(mockHref).toHaveBeenCalledWith(issuesQueryUri(expectedQuery));
  });
});

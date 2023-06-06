import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardRows from '../index';

jest.mock('../BoardRow', () => ({isOrphan, swimlaneTitle}) =>
  (<tr data-testid={isOrphan ? 'orphan-row' : 'swimlane-row'}><td>{swimlaneTitle}</td></tr>));

describe('AgileBoardRows', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("tbody");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileBoardRows', () => {
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name" currentSwimlanes={[]} trimmedSwimlanes={[]}/>);
    });

    expect(screen.getByTestId('orphan-row')).toBeInTheDocument();
  });

  it('should render AgileBoardRows with hideOrphansSwimlane', () => {
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name" hideOrphansSwimlane currentSwimlanes={[]} trimmedSwimlanes={[]}/>);
    });

    expect(screen.queryByTestId('orphan-row')).not.toBeInTheDocument();
  });

  it('should render AgileBoardRows with trimmedSwimlanes and hideOrphansSwimlane', () => {
    const trimmedSwimlanes = [{id: 'swimlane-1'}, {id: 'swimlane-2'}];
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name" hideOrphansSwimlane currentSwimlanes={[]} trimmedSwimlanes={trimmedSwimlanes}/>);
    });

    expect(screen.getAllByTestId('swimlane-row').length).toBe(2);
  });

  it('should render AgileBoardRows with trimmedSwimlanes and orphan', () => {
    const trimmedSwimlanes = [{id: 'swimlane-1'}, {id: 'swimlane-2'}];
    const orphanRow = {id: 'orphan-row'};
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name"
          currentSwimlanes={[]} orphanRow={orphanRow} trimmedSwimlanes={trimmedSwimlanes}/>);
    });

    expect(screen.getByTestId('orphan-row')).toBeInTheDocument();
    expect(screen.getAllByTestId('swimlane-row').length).toBe(2);
  });

  it('should render AgileBoardRows without swimlanes and unnamed orphan row', () => {
    const orphanRow = {id: 'orphan-row'};
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name"
                                  currentSwimlanes={[]} orphanRow={orphanRow} trimmedSwimlanes={[]}/>);
    });

    const orphanRowElem = screen.getByTestId('orphan-row');
    expect(orphanRowElem).toBeInTheDocument();
    expect(orphanRowElem.textContent).toBe('');
    expect(screen.queryAllByTestId('swimlane-row').length).toBe(0);
  });

  it('should render AgileBoardRows with swimlanes and uncategorized orphan row', () => {
    const trimmedSwimlanes = [{id: 'swimlane-1'}, {id: 'swimlane-2'}];
    const orphanRow = {id: 'orphan-row'};
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name"
                                  currentSwimlanes={[]} orphanRow={orphanRow} trimmedSwimlanes={trimmedSwimlanes}/>);
    });

    const orphanRowElem = screen.getByTestId('orphan-row');
    expect(orphanRowElem.textContent).toBe('Uncategorized Cards');
  });

  it('should render AgileBoardRows for values swimlane', () => {
    const trimmedSwimlanes = [{id: 'swimlane-1', value: {presentation: 'swimlane-value-1'}}];
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name"
                                  currentSwimlanes={[]} trimmedSwimlanes={trimmedSwimlanes}/>);
    });

    expect(screen.getByTestId('swimlane-row').textContent).toBe('swimlane-value-1');
  });

  it('should render AgileBoardRows for issues swimlane', () => {
    const trimmedSwimlanes = [{id: 'swimlane-1', issue: {summary: 'swimlane-issue-1'}}];
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name"
                                  currentSwimlanes={[]} trimmedSwimlanes={trimmedSwimlanes}/>);
    });

    expect(screen.getByTestId('swimlane-row').textContent).toBe('swimlane-issue-1');
  });

  it('should render AgileBoardRows with trimmedSwimlanes and orphan when orphan at the top', () => {
    const trimmedSwimlanes = [{id: 'swimlane-1'}, {id: 'swimlane-2'}];
    const orphanRow = {id: 'orphan-row'};
    act(() => {
      root.render(<AgileBoardRows agileId="agile-test" sprintId="field-name" orphansAtTheTop
                                  currentSwimlanes={[]} orphanRow={orphanRow} trimmedSwimlanes={trimmedSwimlanes}/>);
    });

    expect(screen.getByTestId('orphan-row')).toBeInTheDocument();
    expect(screen.getAllByTestId('swimlane-row').length).toBe(2);
    expect(container.children[0].getAttribute('data-testid')).toBe('orphan-row');
  });
});

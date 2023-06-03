import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCardSubtask from '../index';

let mockMakeDataset = null;


jest.mock('@jetbrains/ring-ui/dist/list/list', () => {
  const mockList = ({children}) =>
    (<div data-testid="list">{children}</div>);
  mockList.ListProps = {
    Type: {
      CUSTOM: 'CUSTOM',
    }
  }
  return mockList;
});
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({title, children}) =>
  (<div data-testid="button" title={title}>{children}</div>));

jest.mock('../../../features/sprint/sprintSlice');
jest.mock('../../LazySelectBox', () => ({customAnchor, makeDataset, children}) => {
  mockMakeDataset = makeDataset;
  return (<div data-testid="lazy-select-box">{customAnchor({},{},{})}{children}</div>);
});


describe('AgileCardSubtask', () => {
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

  it('should render AgileCardSubtask with props', () => {
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" />);
    });

    expect(screen.getByTestId('agile-card-subtask')).toBeInTheDocument();
  });

  it('should render AgileCardSubtask with subtasks', () => {
    const subtasks = {
      issuesSize: 2,
      id: 'subtasks-id',
      unresolvedIssuesSize: 0,
    };
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" subtasks={subtasks} />);
    });

    expect(screen.getByTestId('agile-card-subtask')).toBeInTheDocument();

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.title).toBe('Subtasks');
    expect(button.textContent).toBe('2/2');
  });

  it('should render AgileCardSubtask with unresolved subtasks', () => {
    const subtasks = {
      issuesSize: 5,
      id: 'subtasks-id',
      unresolvedIssuesSize: 3,
    };
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" subtasks={subtasks} />);
    });

    expect(screen.getByTestId('button').textContent).toBe('2/5');
  });

  it('should make dataset with Custom type and template', () => {
    const subtasks = {
      issuesSize: 5,
      id: 'subtasks-id',
      unresolvedIssuesSize: 3,
    };
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" subtasks={subtasks} />);
    });

    const dataset = mockMakeDataset([
      { idReadable: 'id-1', resolved: true, summary: 'summary-1' },
      { idReadable: 'id-2', resolved: false, summary: 'summary-2' },
    ]);

    expect(dataset.length).toBe(2);
    expect(dataset[0].rgItemType).toBe('CUSTOM');
    expect(dataset[0].template).toBeDefined();
  });

  it('should cross out subtask in the list when it is resolved', () => {
    const subtasks = {
      issuesSize: 5,
      id: 'subtasks-id',
      unresolvedIssuesSize: 3,
    };
    const serverData = [
      { idReadable: 'id-1', resolved: true, summary: 'summary-1' },
      { idReadable: 'id-2', resolved: false, summary: 'summary-2' },
    ];
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" subtasks={subtasks} />);
    });

    const dataset = mockMakeDataset(serverData);

    const resolvedTask = dataset[0].template;
    expect(resolvedTask).toBeDefined();
    expect(resolvedTask.props.style.textDecoration).toBe('line-through');
    expect(resolvedTask.props.children).toBe(`${serverData[0].idReadable}: ${serverData[0].summary}`);
  });

  it('should not cross out subtask in the list when it is not resolved', () => {
    const subtasks = {
      issuesSize: 5,
      id: 'subtasks-id',
      unresolvedIssuesSize: 3,
    };
    const serverData = [
      { idReadable: 'id-1', resolved: true, summary: 'summary-1' },
      { idReadable: 'id-2', resolved: false, summary: 'summary-2' },
    ];
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" subtasks={subtasks} />);
    });

    const dataset = mockMakeDataset(serverData);

    const resolvedTask = dataset[1].template;
    expect(resolvedTask).toBeDefined();
    expect(resolvedTask.props.style.textDecoration).toBe('initial');
    expect(resolvedTask.props.children).toBe(`${serverData[1].idReadable}: ${serverData[1].summary}`);
  });
});
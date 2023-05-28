import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardData from '../index';
import { useGetIssuesByAgileSprintQuery } from '../../../features/sprint/sprintSlice';


jest.mock('../../../features/sprint/sprintSlice');
jest.mock('@jetbrains/ring-ui/dist/alert-service/alert-service', () => jest.fn());
jest.mock('../../AgileBoardRows', () => jest.fn());

describe('AgileBoardData', () => {
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

  it('should render AgileBoardData with props', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({ data: { entities: [] } });
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });

  it('should render light AgileBoardData while loading data', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({isLoading: true});
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });

  it('should render light AgileBoardData while fetching data', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({isFetching: true});
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });

  it('should render light AgileBoardData when error', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({isFetching: true});
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });

  it('should render AgileBoardData when success issues getting', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({isSuccess: true, data: { entities: [] }});
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });

  it('should render AgileBoardData when getting issues for orphan row only', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({isSuccess: true, data: { entities: [] }});
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
      sprint: {
        board: {
          orphanRow: {
            cells: [
              {
                issues: [{
                  id: 'issue-1',
                }]
              }
            ]
          },
          trimmedSwimlanes: [],
        }
      }
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(useGetIssuesByAgileSprintQuery).toHaveBeenCalledWith(['issue-1']);
    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });

  it('should render AgileBoardData when getting issues swimlane rows only', () => {
    useGetIssuesByAgileSprintQuery.mockReturnValue({isSuccess: true, data: { entities: [] }});
    const mockParams = {
      agileId: 'agile-1',
      sprintId: 'sprint-1',
      sprint: {
        board: {
          orphanRow: {
            cells: [ {
              issues: []
            }]
          },
          trimmedSwimlanes: [{
            cells: [
              {
                issues: [{
                  id: 'issue-1',
                }]
              }
            ]
          }],
        }
      }
    };
    act(() => {
      root.render(<AgileBoardData {...mockParams}/>);
    });

    expect(useGetIssuesByAgileSprintQuery).toHaveBeenCalledWith(['issue-1']);
    expect(screen.getByTestId('agile-board-data-tbody')).toBeInTheDocument();
  });
});

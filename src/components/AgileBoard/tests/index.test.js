import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import { useGetAgilesByIdQuery } from '../../../features/agile/agileSlice';
import AgileBoard from '../index';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  useParams: () => mockUseParams(),
  useLocation: () => ({ search: '?test=1' })
}));
jest.mock('../../../features/agile/agileSlice');
jest.mock('../../AgileSearchQueryPanel', () => jest.fn());
jest.mock('../../AgileTopToolbar', () => jest.fn());
jest.mock('../../AgileBoardSettings', () => jest.fn());
jest.mock('../../AgileBoardTable', () => jest.fn());
jest.mock('../AgileBoardFooter', () => jest.fn());
jest.mock('@jetbrains/ring-ui/dist/loader-screen/loader-screen', () => () =>
  (<div data-testid="loading"/>));

describe('AgileBoard', () => {
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

  it('should render AgileBoard', () => {
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'sprint-1' });
    const agile = {
      sprints: [{id: 'sprint-1'}],
      sprintsSettings: {},
    };
    useGetAgilesByIdQuery.mockReturnValue({isSuccess: true, data: agile});
    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.getByTestId('agile-board')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'sprint-1' });
    useGetAgilesByIdQuery.mockReturnValue({isLoading: true});

    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.queryByTestId('agile-board')).not.toBeInTheDocument();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorText = 'Some error';
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'sprint-1' });
    useGetAgilesByIdQuery.mockReturnValue({ error: errorText, isError: true });

    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.queryByTestId('agile-board')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    const error = screen.getByTestId('board-error');
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe(errorText);
  });

  it('should render error when sprint is not found', async () => {
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'sprint-1' });
    useGetAgilesByIdQuery.mockReturnValue({ isSuccess: true, data: { defaultAgile: undefined, sprints: [] }});

    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.queryByTestId('agile-board')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    const error = screen.getByTestId('board-error');
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe('Sprint not found');
  });

  it('should render AgileBoard with current sprint', () => {
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'current' });
    const agile = {
      sprints: [{id: 'sprint-1'}, {id: 'sprint-2'}],
      currentSprint: {id: 'sprint-1'},
    };
    useGetAgilesByIdQuery.mockReturnValue({isSuccess: true, data: agile});
    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.getByTestId('agile-board')).toBeInTheDocument();
  });

  it('should render error when current sprint is not provided', async () => {
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'current' });
    const agile = {
      sprints: [{id: 'sprint-1'}, {id: 'sprint-2'}],
      currentSprint: undefined,
    };
    useGetAgilesByIdQuery.mockReturnValue({isSuccess: true, data: agile});

    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.queryByTestId('agile-board')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    const error = screen.getByTestId('board-error');
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe('Sprint not found');
  });

  it('should hide/show settings by toolbar button click', () => {
    mockUseParams.mockReturnValue({ agileId: 'agile-1', sprintId: 'sprint-1' });
    const agile = {
      sprints: [{id: 'sprint-1'}],
      sprintsSettings: {},
    };
    useGetAgilesByIdQuery.mockReturnValue({isSuccess: true, data: agile});
    act(() => {
      root.render(<AgileBoard/>);
    });

    expect(screen.getByTestId('agile-board')).toBeInTheDocument();
  });

});

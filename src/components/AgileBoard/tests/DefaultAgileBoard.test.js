import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import DefaultAgileBoard from '../DefaultAgileBoard';
import { useGetAgileUserProfileQuery } from '../../../app/services/youtrackApi';
import { agileBoardUri } from '../../../services/linkService';

jest.mock('../../../app/services/youtrackApi');
jest.mock('react-router-dom', () => ({
  Navigate: ({to}) => (<div data-testid="navigate">{to}</div>)
}));
jest.mock('@jetbrains/ring-ui/dist/loader-screen/loader-screen', () => () =>
  (<div data-testid="loading"/>));

describe('DefaultAgileBoard', () => {
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

  it('should render DefaultAgileBoard', () => {
    useGetAgileUserProfileQuery.mockReturnValue({isSuccess: true, data: { defaultAgile: { id: 'agile-1' }}});
    act(() => {
      root.render(<DefaultAgileBoard/>);
    });

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
  });

  it('should render DefaultAgileBoard with data', () => {
    const agileId = 'agile-1';
    const sprintId = 'sprint-1';
    useGetAgileUserProfileQuery.mockReturnValue({isSuccess: true, data: { defaultAgile: { id: agileId, currentSprint: { id: sprintId}} }});
    act(() => {
      root.render(<DefaultAgileBoard/>);
    });

    expect(screen.getByTestId('navigate').textContent).toBe(agileBoardUri(agileId, sprintId));
  });

  it('should render loading state', () => {
    useGetAgileUserProfileQuery.mockReturnValue({isLoading: true});

    act(() => {
      root.render(<DefaultAgileBoard/>);
    });

    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });


  it('should render error state', () => {
    const errorText = 'Some error';
    useGetAgileUserProfileQuery.mockReturnValue({ error: errorText, isError: true });

    act(() => {
      root.render(<DefaultAgileBoard/>);
    });

    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    const error = screen.getByTestId('board-error');
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe(errorText);
  });

  it('should render error when agile id not found', async () => {
    useGetAgileUserProfileQuery.mockReturnValue({ isSuccess: true, data: { defaultAgile: undefined }});

    act(() => {
      root.render(<DefaultAgileBoard/>);
    });

    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    const error = screen.getByTestId('board-error');
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe('Agile board not found');
  });

  it('should navigate to current sprint when it is not provided', async () => {
    const agileId = 'agile-1';
    useGetAgileUserProfileQuery.mockReturnValue({isSuccess: true, data: { defaultAgile: { id: agileId, currentSprint: undefined }}});

    act(() => {
      root.render(<DefaultAgileBoard/>);
    });
    expect(screen.getByTestId('navigate').textContent).toBe(agileBoardUri(agileId, 'current'));
  });

  it('should navigate to current sprint when it is not provided', async () => {
    const agileId = 'agile-1';
    useGetAgileUserProfileQuery.mockReturnValue({isSuccess: true, data: { defaultAgile: { id: agileId, currentSprint: undefined }}});

    act(() => {
      root.render(<DefaultAgileBoard/>);
    });
    expect(screen.getByTestId('navigate').textContent).toBe(agileBoardUri(agileId, 'current'));
  });
});

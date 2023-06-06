import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SmartProfile from '../index';
import { useGetCurrentUserInfoQuery } from '../../../features/auth/authSlice';

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({ authInfo: { authorized: true } })
}));

jest.mock('../../../features/auth/authSlice');

jest.mock('@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu', () => ({anchor}) =>
  (<div data-testid="dropdown-menu">{anchor}</div>));

const mockUsernamePassing = jest.fn()
jest.mock('@jetbrains/ring-ui/dist/avatar/avatar', () => ({
  __esModule: true,
  Size: { Size32: 'Size32' },
  default: ({size, username}) => {
    mockUsernamePassing(username);
    return <img data-testid="avatar" />;
  }
}));

describe('SmartProfile', () => {
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

  it('should render SmartProfile', () => {
    useGetCurrentUserInfoQuery.mockReturnValue({ data: {name: 'root'} });
    act(() => {
      root.render(<SmartProfile/>);
    });

    expect(mockUsernamePassing).toBeCalledWith('root');
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    useGetCurrentUserInfoQuery.mockReturnValue({ isLoading: true });

    act(() => {
      root.render(<SmartProfile/>);
    });

    expect(mockUsernamePassing).toBeCalledWith(undefined);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should render error state', () => {
    useGetCurrentUserInfoQuery.mockReturnValue({ error: 'Some error' });

    act(() => {
      root.render(<SmartProfile/>);
    });

    expect(mockUsernamePassing).toBeCalledWith(undefined);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should render user data when data is loaded', async () => {
    useGetCurrentUserInfoQuery.mockReturnValue({ data: { name: 'Test User' }, isLoading: false });

    act(() => {
      root.render(<SmartProfile/>);
    });

    expect(mockUsernamePassing).toBeCalledWith('Test User');
    await waitFor(() => expect(screen.getByTestId('avatar')).toBeInTheDocument());
  });

  it('should render guest avatar', async () => {
    useGetCurrentUserInfoQuery.mockReturnValue({ data: { name: undefined }, isLoading: false });

    act(() => {
      root.render(<SmartProfile/>);
    });

    expect(mockUsernamePassing).toBeCalledWith('guest');
    await waitFor(() => expect(screen.getByTestId('avatar')).toBeInTheDocument());
  });
});

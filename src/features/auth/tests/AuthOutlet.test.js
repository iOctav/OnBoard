import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AuthOutlet from '../AuthOutlet';

const mockUseAuth = jest.fn();
const mockWindowsOpen = jest.fn();
window.open = mockWindowsOpen;

jest.mock('@jetbrains/ring-ui/dist/loader-screen/loader-screen', () => () =>
  (<div data-testid="loading"/>));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('react-router-dom', () => ({
  Outlet: () => (<div data-testid="outlet"/>),
  useLocation: () => ({ search: '?test=1', pathname: '/test' }),
}));

describe('AuthOutlet', () => {
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

  it('should render AuthOutlet', () => {
    mockUseAuth.mockReturnValue({
      authInfo: {
        authorized: true,
      },
    });
    act(() => {
      root.render(<AuthOutlet/>);
    });

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('should render LoaderScreen and redirect if not authorized', () => {
    mockUseAuth.mockReturnValue({
      authInfo: {
        authorized: false,
      },
    });
    act(() => {
      root.render(<AuthOutlet/>);
    });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(mockWindowsOpen).toHaveBeenNthCalledWith(1, expect.any(String), '_self');
  });
});

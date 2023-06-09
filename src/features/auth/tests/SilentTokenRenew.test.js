import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SilentTokenRenew from '../SilentTokenRenew';

const mockDispatch = jest.fn();
const mockGetLocalTokenInfo = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch()
}));

jest.mock('../authSlice', () => ({
  setCredentials: () => jest.fn(),
}));

jest.mock('../oauthUtils', () => ({
  ...jest.requireActual('../oauthUtils'),
  getLocalTokenInfo: () => mockGetLocalTokenInfo(),
}));

describe('SilentTokenRenew', () => {
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

  it('should render SilentTokenRenew', () => {
    act(() => {
      root.render(<SilentTokenRenew/>);
    });

    expect(screen.queryByTestId('silent-token-renew')).not.toBeInTheDocument();
  });

  it('should render SilentTokenRenew for expiring token', async () => {
    mockGetLocalTokenInfo.mockReturnValue({
      access_token: 'access_token',
      expires_at: Date.now() / 1000,
    })
    jest.useFakeTimers();
    act(() => {
      root.render(<SilentTokenRenew/>);
    });
    expect(screen.queryByTestId('silent-token-renew')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(20000)
    });

    await waitFor(() => expect(screen.getByTestId('silent-token-renew')).toBeInTheDocument());
  });

  it('should renew token', async () => {
    mockGetLocalTokenInfo.mockReturnValue({
      access_token: 'access_token',
      expires_at: Date.now() / 1000,
    })
    jest.useFakeTimers();
    act(() => {
      root.render(<SilentTokenRenew/>);
    });
    expect(screen.queryByTestId('silent-token-renew')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(20000)
    });

    const frame = await waitFor(() => screen.getByTestId('silent-token-renew'));
    fireEvent.load(frame);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
});

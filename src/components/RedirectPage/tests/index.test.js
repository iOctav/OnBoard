import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import RedirectPage from '../index';

const mockLocationReplace = jest.fn();
const mockDescription = jest.fn();
const mockMessage = jest.fn();
jest.mock('react-router-dom', () => ({
  Link: ({children}) => (<div data-testid="link">{children}</div>),
  useLocation: () => ({ pathname: '/test', search: '?test=1' })
}));

jest.mock('@jetbrains/ring-ui/dist/error-message/error-message', () => ({message, description, children}) => {
  mockMessage(message);
  mockDescription(description);
  return (<div data-testid="error-message">{children}</div>);
});

describe('RedirectPage', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
    Object.defineProperty(window, "location", {
      value: {
        replace: mockLocationReplace,
      },
      writable: true
    });
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render RedirectPage', () => {
    act(() => {
      root.render(<RedirectPage/>);
    });

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(mockDescription).toHaveBeenCalledWith(process.env.REACT_APP_YOUTRACK_BASE_URL + '/test?test=1');
  });

  it('should render RedirectPage with props', () => {
    let redirectTimeout = 10;
    jest.useFakeTimers();
    act(() => {
      root.render(<RedirectPage redirectTimeout={redirectTimeout}/>);
    });
    expect(screen.getByTestId('error-message')).toBeInTheDocument();

    for(let i = 0; i < redirectTimeout; i++) {
      expect(mockLocationReplace).not.toHaveBeenCalled();
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(mockMessage).toHaveBeenCalledWith(`Will redirect to YouTrack in ${redirectTimeout - i} seconds...`);
    }
    expect(mockLocationReplace).toHaveBeenCalledWith(process.env.REACT_APP_YOUTRACK_BASE_URL + '/test?test=1');
  });

  it('should render RedirectPage with negative redirect timeout', () => {
    let redirectTimeout = -3;
    jest.useFakeTimers();
    act(() => {
      root.render(<RedirectPage redirectTimeout={redirectTimeout}/>);
    });
    expect(screen.getByTestId('error-message')).toBeInTheDocument();

    for(let i = 0; i < 3; i++) {
      expect(mockLocationReplace).not.toHaveBeenCalled();
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(mockMessage).toHaveBeenCalledWith(`Will redirect to YouTrack in ${3 - i} seconds...`);
    }
  });

  it('should render RedirectPage with decimal redirect timeout', () => {
    let redirectTimeout = 3.1;
    jest.useFakeTimers();
    act(() => {
      root.render(<RedirectPage redirectTimeout={redirectTimeout}/>);
    });
    expect(screen.getByTestId('error-message')).toBeInTheDocument();

    for(let i = 0; i < Math.ceil(redirectTimeout); i++) {
      expect(mockLocationReplace).not.toHaveBeenCalled();
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      expect(mockMessage).toHaveBeenCalledWith(`Will redirect to YouTrack in ${Math.ceil(redirectTimeout) - i} seconds...`);
    }
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import App from './App';

jest.mock('@jetbrains/ring-ui/dist/style.css', () => ({}));
jest.mock('react-dnd', () => ({
  DndProvider: ({children}) => <div data-testid="dnd-provider">{children}</div>,
}));
jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: jest.fn(),
}));
jest.mock('@jetbrains/ring-ui/dist/global/theme', () => ({
  __esModule: true,
  ThemeProvider: ({ children }) =>
    (<div data-testid="theme-provider" href="123">{children}</div>),
  default: { AUTO: 'auto', LIGHT: 'light' }
}));

jest.mock('./AgileRoutePage', () =>
  ({}) => (<div data-testid="agile-route-page">Mocked AgileRoutePage</div>)
);

jest.mock('../features/auth/SilentTokenRenew', () =>
  ({}) => (<div data-testid="silent-token-renew">Mocked SilentTokenRenew</div>)
);

describe('App', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    container.remove();
    container = null;
  });

  it("should render App", () => {
    act(() => {
      root.render(<App/>);
    });

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('silent-token-renew')).toBeInTheDocument();
    expect(screen.getByTestId('agile-route-page')).toBeInTheDocument();
    expect(screen.getByTestId('dnd-provider')).toBeInTheDocument();
  });
});

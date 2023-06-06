import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ErrorPage from '../index';

jest.mock('react-router-dom', () => ({
  Link: ({children}) => (<div data-testid="link">{children}</div>),
}));
jest.mock('@jetbrains/ring-ui/dist/error-message/error-message', () => ({message, description, children}) =>
  (<div data-testid="error-message" title={description}>{message}{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));


describe('ErrorPage', () => {
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

  it('should render ErrorPage with props', () => {
    act(() => {
      root.render(<ErrorPage />);
    });

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import NewCardButton from '../index';

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));

describe('NewCardButton', () => {
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

  it('should render NewCardButton with props', () => {
    act(() => {
      root.render(<NewCardButton/>);
    });

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
});
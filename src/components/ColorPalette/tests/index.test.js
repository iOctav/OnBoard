import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColorPalette from '../index';

describe('ColorPalette', () => {
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

  it('should render ColorPalette', () => {
    act(() => {
      root.render(<ColorPalette/>);
    });

    expect(screen.getByTestId('color-palette')).toBeInTheDocument();
  });
});
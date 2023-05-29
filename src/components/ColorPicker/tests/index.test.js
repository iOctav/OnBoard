import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColorPicker from '../index';

jest.mock('@jetbrains/ring-ui/dist/popup/popup', () => ({children}) =>
  (<div data-testid="popup">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/dropdown/dropdown', () => ({anchor,children, ...props}) =>
  (<div data-testid="dropdown">{anchor}{children(props)}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<div data-testid="button">{children}</div>));

jest.mock('../../ColorPalette', () => () =>
  (<div data-testid="color-palette"/>));
jest.mock('../ColorAnchor', () => () =>
  (<div data-testid="color-anchor"/>));


describe('ColorPicker', () => {
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

  it('should render ColorPicker', () => {
    act(() => {
      root.render(<ColorPicker />);
    });

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  it('should render ColorPicker with Save and Cancel buttons', () => {
    act(() => {
      root.render(<ColorPicker />);
    });

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
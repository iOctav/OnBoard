import React from 'react';
import { act, screen, fireEvent } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColorPicker from '../index';


jest.mock('@jetbrains/ring-ui/dist/popup/popup', () => ({children}) =>
  (<div data-testid="popup">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/dropdown/dropdown', () => ({anchor,children, onHide, ...props}) => {
  props.onCloseAttempt = () => onHide();
  return (<div data-testid="dropdown">{anchor}{children(props)}</div>);
});

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({onClick, children}) =>
  (<div data-testid="button" onClick={onClick}>{children}</div>));

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

  it('should handle Save button', () => {
    const mockOnSave = jest.fn();
    const selectedColor = '12';
    act(() => {
      root.render(<ColorPicker selected={selectedColor} onSave={mockOnSave}/>);
    });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenNthCalledWith(1, selectedColor);
  });


  it('should handle Cancel button', () => {
    const mockOnCancel = jest.fn();
    const selectedColor = '12';
    act(() => {
      root.render(<ColorPicker selected={selectedColor} onCancel={mockOnCancel}/>);
    });

    const saveButton = screen.getByText('Cancel');
    fireEvent.click(saveButton);
    expect(mockOnCancel).toHaveBeenNthCalledWith(1, selectedColor);
  });
});
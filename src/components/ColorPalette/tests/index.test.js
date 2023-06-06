import React from 'react';
import { act, screen, fireEvent } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColorPalette from '../index';
import { COLORS } from '../colors';

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

  it('should render 35 color blocks', () => {
    act(() => {
      root.render(<ColorPalette/>);
    });

    expect(screen.getAllByText('a').length).toBe(35);
  });

  it('should handle click on color', () => {
    const mockOnSelect = jest.fn();
    act(() => {
      root.render(<ColorPalette onSelect={(id) => mockOnSelect(id)}/>);
    });

    expect(screen.getByTestId('color-palette')).toBeInTheDocument();
    const color13Block = screen.getByTestId('color-palette-block-13');
    expect(color13Block).toBeInTheDocument();
    act(() => {
      fireEvent.click(color13Block);
    });
    expect(mockOnSelect).toHaveBeenNthCalledWith(1, 13);
  });

  it('should active block that color is picked', () => {
    const pickedColor = 23;
    const colorDetails = COLORS[pickedColor];
    act(() => {
      root.render(<ColorPalette selected={`${pickedColor}`}/>);
    });

    expect(screen.getByTestId('color-palette')).toBeInTheDocument();
    const color23Block = screen.getByTestId(`color-palette-block-${colorDetails.brightness * 7 + colorDetails.tone + 1}`);
    expect(color23Block).toBeInTheDocument();
    expect(color23Block).toHaveStyle(`box-shadow: inset 0 0 0 1px var(--ring-border-hover-color),0 0 0 1px var(--ring-border-hover-color);`);
  });
});
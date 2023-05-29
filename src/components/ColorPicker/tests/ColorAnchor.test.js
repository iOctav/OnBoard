import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColorAnchor from '../ColorAnchor';

describe('ColorAnchor', () => {
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

  it('should render ColorAnchor with props', () => {
    act(() => {
      root.render(<ColorAnchor colorId={1}/>);
    });

    expect(screen.getByTestId('color-anchor')).toBeInTheDocument();
  });

  it('should render ColorAnchor without label', () => {
    act(() => {
      root.render(<ColorAnchor colorId={1}/>);
    });

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('should render ColorAnchor with label', () => {
    const label = 'label';
    act(() => {
      root.render(<ColorAnchor label={label} colorId={1}/>);
    });

    expect(screen.queryByText('A')).not.toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
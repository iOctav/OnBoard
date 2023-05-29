import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import FakeTableCells from '../index';

describe('FakeTableCells', () => {
  let container = null;
  let root = null;

  beforeEach(() => {
    container = document.createElement("tr");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render FakeTableCells with props', () => {
    act(() => {
      root.render(<FakeTableCells swimlanesDepth={1}/>);
    });

    expect(screen.getByTestId('fake-table-cell')).toBeInTheDocument();
  });
});
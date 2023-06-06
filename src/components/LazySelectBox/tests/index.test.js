import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import LazySelectBox from '../index';

jest.mock('@jetbrains/ring-ui/dist/select/select', () => ({data, selected}) =>
  (<select data-testid="select">
    {data.map((item, index) =>
      <option key={index} value={item.key} defaultValue={selected && selected.key === item.key}>{item.label}</option>
    )}
  </select>));

describe('LazySelectBox', () => {
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

  it('should render LazySelectBox with props', () => {
    const dataLoaderHook = () => [jest.fn()];
    act(() => {
      root.render(<LazySelectBox lazyDataLoaderHook={dataLoaderHook} makeDataset={jest.fn()}/>);
    });

    expect(screen.getByTestId('select')).toBeInTheDocument();
  });
});
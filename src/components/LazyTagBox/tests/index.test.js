import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import LazyTagBox from '../index';

jest.mock('@jetbrains/ring-ui/dist/tags-input/tags-input', () => ({dataSource, selected}) =>
  (<select data-testid="tags-input"/>));

describe('LazyTagBox', () => {
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

  it('should render LazyTagBox with props', () => {
    const dataLoaderHook = () => [jest.fn()];
    act(() => {
      root.render(<LazyTagBox lazyDataLoaderHook={dataLoaderHook} makeDataSource={jest.fn()}/>);
    });

    expect(screen.getByTestId('tags-input')).toBeInTheDocument();
  });
});
import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import NestedSwimlanesSettings from '../index';

jest.mock('../NestedSwimlanesList', () => () => <div data-testid="nested-swimlanes-list"/>);

describe('NestedSwimlanesSettings', () => {
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

  it('should render NestedSwimlanesSettings with props', () => {
    act(() => {
      root.render(<NestedSwimlanesSettings projectShortNames={[]}/>);
    });

    expect(screen.getByTestId('nested-swimlanes-list')).toBeInTheDocument();
  });
});
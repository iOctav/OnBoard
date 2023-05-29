import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileTopToolbar from '../index';

jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () =>
  ({children}) => (<div data-testid="button-group">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));
jest.mock('../../AgileSprintSelect', () => () =>
  (<div data-testid="agile-sprint-select"/>));

describe('AgileTopToolbar', () => {
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

  it('should render AgileTopToolbar with props', () => {
    act(() => {
      root.render(<AgileTopToolbar agileId="agile-id" onSettingsButtonClick={jest.fn}/>);
    });

    expect(screen.getByTestId('agile-top-toolbar')).toBeInTheDocument();
  });
});
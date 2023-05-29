import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCardSubtask from '../index';

jest.mock('@jetbrains/ring-ui/dist/list/list', () => ({children}) =>
  (<div data-testid="list">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<div data-testid="button">{children}</div>));

jest.mock('../../../features/sprint/sprintSlice');
jest.mock('../../LazySelectBox', () => ({customAnchor, children}) =>
  (<div data-testid="lazy-select-box">{customAnchor({},{},{})}{children}</div>));


describe('AgileCardSubtask', () => {
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

  it('should render AgileCardSubtask with props', () => {
    act(() => {
      root.render(<AgileCardSubtask issueId="issue-id" />);
    });

    expect(screen.getByTestId('agile-card-subtask')).toBeInTheDocument();
  });
});
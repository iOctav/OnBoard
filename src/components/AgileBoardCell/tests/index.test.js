import React from 'react';
import { wrapWithTestBackend } from 'react-dnd-test-utils'
import { act, screen, within } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileBoardCell from '../index';

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({ authInfo: { authorized: true } })
}));

const mockUpdateIssueField = jest.fn();

jest.mock('../../../features/sprint/sprintSlice', () => ({
  useUpdateIssueFieldMutation: () => [mockUpdateIssueField],
}));

jest.mock('@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu', () => ({anchor}) =>
  (<div data-testid="dropdown-menu">{anchor}</div>));
describe('AgileBoardCell', () => {
  let container = null;
  let root = null;
  let [AgileBoardCellContext, getBackend] = [];

  beforeEach(() => {
    [AgileBoardCellContext, getBackend] = wrapWithTestBackend(AgileBoardCell);
    container = document.createElement("div");
    root = ReactDOMClient.createRoot(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('should render AgileBoardCell with props', () => {
    act(() => {
      root.render(<AgileBoardCellContext agileId="1" sprintId="test-1"/>);
    });

    expect(screen.getByTestId('cell-container')).toBeInTheDocument();
  });

  it('should render AgileBoardCell with children', () => {
    act(() => {
      root.render(<AgileBoardCellContext agileId="1" sprintId="test-1">
        <div data-testid="test-child">Test Child</div>
      </AgileBoardCellContext>);
    });

    const cellContainer = screen.getByTestId('cell-container');
    expect(within(cellContainer).getByTestId('test-child')).toBeInTheDocument();
  });
});

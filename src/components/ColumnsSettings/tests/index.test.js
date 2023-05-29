import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColumnsSettings from '../index';

jest.mock('../ColumnsSettingsTable', () => ({children}) =>
  (<table data-testid="column-settings-table">{children}</table>));
jest.mock('../../LazySelectBox', () => ({children}) =>
  (<div data-testid="lazy-select-box">{children}</div>));
jest.mock('../../../app/services/youtrackApi', () => ({
  useLazyGetAvailableColumnFieldsQuery: () => [jest.fn()],
  useLazyGetColumnSettingsAvailableColumnFieldsQuery: () => [jest.fn()],
}));

describe('ColumnsSettings', () => {
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

  it('should render ColumnsSettings with props', () => {
    act(() => {
      root.render(<ColumnsSettings agileId="agile-id"/>);
    });

    expect(screen.getByTestId('columns-settings')).toBeInTheDocument();
  });
});
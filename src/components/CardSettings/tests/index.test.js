import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import CardSettings from '../index';

jest.mock('@jetbrains/ring-ui/dist/checkbox/checkbox', () =>
  () => (<div data-testid="checkbox"/>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));
jest.mock('../../LazySelectBox', () => ({children}) =>
  (<div data-testid="lazy-select-box">{children}</div>));
jest.mock('../ProjectColorTable', () => () =>
  (<table data-testid="project-color-table"/>));
jest.mock('../CustomFieldsTable', () => () =>
  (<table data-testid="custom-fields-table"/>));
jest.mock('../../SettingsControl', () => () =>
  (<div data-testid="settings-control"/>));
jest.mock('../../../app/services/youtrackApi', () => ({
  useLazyGetColorSchemeFilterFieldsQuery: () => [jest.fn()],
  useLazyGetEstimationFilterFieldsQuery: () => [jest.fn()],
}));

describe('CardSettings', () => {
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

  it('should render CardSettings with props', () => {
    act(() => {
      root.render(<CardSettings cardOnSeveralSprints colorizeCustomFields sprintsEnabled/>);
    });

    expect(screen.getByTestId('card-settings')).toBeInTheDocument();
  });
});
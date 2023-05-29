import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileSearchQueryPanel from '../index';

const mockSetQuery = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock('../../../hooks/useStateParams', () => ({
  useStateParams: (initialState, paramsName, serialize, deserialize) => ['', mockSetQuery],
}))
jest.mock('@jetbrains/ring-ui/dist/list/list', () => ({children}) =>
  (<div data-testid="list">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/query-assist/query-assist', () => () =>
  (<div data-testid="query-assit"/>));
jest.mock('@jetbrains/icons/star-filled.svg', () => 'StarFilledIcon');
jest.mock('@jetbrains/icons/star-empty.svg', () => 'StarEmptyIcon');

jest.mock('../../../app/services/youtrackApi', () => ({
  useLazyGetAgilesQuery: () => [jest.fn()],
  useLazyGetQueryAssistQuery: () => [jest.fn()],
}));
jest.mock('../../LazySelectBox', () => ({children}) =>
  (<div data-testid="lazy-select-box">{children}</div>));

describe('AgileSearchQueryPanel', () => {
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

  it('should render AgileSearchQueryPanel with props', () => {
    act(() => {
      root.render(<AgileSearchQueryPanel/>);
    });

    expect(screen.getByTestId('agile-search-query-panel')).toBeInTheDocument();
  });
});
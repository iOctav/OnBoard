import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileSearchQueryPanel from '../index';

const mockSetQuery = jest.fn();
let mockDataSource;
const mockGetQueryAssistData = jest.fn();
let mockMakeDataset;
let mockOnApply;

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock('../../../hooks/useStateParams', () => ({
  useStateParams: (initialState, paramsName, serialize, deserialize) => ['', mockSetQuery],
}))
jest.mock('@jetbrains/ring-ui/dist/list/list', () => {
  const mockList = ({children}) =>
    (<div data-testid="list">{children}</div>);
  mockList.ListProps = {
    Type: {
      CUSTOM: 'CUSTOM',
      SEPARATOR: 'SEPARATOR',
    }
  }
  return mockList;
});
jest.mock('@jetbrains/ring-ui/dist/query-assist/query-assist', () => ({dataSource, onApply}) => {
  mockDataSource = dataSource;
  mockOnApply = onApply;
  return (<div data-testid="query-assist"/>);
});
jest.mock('@jetbrains/icons/star-filled.svg', () => 'StarFilledIcon');
jest.mock('@jetbrains/icons/star-empty.svg', () => 'StarEmptyIcon');

jest.mock('../../../app/services/youtrackApi', () => ({
  useLazyGetAgilesQuery: () => [jest.fn()],
  useLazyGetQueryAssistQuery: () => [mockGetQueryAssistData],
}));
jest.mock('../../LazySelectBox', () => ({makeDataset, children}) => {
  mockMakeDataset = makeDataset;
  return (<div data-testid="lazy-select-box">{children}</div>);
});

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

  it('should make duplicate datasource without effect our initial one', async () => {
    const serverData = {
      id: '123',
    };
    mockGetQueryAssistData.mockReturnValue(Promise.resolve({ data: serverData }));
    act(() => {
      root.render(<AgileSearchQueryPanel/>);
    });

    expect(screen.getByTestId('query-assist')).toBeInTheDocument();

    const data = await mockDataSource();
    expect(data).toEqual(serverData);
    expect(data).not.toBe(serverData);

    data.id = '321';
    expect(serverData.id).toBe('123');
  });

  it('should separate favorite and unfavourite agiles', async () => {
    const agilesData = [
      {
        id: 'id-1',
        name: 'favorite name',
        favorite: true,
      },

      {
        id: 'id-2',
        name: 'unfavorite name',
        favorite: false,
      }
    ];
    act(() => {
      root.render(<AgileSearchQueryPanel/>);
    });

    expect(screen.getByTestId('query-assist')).toBeInTheDocument();
    const dataSet = mockMakeDataset(agilesData);
    expect(dataSet.length).toBe(3);
    expect(dataSet[0].label).toBe('favorite name');
    expect(dataSet[1].key).toBe('separator');
    expect(dataSet[2].label).toBe('unfavorite name');
  });

  it('should set query undefined if query if not presented in the queryChange', async () => {
    act(() => {
      root.render(<AgileSearchQueryPanel/>);
    });

    expect(screen.getByTestId('query-assist')).toBeInTheDocument();
    mockOnApply({
      query: null,
    });
    expect(mockSetQuery).toHaveBeenCalledWith(undefined);
  });

  it('should set query undefined if queryChange is null', async () => {
    act(() => {
      root.render(<AgileSearchQueryPanel/>);
    });

    expect(screen.getByTestId('query-assist')).toBeInTheDocument();
    mockOnApply(null);
    expect(mockSetQuery).toHaveBeenCalledWith(undefined);
  });
});
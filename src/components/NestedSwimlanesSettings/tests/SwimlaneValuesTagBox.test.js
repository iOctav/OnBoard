import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SwimlaneValuesTagBox from '../SwimlaneValuesTagBox';

let mockOnSelect;
let mockMakeDataset;
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
}));
jest.mock('../../../app/services/youtrackApi');
jest.mock('../../../features/customFields/customFieldsSlice', () => ({
  selectCustomFieldIds: jest.fn(),
}));

jest.mock('../../LazyTagBox', () => ({children}) =>
  (<div data-testid="lazy-tag-box">{children}</div>));
jest.mock('../DateValuesSelect', () => () => (<div data-testid="date-values-select"/>));

describe('SwimlaneValuesTagBox', () => {
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

  it('should render SwimlaneValuesTagBox with props', () => {
    const swimlane = {
      values: [],
      order: 0,
      field: {
        dataType: 'date',
        id: 'tag'
      },
    };
    act(() => {
      root.render(<SwimlaneValuesTagBox swimlane={swimlane} onChange={jest.fn()}/>);
    });

    expect(screen.getByTestId('lazy-tag-box')).toBeInTheDocument();
  });
});
import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SwimlaneFieldSelect from '../SwimlaneFieldSelect';

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

jest.mock('../../LazySelectBox', () => ({makeDataset, onSelect, children}) => {
  mockMakeDataset = makeDataset;
  mockOnSelect = onSelect;
  return (<div data-testid="lazy-select-box">{children}</div>);
});

describe('SwimlaneFieldSelect', () => {
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

  it('should render SwimlaneFieldSelect with props', () => {
    const swimlane = {
      values: [],
      order: 0,
      field: {
        dataType: 'date',
      },
    };
    act(() => {
      root.render(<SwimlaneFieldSelect swimlane={swimlane} onChange={jest.fn()}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
  });
});
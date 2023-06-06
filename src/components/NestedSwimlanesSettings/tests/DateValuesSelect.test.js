import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import DateValuesSelect from '../DateValuesSelect';

jest.mock('@jetbrains/ring-ui/dist/select/select', () => ({data, selected, onChange}) =>
  (<select data-testid="select" onChange={(value) => onChange(value)}>
    {data.map((item, index) =>
      <option key={index} value={item.key} defaultValue={selected && selected.key === item.key}>{item.label}</option>
    )}
  </select>));

describe('DateValuesSelect', () => {
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

  it('should render DateValuesSelect with props', () => {
    const swimlane = {
      values: [],
      order: 0,
      field: {
        dataType: 'date',
      },
    };
    act(() => {
      root.render(<DateValuesSelect swimlane={swimlane} onChange={jest.fn()}/>);
    });

    expect(screen.getByTestId('select')).toBeInTheDocument();
  });
});
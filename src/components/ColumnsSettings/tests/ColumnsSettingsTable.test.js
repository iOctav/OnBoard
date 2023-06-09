import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ColumnsSettingsTable from '../ColumnsSettingsTable';

let mockTableSelect;
const mockSetState = jest.fn();
let mockInput;

jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({
  __esModule: true,
  Size: { S: 'S', M: 'M', L: 'L', AUTO: 'AUTO' },
  default: ({children, onChange}) => {
    mockInput = (event) => onChange(event);
    return (<input data-testid="input">{children}</input>);
  }})
);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (val) => [val, mockSetState]
}))

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));

jest.mock('@jetbrains/ring-ui/dist/select/select', () => ({data, selected}) =>
  (<select data-testid="select">
    {data?.map((item, index) =>
      <option key={index} value={item.key} defaultValue={selected && selected.key === item.key}>{item.label}</option>
    )}
  </select>));

jest.mock('@jetbrains/ring-ui/dist/table/table', () => ({
  Table: ({data, columns, onSelect}) => {
    mockTableSelect = onSelect;
    return (<table data-testid="table">
      <tbody>
      {
        data.map(item => {
          const {id} = item;
          return (<tr key={ `row-${ id }` }>
            { columns.map(col => {
              return (<td key={ `${ id }-${ col.id }` }>
                { col.getValue(item, col) }
              </td>)
            }) }
          </tr>)
        })
      }
      </tbody>
    </table>)
  }
}));

jest.mock('../NameColumnTemplate', () => ({disabled, fieldValues}) => (
  <div disabled={disabled}/>
))


describe('ColumnsSettingsTable', () => {
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

  it('should render ColumnsSettingsTable', () => {
    act(() => {
      root.render(<ColumnsSettingsTable columns={ [] }/>);
    });

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('should render ColumnsSettingsTable with props', () => {
    const columns = [
      {
        ordinal: 0,
        id: 'id-1',
        fieldValues: [
          {
            id: 'field-id-1',
          }
        ],
        wipLimit: {
          min: 0,
          max: 1,
        },
      }
    ]
    act(() => {
      root.render(<ColumnsSettingsTable columns={columns}/>);
    });

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});

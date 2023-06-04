import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import CustomFieldsTable from '../CustomFieldsTable';

let mockOnSave;
let mockMakeDataset;
const mockSetState = jest.fn();


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (val) => [val, mockSetState]
}))

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));

jest.mock('@jetbrains/ring-ui/dist/select/select', () => ({data, selected}) =>
  (<select data-testid="select">
    {data.map((item, index) =>
      <option key={index} value={item.key} defaultValue={selected && selected.key === item.key}>{item.label}</option>
    )}
  </select>));

jest.mock('@jetbrains/ring-ui/dist/table/table', () => ({
  Table: ({data, columns}) => (<table data-testid="table">
    <tbody>
    {
      data.map(item => {
        const {id} = item;
        return (<tr key={`row-${id}`}>
          {columns.map(col => {
            return (<td key={`${id}-${col.id}`}>
              {col.getValue(item, col)}
            </td>)})}
        </tr>)
      })
    }
    </tbody>
  </table>)
}));

jest.mock('../../../app/services/youtrackApi');

jest.mock('../../LazySelectBox', () => ({customAnchor, makeDataset, children}) => {
  mockMakeDataset = makeDataset;
  return (<div data-testid="lazy-select-box">{customAnchor({}, {}, {})}{children}</div>);
});


describe('CustomFieldsTable', () => {
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

  it('should render CustomFieldsTable', () => {
    act(() => {
      root.render(<CustomFieldsTable fields={[]} projects={[]}/>);
    });

    expect(screen.getByTestId('custom-fields-table')).toBeInTheDocument();
  });

  it('should render CustomFieldsTable with props', () => {
    const fields = [
      {
        id: 'id-1',
        field: {
          name: 'field-1',
          instances: [
            {
              project: {
                id: 'id-1'
              }
            }
          ]
        },
        presentation: {
          id: 'presentation-1'
        },
      }
    ];
    const projects = [
      {
        id: 'id-1',
        name: 'name-1',
        shortName: 'shortName-1'
      }
    ];
    act(() => {
      root.render(<CustomFieldsTable fields={fields} projects={projects}/>);
    });

    expect(screen.getByTestId('custom-fields-table')).toBeInTheDocument();
  });

  it('should filter and map data from custom filter fields query', () => {
    const fields = [
      {
        id: 'id-1',
        field: {
          id: 'field-1',
          name: 'field-1',
        },
        presentation: {
          id: 'presentation-1'
        }
      }
    ];
    act(() => {
      root.render(<CustomFieldsTable fields={fields} projects={[]}/>);
    });

    const dataset = mockMakeDataset([
      {
        id: 'id-1',
        presentation: 'presentation-1',
        customField: {
          id: 'field-1',
          fieldType: {
            presentation: 'field-presentation-1'
          }
        }
      },

      {
        id: 'id-2',
        presentation: 'presentation-2',
        customField: {
          id: 'field-2',
          fieldType: {
            presentation: 'field-presentation-2'
          }
        }
      }
    ])

    expect(dataset.length).toBe(1);
    expect(dataset[0]).toEqual({
      key: 'id-2',
      label: 'presentation-2',
      description: 'field-presentation-2',
    });
  });
});

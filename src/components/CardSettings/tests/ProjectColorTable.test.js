import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import ProjectColorTable from '../ProjectColorTable';

let mockOnSave;
const mockColorLabel = jest.fn();
const mockSetState = jest.fn();
let mockTableSelect;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (val) => [val, mockSetState]
}))

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));

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

jest.mock('../../ColorPicker', () => ({onSave, label}) => {
  mockOnSave = onSave;
  mockColorLabel(label);
  return (<div data-testid="color-picker"/>);
});


describe('ProjectColorTable', () => {
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

  it('should render ProjectColorTable', () => {
    act(() => {
      root.render(<ProjectColorTable projectColors={[]}/>);
    });

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('should not render ProjectColorTable without project colors', () => {
    act(() => {
      root.render(<ProjectColorTable/>);
    });

    expect(screen.queryByTestId('table')).not.toBeInTheDocument();
  });

  it('should not render ProjectColorTable with props', () => {
    const projectColors = [
      {
        id: 'id-1',
        project: {
          name: 'project-1',
        },
        color: {
          id: 'color-1',
        }
      }
    ];
    act(() => {
      root.render(<ProjectColorTable projectColors={projectColors}/>);
    });

    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    expect(mockColorLabel).toHaveBeenCalledWith('p');
  });

  it('should trigger setSelectedProjectColor when color picked', () => {
    const projectColors = [
      {
        id: 'id-1',
        project: {
          name: 'project-1',
        },
        color: {
          id: 'color-1',
        }
      }
    ];
    act(() => {
      root.render(<ProjectColorTable projectColors={projectColors}/>);
    });
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    act(() => {
      mockOnSave('new-color');
    });
    const expectedProjectColors = [
      {
        id: 'id-1',
        project: {
          name: 'project-1',
        },
        color: {
          id: 'new-color',
        }
      }
    ];
    expect(mockSetState).toHaveBeenNthCalledWith(1, expectedProjectColors);
  });

  it('FUTURE test | should handle onselect on the table', () => {
    const projectColors = [
      {
        id: 'id-1',
        project: {
          name: 'project-1',
        },
        color: {
          id: 'color-1',
        }
      }
    ];
    act(() => {
      root.render(<ProjectColorTable projectColors={projectColors}/>);
    });

    expect(screen.getByTestId('table')).toBeInTheDocument();
    const result = mockTableSelect();
    expect(result).toBeUndefined();
  });
});

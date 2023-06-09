import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import NestedSwimlanesList from '../NestedSwimlanesList';

let mockMakeDataset;
const mockSetQuery = jest.fn();
const mockSetState = jest.fn();


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (val) => [val, mockSetState]
}))

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));

jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () => ({children, ...props}) =>
  (<div {...props}>{children}</div>));

jest.mock('@jetbrains/ring-ui/dist/tags-input/tags-input', () => () =>
  (<select data-testid="tags-input"/>));

jest.mock('@jetbrains/ring-ui/dist/checkbox/checkbox', () => ({children, onChange, checked}) =>
  (<input type="checkbox" data-testid="checkbox" onChange={onChange} checked={checked}>{children}</input>));

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

jest.mock('../../../hooks/useStateParams', () => ({
  useStateParams: (initialState, paramsName, serialize, deserialize) => ['', mockSetQuery],
}))

jest.mock('../../LazySelectBox', () => ({customAnchor, makeDataset, children}) => {
  mockMakeDataset = makeDataset;
  return (<div data-testid="lazy-select-box">{customAnchor({}, {}, {})}{children}</div>);
});


jest.mock('../SwimlaneValuesTagBox', () => () => (<div data-testid="swimlane-values-tag-box"/>));
jest.mock('../SwimlaneFieldSelect', () => () => (<div data-testid="swimlane-field-select"/>));


describe('NestedSwimlanesList', () => {
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

  it('should render NestedSwimlanesList', () => {
    act(() => {
      root.render(<NestedSwimlanesList projectShortNames={['project1', 'project2']}/>);
    });

    expect(screen.getByTestId('nested-swimlanes-list')).toBeInTheDocument();
  });
});
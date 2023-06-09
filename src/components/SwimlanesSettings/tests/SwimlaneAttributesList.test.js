import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SwimlaneAttributesList from '../SwimlaneAttributesList';

jest.mock('@jetbrains/ring-ui/dist/table/table', () => ({
  Table: ({children}) => (<div data-testid="table">{children}</div>)
}));

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children, onClick, active}) =>
  (<button data-testid="button" onClick={onClick} className={active ? 'active' : ''}>{children}</button>));

jest.mock('../../LazySelectBox', () => ({}) =>
  {(<div data-testid="lazy-select-box">Mocked LazySelectBox</div>)});

jest.mock('../../../app/services/youtrackApi', () => ({
  useLazyGetAvailableSwimlaneFieldsQuery: jest.fn(),
}));

describe('SwimlaneAttributesList', () => {
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

  it('should render SwimlaneAttributesList with correct props', () => {
    const mockProps = {
      disabled: false,
      agileId: '123',
      fieldValues: [{ id: '1', name: 'field1' }, { id: '2', name: 'field2' }],
    };

    act(() => {
      root.render(<SwimlaneAttributesList {...mockProps}/>);
    });


    expect(screen.getByTestId('table')).toBeInTheDocument();
  })
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import NameColumnTemplate from '../NameColumnTemplate';

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({onClick, title, children}) =>
  (<button data-testid="button" onClick={onClick} title={title}>{children}</button>));

jest.mock('@jetbrains/ring-ui/dist/alert/alert', () => {
  const alert = ({children}) => {
    return (<div data-testid="alert">{children}</div>);
  }
  alert.Type = {
    'WARNING': 'warning',
  }
  return alert;
});

describe('NameColumnTemplate', () => {
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

  it('should render NameColumnTemplate with props', () => {
    const fieldValues = [{
      id: 'id',
      name: 'name',
      isResolved: false,
    }];
    act(() => {
      root.render(<NameColumnTemplate fieldValues={fieldValues}/>);
    });

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.title).toBe('Edit.$$noContext');
  });

  it('should render NameColumnTemplate with resolved label', () => {
    const fieldValues = [{
      id: 'id',
      name: 'name',
      isResolved: true,
    }];
    act(() => {
      root.render(<NameColumnTemplate fieldValues={fieldValues}/>);
    });

    expect(screen.getByText('Resolved.$$noContext')).toBeInTheDocument();
  });

  it('should render NameColumnTemplate with multiply fieldValues', () => {
    const fieldValues = [{
      id: 'id-1',
      name: 'name-1',
      isResolved: true,
    },{
      id: 'id-2',
      name: 'name-2',
      isResolved: true,
    }];
    act(() => {
      root.render(<NameColumnTemplate fieldValues={fieldValues}/>);
    });

    expect(screen.getAllByTitle('Edit.$$noContext').length).toBe(2);
    expect(screen.getAllByTitle('Drag to reorder').length).toBe(2);
  });
});

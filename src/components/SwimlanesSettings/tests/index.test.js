import React from 'react';
import { act, screen  } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SwimlanesSettings from '../index';

jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () =>
  ({children}) => (<div data-testid="button-group">{children}</div>));

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children, onClick, active}) =>
  (<button data-testid="button" onClick={onClick} className={active ? 'active' : ''}>{children}</button>));

jest.mock('@jetbrains/ring-ui/dist/checkbox/checkbox', () => ({children, onChange, checked}) =>
  (<input type="checkbox" data-testid="checkbox" onChange={onChange} checked={checked}>{children}</input>));

jest.mock('@jetbrains/ring-ui/dist/select/select', () => ({children, data, selected}) =>
  (<select data-testid="select">
      {data.map((item, index) =>
        <option key={index} value={item.key} defaultValue={selected && selected.key === item.key}>{item.label}</option>
      )}
    </select>));

jest.mock('../SwimlaneAttributesList', () => {
  return function MockedSwimlaneAttributesList() {
    return (
      <div data-testid="swimlane-attributes-list">Mocked SwimlaneAttributesList</div>
    );
  };
});

describe('SwimlanesSettings', () => {
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

  it('should render SwimlanesSettings with correct props', () => {
    const mockProps = {
      disabled: false,
      agileId: '123',
      swimlaneSettings: { enabled: false, $type: 'type1', field: { id: '1', presentation: 'test' } },
      projectShortNames: ['P1', 'P2'],
      hideOrphansSwimlane: false,
      orphansAtTheTop: true
    };

    act(() => {
      root.render(<SwimlanesSettings {...mockProps}/>);
    });

    expect(screen.getByTestId('button-group')).toBeInTheDocument();
  })
});
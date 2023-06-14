import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import PageYTHeader from '../index';

jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<button data-testid="button">{children}</button>));
jest.mock('@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu', () => ({data, anchor}) =>
  (<div data-testid="dropdown-menu">{anchor}</div>))
jest.mock('@jetbrains/ring-ui/dist/header/header', () => ({children}) =>
  (<div data-testid="header">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/icon', () => ({
  __esModule: true,
  Size: {
    Size20: 'Size20',
    Size24: 'Size24',
  },
  default: ({glyph}) =>
    (<span data-testid="icon">{glyph}</span>),
}));
jest.mock('@jetbrains/ring-ui/dist/link/link', () => ({children}) =>
  (<a data-testid="link">{children}</a>));
jest.mock('@jetbrains/ring-ui/dist/header/tray-icon', () => ({icon}) =>
  (<span data-testid="tray-icon">{icon}</span>));
jest.mock('@jetbrains/ring-ui/dist/header/tray', () => ({children}) =>
  (<span data-testid="tray">{children}</span>));
jest.mock('@jetbrains/ring-ui/dist/select/select', () => ({data, selected}) =>
  (<select data-testid="select">
    {data.map((item, index) =>
      <option key={index} value={item.key} defaultValue={selected && selected.key === item.key}>{item.label}</option>
    )}
  </select>));
jest.mock('@jetbrains/ring-ui/dist/global/theme', () => ({
  default: { AUTO: 'auto', LIGHT: 'light' }
}));
jest.mock('react-router-dom', () => ({
  Link: ({children}) => (<div data-testid="link">{children}</div>),
}));
jest.mock('../../SmartProfile', () => () =>
  (<div data-testid="smart-profile"/>));
jest.mock('../HeaderLogo', () => () =>
  (<div data-testid="header-logo"/>));

describe('PageYTHeader', () => {
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

  it('should render PageYTHeader with props', () => {
    global.innerWidth = 1920;
    act(() => {
      root.render(<PageYTHeader isCompact={false}/>);
    });

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
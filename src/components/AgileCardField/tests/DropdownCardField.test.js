import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import DropdownCardField from '../DropdownCardField';

jest.mock('@jetbrains/ring-ui/dist/dropdown/dropdown', () => ({anchor, children}) =>
  (<div data-testid="dropdown">{anchor}{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/panel/panel', () => ({children}) =>
  (<div data-testid="panel">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/popup/popup', () => ({children}) =>
  (<div data-testid="popup">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({children}) =>
  (<div data-testid="button">{children}</div>));

describe('DropdownCardField', () => {
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

  it('should render DropdownCardField with props', () => {
    act(() => {
      root.render(<DropdownCardField/>);
    });

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  it('should render DropdownCardField with placeholder', () => {
    const customField = {
      emptyFieldText: 'empty-field-text',
    };
    act(() => {
      root.render(<DropdownCardField customField={customField}/>);
    });

    expect(screen.getByText(customField.emptyFieldText)).toBeInTheDocument();
  });

  it('should render DropdownCardField with default placeholder', () => {
    act(() => {
      root.render(<DropdownCardField/>);
    });

    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('should render DropdownCardField with anchorText', () => {
    const anchorText = 'anchor-text';
    act(() => {
      root.render(<DropdownCardField anchorText={anchorText}/>);
    });

    expect(screen.queryByText('?')).not.toBeInTheDocument();
    expect(screen.getByText(anchorText)).toBeInTheDocument();
  });

  it('should render DropdownCardField with buttons `Apply Changes` and `Cancel`', () => {
    const anchorText = 'anchor-text';
    act(() => {
      root.render(<DropdownCardField anchorText={anchorText}/>);
    });

    expect(screen.getByText('Apply changes')).toBeInTheDocument();
    expect(screen.getByText('Cancel.$$noContext')).toBeInTheDocument();
  });
})
import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AppearanceMenu from '../index';

const dropdownMenu = ({anchor}) => (<div data-testid="dropdown-menu">{anchor}</div>);
dropdownMenu.ListProps = {
  Type: {
    TITLE: 'title',
    LINK: 'link',
  }
}
jest.mock('@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu', () => ({
  __esModule: true,
  default: dropdownMenu,
}));

describe('AppearanceMenu', () => {
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

  it('should render AppearanceMenu', () => {
    act(() => {
      root.render(<AppearanceMenu />);
    });

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });
});
import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileTopToolbar from '../index';

jest.mock('@jetbrains/ring-ui/dist/button-group/button-group', () =>
  ({children}) => (<div data-testid="button-group">{children}</div>));
jest.mock('@jetbrains/ring-ui/dist/button/button', () => ({title, onClick, children}) =>
  (<button data-testid="button" title={title} onClick={onClick}>{children}</button>));
jest.mock('../../AgileSprintSelect', () => () =>
  (<div data-testid="agile-sprint-select"/>));

describe('AgileTopToolbar', () => {
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

  it('should render AgileTopToolbar with props', () => {
    act(() => {
      root.render(<AgileTopToolbar agileId="agile-id" onSettingsButtonClick={jest.fn}/>);
    });

    expect(screen.getByTestId('agile-top-toolbar')).toBeInTheDocument();
  });

  it('should fire onSettingsButtonClick event', () => {
    const mockOnSettingsButtonClick = jest.fn();
    act(() => {
      root.render(<AgileTopToolbar agileId="agile-id" onSettingsButtonClick={() => mockOnSettingsButtonClick()}/>);
    });

    const boardSettingsButton = screen.getByTitle('Board settings');
    expect(boardSettingsButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(boardSettingsButton);
    });

    expect(mockOnSettingsButtonClick).toBeCalledTimes(1);
  });

  it('should render AgileTopToolbar with agile sprint select', () => {
    act(() => {
      root.render(<AgileTopToolbar agileId="agile-id" sprintsDisabled={false} onSettingsButtonClick={jest.fn}/>);
    });

    expect(screen.getByTestId('agile-sprint-select')).toBeInTheDocument();
  });

  it('should render AgileTopToolbar without agile sprint select if it is disabled', () => {
    act(() => {
      root.render(<AgileTopToolbar agileId="agile-id" sprintsDisabled={true} onSettingsButtonClick={jest.fn}/>);
    });

    expect(screen.queryByTestId('agile-sprint-select')).not.toBeInTheDocument();
  });
});
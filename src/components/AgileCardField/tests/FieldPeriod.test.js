import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import FieldPeriod from '../FieldPeriod';

let mockInput;
jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({children, onChange}) => {
  mockInput = (event) => onChange(event);
  return (<input data-testid="input">{children}</input>);
});
jest.mock('../DropdownCardField', () => ({anchorText, children}) =>
  (<div data-testid="dropdown-card-field">{anchorText}{children}</div>));

describe('FieldPeriod', () => {
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

  it('should render FieldPeriod with props', () => {
    const periodInMinutes = 2998;
    act(() => {
      root.render(<FieldPeriod value={periodInMinutes} />);
    });

    expect(screen.getByTestId('dropdown-card-field')).toBeInTheDocument();
    expect(screen.getByText('1w 1d 1h 58m')).toBeInTheDocument();
  });

  it('should render error when invalid expression is typed', () => {
    const periodInMinutes = 2998;
    act(() => {
      root.render(<FieldPeriod value={periodInMinutes} />);
    });

    expect(screen.queryByText('Doesn\'t match the pattern')).not.toBeInTheDocument();
    act(() => {
      mockInput({target: {value: '1w32sa 2d 2h 2m'}});
    });
    expect(screen.getByText('Doesn\'t match the pattern')).toBeInTheDocument();
  });

  it('should not render error if valid expression typed', () => {
    const periodInMinutes = 2998;
    act(() => {
      root.render(<FieldPeriod value={periodInMinutes} />);
    });

    expect(screen.queryByText('Doesn\'t match the pattern')).not.toBeInTheDocument();
    act(() => {
      mockInput({target: {value: '1w 2d 2h 2m'}});
    });
    expect(screen.queryByText('Doesn\'t match the pattern')).not.toBeInTheDocument();
  });
});

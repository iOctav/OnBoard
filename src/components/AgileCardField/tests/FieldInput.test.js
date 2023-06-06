import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import FieldInput from '../FieldInput';

let mockInput;
jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({children, onChange}) => {
  mockInput = (event) => onChange(event);
  return (<input data-testid="input">{children}</input>);
});
jest.mock('../DropdownCardField', () => ({anchorText, children}) =>
  (<div data-testid="dropdown-card-field">{anchorText}{children}</div>));

describe('FieldInput', () => {
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

  it('should render FieldInput with props', () => {
    const value = 'text';
    act(() => {
      root.render(<FieldInput value={value} />);
    });

    expect(screen.getByTestId('dropdown-card-field')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('should not render error when undefined', () => {
    const value = undefined;
    const pattern =  /^((\d+w\s*)?(\s*)?(\d+d\s*)?(\s*)?(\d+h\s*)?(\s*)?(\d+m\s*)?|\d+)$/;

    act(() => {
      root.render(<FieldInput errorText="error-text" value={value} pattern={pattern} />);
    });
    expect(screen.queryByText('error-text')).not.toBeInTheDocument();
  });

  it('should render error when types text does not pass patter', () => {
    const value = '1w 1d';
    const pattern =  /^((\d+w\s*)?(\s*)?(\d+d\s*)?(\s*)?(\d+h\s*)?(\s*)?(\d+m\s*)?|\d+)$/;
    act(() => {
      root.render(<FieldInput errorText="error-text" value={value} pattern={pattern} />);
    });

    expect(screen.queryByText('error-text')).not.toBeInTheDocument();
    act(() => {
      mockInput({target: {value: 'invalid text'}});
    });
    expect(screen.getByText('error-text')).toBeInTheDocument();
  });

  it('should render error when provided intitial invalid value', () => {
    const value = 'invalid text';
    const pattern =  /^((\d+w\s*)?(\s*)?(\d+d\s*)?(\s*)?(\d+h\s*)?(\s*)?(\d+m\s*)?|\d+)$/;
    act(() => {
      root.render(<FieldInput errorText="error-text" value={value} pattern={pattern} />);
    });

    expect(screen.getByText('error-text')).toBeInTheDocument();
  });
});

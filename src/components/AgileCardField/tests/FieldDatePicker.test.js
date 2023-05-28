import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import FieldDatePicker from '../FieldDatePicker';

jest.mock('@jetbrains/ring-ui/dist/date-picker/date-picker', () => ({datePlaceholder}) =>
  (<input data-testid="date-picker-input" placeholder={datePlaceholder}></input>));
jest.mock('@jetbrains/ring-ui/dist/input/input', () => ({
  Size: {
    AUTO: 'AUTO',
  }
}));

describe('FieldDatePicker', () => {
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

  it('should render FieldDatePicker with props', () => {
    act(() => {
      root.render(<FieldDatePicker/>);
    });

    expect(screen.getByTestId('date-picker-input')).toBeInTheDocument();
  });

  it('should render FieldDatePicker with placeholder', () => {
    const customField = {
      emptyFieldText: 'empty-field-text',
    };
    act(() => {
      root.render(<FieldDatePicker customField={customField}/>);
    });

    expect(screen.getByPlaceholderText(customField.emptyFieldText)).toBeInTheDocument();
  });

  it('should render FieldDatePicker with default placeholder', () => {
    act(() => {
      root.render(<FieldDatePicker/>);
    });

    expect(screen.getByPlaceholderText('?')).toBeInTheDocument();
  });
});

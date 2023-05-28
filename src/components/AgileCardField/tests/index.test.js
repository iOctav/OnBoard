import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import AgileCardField from '../index';
import { CustomFieldType } from '../../../features/customFields/custom-field-type';

const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector(),
}));
jest.mock('../../../features/customFields/customFieldsSlice', () => jest.fn());
jest.mock('../FieldPeriod', () => () =>
  (<div data-testid="field-period"/>));

jest.mock('../FieldDatePicker', () => () =>
  (<div data-testid="field-date-picker"/>));
jest.mock('../FieldInput', () => () =>
  (<div data-testid="field-input"/>));
jest.mock('../SelectCardField', () => () =>
  (<div data-testid="select-card-field"/>));

describe('AgileCardField', () => {
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

  it('should render FieldDatePicker for Date field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Date,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-date-picker')).toBeInTheDocument();
  });

  it('should render FieldDatePicker for DateTime field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.DateTime,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-date-picker')).toBeInTheDocument();
  });

  it('should render FieldPeriod for Period field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Period,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-period')).toBeInTheDocument();
  });

  it('should render FieldInput for Text field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Text,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });

  it('should render FieldInput for Float field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Float,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });

  it('should render FieldInput for Integer field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Integer,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });

  it('should render FieldInput for String field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.String,
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });

  it('should render SelectCardField for Enum field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Enum,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField for State field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.State,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField for User field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.User,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField for OwnedField field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.OwnedField,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField for Version field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Version,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField for Build field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Build,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField for Group field', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Group,
      isMultiValue: false
    });
    const issueId = 'issue-id';
    const field = {
      value: {
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      },
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });

  it('should render SelectCardField with multivalue', () => {
    mockSelector.mockReturnValueOnce({
      valueType: CustomFieldType.Group,
      isMultiValue: true
    });
    const issueId = 'issue-id';
    const field = {
      value: [{
        id: 'user-id',
        name: 'user-name',
        fullName: 'user-full-name',
        login: 'user-login',
      }],
    }
    act(() => {
      root.render(<AgileCardField issueId={issueId} field={field}/>);
    });

    expect(screen.getByTestId('select-card-field')).toBeInTheDocument();
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SelectCardField from '../SelectCardField';
import { CustomFieldType } from '../../../features/customFields/custom-field-type';
import { PropertyUpdateType } from '../../../features/sprint/propertyUpdateType';
import { CustomFieldPresentationType } from '../../../features/customFields/custom-field-presentation-type';

const mockUpdateIssueField = jest.fn();
const mockUseParams = jest.fn();
let triggerOnChange = null;
let mockMakeDataset = null;

jest.mock('react-router-dom', () => ({
  useParams: () => mockUseParams(),
}));
jest.mock('../../../features/sprint/sprintSlice', () => ({
  useUpdateIssueFieldMutation: () => [mockUpdateIssueField],
}));
jest.mock('../../LazySelectBox', () => ({customAnchor, children, onChange, makeDataset, multiple}) => {
  triggerOnChange = onChange;
  mockMakeDataset = makeDataset;
  return (<div data-testid="lazy-select-box">{customAnchor({},{},{})}{children}</div>);
});

describe('SelectCardField', () => {
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

  it('should render SelectCardField with props', () => {
    mockUseParams.mockReturnValue({agileId: 'agile-id', sprintId: 'sprint-id'});
    const customField = {
      valueType: CustomFieldType.Enum
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId="issue-id" selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
  });

  it('should update issue field with single value when select has been changed', () => {
    const agileId = 'agile-id';
    const sprintId = 'sprint-id';
    const issueId = 'issue-id';
    mockUseParams.mockReturnValue({agileId: agileId, sprintId: sprintId});
    const customField = {
      valueType: CustomFieldType.Enum,
      presentationType: CustomFieldPresentationType.FullName,
      name: 'name',
      isMultiValue: false,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId={issueId} selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
    act(() => {
      triggerOnChange({key: 'id', value: { label: 'value-label', key: 'value-key'}, label: 'label'});
    });
    expect(mockUpdateIssueField).toHaveBeenNthCalledWith(1, {
      agileId,
      sprintId,
      issueId,
      propertiesUpdates: [
        {
          fieldId: customField.name,
          type: PropertyUpdateType.CardField,
          value: {
            name: 'label',
          },
        }
      ]
    });
  });

  it('should update issue field with multi value when select has been changed', () => {
    const agileId = 'agile-id';
    const sprintId = 'sprint-id';
    const issueId = 'issue-id';
    mockUseParams.mockReturnValue({agileId: agileId, sprintId: sprintId});
    const customField = {
      valueType: CustomFieldType.Enum,
      presentationType: CustomFieldPresentationType.FullName,
      name: 'name',
      isMultiValue: true,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId={issueId} selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
    act(() => {
      triggerOnChange([{key: 'id-1', value: { label: 'value-label-1', key: 'value-key-1'}, label: 'label-1'},
        {key: 'id-2', value: { label: 'value-label-2', key: 'value-key-2'}, label: 'label-2'}]);
    });
    expect(mockUpdateIssueField).toHaveBeenNthCalledWith(1, {
      agileId,
      sprintId,
      issueId,
      propertiesUpdates: [
        {
          fieldId: customField.name,
          type: PropertyUpdateType.CardField,
          value: [{
            name: 'label-1',
          },
          {
            name: 'label-2',
          }],
        }
      ]
    });
  });

  it('should update issue field with single null value when select has been changed', () => {
    const agileId = 'agile-id';
    const sprintId = 'sprint-id';
    const issueId = 'issue-id';
    mockUseParams.mockReturnValue({agileId: agileId, sprintId: sprintId});
    const customField = {
      valueType: CustomFieldType.Enum,
      presentationType: CustomFieldPresentationType.FullName,
      name: 'name',
      isMultiValue: false,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId={issueId} selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
    act(() => {
      triggerOnChange({key: 'empty', value: null, label: 'empty label'});
    });
    expect(mockUpdateIssueField).toHaveBeenNthCalledWith(1, {
      agileId,
      sprintId,
      issueId,
      propertiesUpdates: [
        {
          fieldId: customField.name,
          type: PropertyUpdateType.CardField,
          value: null,
        }
      ]
    });
  });

  it('should update issue field with multi empty value', () => {
    const agileId = 'agile-id';
    const sprintId = 'sprint-id';
    const issueId = 'issue-id';
    mockUseParams.mockReturnValue({agileId: agileId, sprintId: sprintId});
    const customField = {
      valueType: CustomFieldType.Enum,
      presentationType: CustomFieldPresentationType.FullName,
      name: 'name',
      isMultiValue: true,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId={issueId} selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
    act(() => {
      triggerOnChange([]);
    });
    expect(mockUpdateIssueField).toHaveBeenNthCalledWith(1, {
      agileId,
      sprintId,
      issueId,
      propertiesUpdates: [
        {
          fieldId: customField.name,
          type: PropertyUpdateType.CardField,
          value: [],
        }
      ]
    });
  });

  it('should render SelectCardField with empty option when is available', () => {
    const agileId = 'agile-id';
    const sprintId = 'sprint-id';
    const issueId = 'issue-id';
    mockUseParams.mockReturnValue({agileId: agileId, sprintId: sprintId});
    const customField = {
      valueType: CustomFieldType.Enum,
      presentationType: CustomFieldPresentationType.FullName,
      canBeEmpty: true,
      name: 'name',
      isMultiValue: false,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId={issueId} selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
    const dataSet = mockMakeDataset([]);
    expect(dataSet[0].key).toBe('empty');
  });

  it('should render SelectCardField without empty option when is available but multi value is set', () => {
    const agileId = 'agile-id';
    const sprintId = 'sprint-id';
    const issueId = 'issue-id';
    mockUseParams.mockReturnValue({agileId: agileId, sprintId: sprintId});
    const customField = {
      valueType: CustomFieldType.Enum,
      presentationType: CustomFieldPresentationType.FullName,
      canBeEmpty: true,
      name: 'name',
      isMultiValue: true,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId={issueId} selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
    const dataSet = mockMakeDataset([]);
    expect(dataSet[0]).toBeUndefined();
  });
});
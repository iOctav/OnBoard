import React from 'react';
import { act, screen } from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';
import SelectCardField from '../SelectCardField';
import { CustomFieldType } from '../../../features/customFields/custom-field-type';

const mockUpdateIssueField = jest.fn();

jest.mock('../../../features/sprint/sprintSlice', () => ({
  useUpdateIssueFieldMutation: () => [mockUpdateIssueField],
}));
jest.mock('../../LazySelectBox', () => ({customAnchor, children}) =>
  (<div data-testid="lazy-select-box">{customAnchor({},{},{})}{children}</div>));

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
    const customField = {
      valueType: CustomFieldType.Enum,
    };
    act(() => {
      root.render(<SelectCardField customField={customField} issueId="issue-id" selected={{}}/>);
    });

    expect(screen.getByTestId('lazy-select-box')).toBeInTheDocument();
  });
});
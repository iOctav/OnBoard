import styled from 'styled-components';

export const Marker = styled.span`
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: calc(var(--ring-unit));
  display: inline-block;
  border: 1px solid var(--ring-content-background-color);
  border-color: transparent !important;
  margin-right: 4px;
`;

export const CardFieldAnchor = styled.span`
    cursor: pointer;
    text-decoration: none;
    color: var(--ring-secondary-color);
    border: 0;
    &:hover {
        color: var(--ring-link-hover-color);
        text-decoration: none;
    }
`;

export const LeftMarginSpan = styled.span`
    margin-left: calc(var(--ring-unit));
`;

export const IssueFieldValue = styled.span`
      line-height: 20px;
      font-size: 12px;
      color: #737577;
`;

export const DropdownContent = styled.div`
  padding: calc(2 * var(--ring-unit));
  min-width: calc(30 * var(--ring-unit));
  text-align: left;
  position: relative;
  color: var(--ring-text-color);
  font-family: var(--ring-font-family);
  font-size: var(--ring-font-size);
`;

export const DropdownPanel = styled.div`
  margin-top: calc(var(--ring-unit) * 2);
`;

export const ErrorValidationMessage = styled.span`
  display: inline-block;
  color: var(--ring-error-color);
`;

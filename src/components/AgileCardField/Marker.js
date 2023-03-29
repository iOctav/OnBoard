import styled from "styled-components";

const Marker = styled.span`
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: calc(var(--ring-unit));
  display: inline-block;
  border: 1px solid var(--ring-content-background-color);
  border-color: transparent !important;
  margin-right: 4px;
`;

export default Marker;

import styled from "styled-components";

const Marker = styled.span`
      height: 5px;
      width: 5px;
      background-color: ${props => props.color};
      border-radius: 50%;
      display: inline-block;
`;

export default Marker;

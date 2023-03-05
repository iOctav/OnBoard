import styled from 'styled-components';

import PropTypes from 'prop-types';
import Button from '@jetbrains/ring-ui/dist/button/button';
import chevronLeft from '@jetbrains/icons/chevron-left';
import chevronRight from '@jetbrains/icons/chevron-right';
import { useState } from 'react';

const FloatRightCounterDiv = styled.div`
    float: right;
    min-width: 14px;
    padding: 0 4px;
    line-height: 16px;
    margin: 2px calc(var(--ring-unit)/2);
    border-radius: 3px;
    background-color: var(--ring-content-background-color);
    font-size: 11px;
    text-align: center;
`;

const FloatLeftButton = styled(Button)`
    float: left;
`;

const HeaderCellTd = styled.td`
    padding-top: calc(var(--ring-unit)/2);
    padding-bottom: calc(var(--ring-unit)/2);
    border: 1px solid var(--ring-line-color);
    background-color: var(--ring-sidebar-background-color);
    border-collapse: collapse;
`;

function HeaderCell({caption, cardsCount}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <HeaderCellTd>
      <FloatLeftButton icon={collapsed ? chevronRight : chevronLeft} onClick={() => setCollapsed(prevState => !prevState)}>{caption}</FloatLeftButton>
      <span className="agile-table-column-icon"></span>
      <FloatRightCounterDiv className="agile-table-column-counter">{cardsCount}</FloatRightCounterDiv>
    </HeaderCellTd>
  );
}

HeaderCell.propTypes = {
  caption: PropTypes.string,
  cardsCount: PropTypes.number
}

export default HeaderCell

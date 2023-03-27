import styled from 'styled-components';

import PropTypes from 'prop-types';
import Button from '@jetbrains/ring-ui/dist/button/button';
import chevronLeft from '@jetbrains/icons/chevron-left';
import chevronRight from '@jetbrains/icons/chevron-right';
import { useDispatch } from 'react-redux';
import { updateColumn } from '../../features/sprint/sprintSlice';

const FloatRightCounterDiv = styled.span`
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

const HeaderTitle = styled.div`
  cursor: pointer;
  font-size: var(--yt-secondary-font-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  line-height: 20px;
  max-width: 100%;
`;

function HeaderCell({column}) {
  const dispatch = useDispatch();

  return (
    <HeaderCellTd>
      <HeaderTitle>
        <FloatLeftButton icon={column.collapsed ? chevronRight : chevronLeft}
                         onClick={() => dispatch(updateColumn({id: column.id, changes: { collapsed: !column.collapsed}}))}>
          {column.agileColumn?.fieldValues.map(field => field.presentation).join(', ')}
        </FloatLeftButton>
        {/*<FloatRightCounterDiv className="agile-table-column-counter">{cardsCount}</FloatRightCounterDiv>*/}
      </HeaderTitle>
    </HeaderCellTd>
  );
}

HeaderCell.propTypes = {
  caption: PropTypes.string,
  cardsCount: PropTypes.number
}

export default HeaderCell

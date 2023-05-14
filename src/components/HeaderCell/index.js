import styled from 'styled-components';

import PropTypes from 'prop-types';
import Button from '@jetbrains/ring-ui/dist/button/button';
import chevronLeft from '@jetbrains/icons/chevron-left';
import chevronRight from '@jetbrains/icons/chevron-right';
import newWindowsIcon from '@jetbrains/icons/new-window';
import { useDispatch } from 'react-redux';
import { updateColumn } from '../../features/sprint/sprintSlice';
import { issuesQueryUri } from '../../services/linkService';
import { useTranslation } from 'react-i18next';

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
  &:hover .column-issues-link {
    display: inline;
  };  
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

const IssuesLinkButton = styled(Button)`
  display: none;
`;

const makeQuery = (agileName, sprintName, fieldName, values, explicitQuery) => {
  let query;
  if (sprintName) {
    query = `{Board ${agileName}}: {${sprintName}}`;
  } else {
    query = `has: {Board ${agileName}}`;
  }
  if (fieldName) {
    values.forEach(value => {
      query = `${query} ${fieldName}: {${value}}`;
    })
  }
  if (explicitQuery) {
    query = `${query} and (${explicitQuery})`;
  }
  return query;
}

function HeaderCell({column, agileName, sprintName, fieldName, cardsCount, explicitQuery}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const issuesQuery = makeQuery(agileName, sprintName, fieldName, column.agileColumn?.fieldValues.map(x => x.presentation), explicitQuery);

  return (
    <HeaderCellTd>
      <FloatRightCounterDiv title={t('1 card', { count: cardsCount })}>
        {cardsCount}
      </FloatRightCounterDiv>
      <HeaderTitle>
        <FloatLeftButton icon={column.collapsed ? chevronRight : chevronLeft}
                         onClick={() => dispatch(updateColumn({id: column.id, changes: { collapsed: !column.collapsed}}))}>
          {column.agileColumn?.presentation}
        </FloatLeftButton>
        <IssuesLinkButton className="column-issues-link" icon={newWindowsIcon} href={issuesQueryUri(issuesQuery)} target="_blank"
                          title={t('View all {{columnPresentation}} issues on the Issues list', {columnPresentation: column.agileColumn?.presentation})}/>
      </HeaderTitle>
    </HeaderCellTd>
  );
}

HeaderCell.propTypes = {
  caption: PropTypes.string,
  agileName: PropTypes.string.isRequired,
  sprintName: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  cardsCount: PropTypes.number,
  explicitQuery: PropTypes.string,
}

export default HeaderCell

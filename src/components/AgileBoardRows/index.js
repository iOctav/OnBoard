import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useGetIssuesQuery } from '../../store/youtrackApi';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';
import AgileCardPreview from '../AgileCardPreview';
import NewCardButton from '../NewCardButton';

const BorderedTd = styled.td`
  border-bottom: 1px solid var(--ring-line-color);
  border-right: 1px solid var(--ring-line-color);
  border-collapse: collapse;
  vertical-align: top;
  &:hover .new-card-button-action-text {
    display: inline;
  };
`;


function makeAgileRow(row, issuesDict, swimlaneTitle = undefined) {
  const issuesCount = row.cells.reduce((acc, cell) => acc + cell.issues.length, 0);
  return (
    <tbody key={'categorized-row-' + row.id}>
      { <Swimlane title={swimlaneTitle} cardsNumber={issuesCount} columnsNumber={row.cells.length} ></Swimlane> }
    <tr>
      {
        row.cells.map(cell =>
          <BorderedTd key={'cell-' + cell.id}>
            {
              cell.issues.map((c) => issuesDict && issuesDict[c.id]
                ? <AgileCard issueData={issuesDict[c.id]} key={'agile-card-' + c.id}/>
                : <AgileCardPreview issueData={c} key={'agile-card-' + c.id}/> )
            }
            <NewCardButton/>
          </BorderedTd>
        )
      }
    </tr>
    </tbody>
  );
}

function AgileBoardRows({orphanRow, trimmedSwimlanes, hideOrphansSwimlane, orphansAtTheTop}) {
  let content;
  let issuesDict;
  const { t } = useTranslation();


  // TODO: refactor this calculation
  const issueIds = [orphanRow, ...trimmedSwimlanes]
    .reduce((acc1, row) =>
      [...acc1, ...(row.cells.reduce((acc1, cell) =>
        [...acc1, ...cell.issues.reduce((acc2, issue) => [...acc2, issue.id], [])], [])),[]],
      [])
    .filter(id => !(id instanceof Array));

  const { data: issues,
    isLoading,
    isSuccess,
    isError
  } = useGetIssuesQuery(issueIds);

  if (isLoading) {
  } else if (isSuccess) {
    issuesDict = Object.fromEntries(issues.map(issue => [issue.id, issue]));
  } else if (isError) {
  }

  const swimlanesAgileRow = trimmedSwimlanes.map(row => makeAgileRow(row, issuesDict, row.value?.presentation || row.issue?.summary))
  if (hideOrphansSwimlane) {
    content = swimlanesAgileRow
  } else {
    const orphanAgileRow = makeAgileRow(orphanRow, issuesDict,
      trimmedSwimlanes.length > 0 ? t('Uncategorized Cards') : undefined)
    if (orphansAtTheTop) {
      content = [orphanAgileRow, ...swimlanesAgileRow];
    } else {
      content = [...swimlanesAgileRow, orphanAgileRow];
    }
  }
  return content;
}

AgileBoardRows.propTypes = {
  orphanRow: PropTypes.object,
  trimmedSwimlanes: PropTypes.arrayOf(PropTypes.object),
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool
}

export default AgileBoardRows

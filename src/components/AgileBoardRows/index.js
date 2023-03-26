import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useGetIssuesQuery } from '../../app/services/youtrackApi';
import BoardRow from './BoardRow';

function AgileBoardRows({orphanRow, trimmedSwimlanes, hideOrphansSwimlane, orphansAtTheTop, level}) {
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

  const swimlanesAgileRow = trimmedSwimlanes.map(row =>
    (<BoardRow key={`${row.id}-${level}`} level={level} row={row} issuesDict={issuesDict}
               swimlaneTitle={row.value?.presentation || row.issue?.summary}/>));
  if (hideOrphansSwimlane) {
    content = swimlanesAgileRow
  } else {
    const orphanAgileRow =
      (<BoardRow isOrphan key={`${orphanRow.id}-${level}`} row={orphanRow} issuesDict={issuesDict} level={level}
                 swimlaneTitle={trimmedSwimlanes.length > 0 ? t('Uncategorized Cards') : undefined}/>);
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
  orphansAtTheTop: PropTypes.bool,
  level: PropTypes.number,
}

export default AgileBoardRows

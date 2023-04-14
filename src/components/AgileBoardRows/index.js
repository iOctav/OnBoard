import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BoardRow from './BoardRow';
import { useGetIssuesQuery } from '../../features/sprint/sprintSlice';

function AgileBoardRows({agileId, sprintId, orphanRow, trimmedSwimlanes, hideOrphansSwimlane, orphansAtTheTop,
                          level, colorField, system, visibleCardFields, swimlaneFieldName}) {
  let content;
  let issuesDict;
  const { t } = useTranslation();


  // TODO: refactor this calculation
  const issueIds = [orphanRow, ...trimmedSwimlanes]
    .reduce((acc1, row) =>
      [...acc1, ...(row.cells.reduce((acc1, cell) =>
        [...acc1, ...cell.issues.reduce((acc2, issue) => [...acc2, issue.id], [])], [])),[]],
      [])
    .filter(id => !(id instanceof Array))
    .sort();

  const { data: issues,
    isLoading,
    isSuccess,
    isError
  } = useGetIssuesQuery(issueIds);

  if (isLoading) {
  } else if (isSuccess) {
    issuesDict = issues.entities;
  } else if (isError) {
  }

  const swimlanesAgileRow = trimmedSwimlanes.map(row =>
    (<BoardRow key={`${row.id}-${level}`} agileId={agileId} sprintId={sprintId} level={level} row={row}
               issuesDict={issuesDict} visibleCardFields={visibleCardFields} swimlaneFieldName={swimlaneFieldName}
               swimlaneTitle={row.value?.presentation || row.issue?.summary} colorField={colorField} system={system}/>));
  if (hideOrphansSwimlane) {
    content = swimlanesAgileRow
  } else {
    const orphanAgileRow =
      (<BoardRow isOrphan key={`${orphanRow.id}-${level}`} agileId={agileId} sprintId={sprintId} row={orphanRow}
                 issuesDict={issuesDict} level={level} visibleCardFields={visibleCardFields} swimlaneFieldName={swimlaneFieldName}
                 swimlaneTitle={trimmedSwimlanes.length > 0 ? t('Uncategorized Cards') : undefined} colorField={colorField} system={system}/>);
    if (orphansAtTheTop) {
      content = [orphanAgileRow, ...swimlanesAgileRow];
    } else {
      content = [...swimlanesAgileRow, orphanAgileRow];
    }
  }
  return content;
}

AgileBoardRows.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  orphanRow: PropTypes.object,
  trimmedSwimlanes: PropTypes.arrayOf(PropTypes.object),
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  level: PropTypes.number,
  colorField: PropTypes.string,
  system: PropTypes.bool,
  visibleCardFields: PropTypes.arrayOf(PropTypes.string),
  swimlaneFieldName: PropTypes.string,
}

export default AgileBoardRows

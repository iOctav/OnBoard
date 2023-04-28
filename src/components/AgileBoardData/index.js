import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';
import { useGetIssuesByAgileSprintQuery } from '../../features/sprint/sprintSlice';
import { useMemo } from 'react';

function AgileBoardData({agileId, sprintId, sprint, hideOrphansSwimlane, orphansAtTheTop,
                          colorField, systemSwimlaneExist, visibleCardFields, swimlaneFieldName}) {
  const issueIds = useMemo(() => {
    if (!sprint?.board) return [];
    return [sprint.board.orphanRow, ...sprint.board.trimmedSwimlanes].reduce((acc1, row) =>
      [...acc1, ...(row.cells.reduce((acc1, cell) =>
        [...acc1, ...cell.issues.reduce((acc2, issue) => [...acc2, issue.id], [])], [])),[]],
    [])
    .filter(id => !(id instanceof Array))
    .sort()}, [sprint?.board]);
  const { data: issues,
    isSuccess
  } = useGetIssuesByAgileSprintQuery(issueIds);
  let issuesDict = undefined;
  if (isSuccess) {
    issuesDict = issues.entities;
  }

  return(<tbody>
  <AgileBoardRows
      agileId={agileId}
      sprintId={sprintId}
      orphanRow={sprint.board.orphanRow}
      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
      hideOrphansSwimlane={hideOrphansSwimlane}
      orphansAtTheTop={orphansAtTheTop}
      level={-1}
      system={systemSwimlaneExist}
      colorField={colorField}
      visibleCardFields={visibleCardFields}
      swimlaneFieldName={swimlaneFieldName}
      currentSwimlanes={[]}
      issuesDict={issuesDict}/>
  </tbody>);
}

AgileBoardData.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  colorField: PropTypes.string,
  systemSwimlaneExist: PropTypes.bool,
  visibleCardFields: PropTypes.arrayOf(PropTypes.string),
  swimlaneFieldName: PropTypes.string,
};

export default AgileBoardData;

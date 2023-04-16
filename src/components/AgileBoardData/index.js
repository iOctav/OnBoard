import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';
import { useGetIssuesByAgileSprintQuery } from '../../features/sprint/sprintSlice';

function AgileBoardData({agileId, sprintId, sprint, hideOrphansSwimlane, orphansAtTheTop,
                          colorField, systemSwimlaneExist, visibleCardFields, swimlaneFieldName}) {

  const { data: issues,
    isLoading,
    isSuccess,
    isError
  } = useGetIssuesByAgileSprintQuery({agileId, sprintId});
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

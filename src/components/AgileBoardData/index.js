import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';

function AgileBoardData({agileId, sprintId, sprint, hideOrphansSwimlane, orphansAtTheTop,
                          colorField, systemSwimlaneExist, visibleCardFields, swimlaneFieldName}) {
  return(<tbody>
    <AgileBoardRows
      agileId={agileId}
      sprintId={sprintId}
      orphanRow={sprint.board.orphanRow}
      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
      hideOrphansSwimlane={hideOrphansSwimlane}
      orphansAtTheTop={orphansAtTheTop}
      level={systemSwimlaneExist ? 0 : -1}
      system={systemSwimlaneExist}
      colorField={colorField}
      visibleCardFields={visibleCardFields}
      swimlaneFieldName={swimlaneFieldName}/>
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

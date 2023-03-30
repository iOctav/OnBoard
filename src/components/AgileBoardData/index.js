import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';

function AgileBoardData({sprint, hideOrphansSwimlane, orphansAtTheTop, colorField, systemSwimlaneExist}) {
  return(<tbody>
    <AgileBoardRows
      orphanRow={sprint.board.orphanRow}
      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
      hideOrphansSwimlane={hideOrphansSwimlane}
      orphansAtTheTop={orphansAtTheTop}
      level={systemSwimlaneExist ? 0 : -1}
      system={systemSwimlaneExist}
      colorField={colorField}/>
  </tbody>);
}

AgileBoardData.propTypes = {
  sprint: PropTypes.object,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  colorField: PropTypes.string,
  systemSwimlaneExist: PropTypes.bool,
};

export default AgileBoardData;

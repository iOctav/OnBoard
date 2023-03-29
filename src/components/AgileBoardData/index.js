import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';

function AgileBoardData({sprint, hideOrphansSwimlane, orphansAtTheTop, colorField}) {
  return(<tbody>
    <AgileBoardRows
      orphanRow={sprint.board.orphanRow}
      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
      hideOrphansSwimlane={hideOrphansSwimlane}
      orphansAtTheTop={orphansAtTheTop}
      level={0}
      colorField={colorField}/>
  </tbody>);
}

AgileBoardData.propTypes = {
  sprint: PropTypes.object,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  colorField: PropTypes.string
};

export default AgileBoardData;

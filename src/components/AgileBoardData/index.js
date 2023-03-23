import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';
import { useGetSpecificSprintForSpecificAgileQuery } from '../../features/sprint/sprintSlice';

function AgileBoardData({agileId, sprintId, hideOrphansSwimlane, orphansAtTheTop}) {
  const { data: sprint,
    isLoading,
    isSuccess,
    isError
  } = useGetSpecificSprintForSpecificAgileQuery({agileId, sprintId: (sprintId || 'current')});

  if (isLoading) {
    return null;
  } else if (isSuccess) {
    return <AgileBoardRows
      orphanRow={sprint.board.orphanRow}
      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
      hideOrphansSwimlane={hideOrphansSwimlane}
      orphansAtTheTop={orphansAtTheTop}/>
  } else if (isError) {
    return null;
  }
}

AgileBoardData.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
};

export default AgileBoardData;

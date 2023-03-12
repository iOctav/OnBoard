import { useGetSpecificSprintForSpecificAgileQuery } from '../../store/youtrackApi';
import AgileBoardRows from '../AgileBoardRows';
import PropTypes from 'prop-types';

function AgileBoardData({agileId, sprintId}) {
  const { data: sprint,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSpecificSprintForSpecificAgileQuery({agileId, sprintId: (sprintId || 'current')})

  if (isLoading) {
    return null;
  } else if (isSuccess) {
    return <AgileBoardRows
      orphanRow={sprint.board.orphanRow}
      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
      hideOrphansSwimlane={sprint.agile.hideOrphansSwimlane}
      orphansAtTheTop={sprint.agile.orphansAtTheTop}/>
  } else if (isError) {
    return null;
  }
}

AgileBoardData.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string,
};

export default AgileBoardData;

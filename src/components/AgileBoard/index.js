import PropTypes from 'prop-types';
import AgileBoardRows from '../AgileBoardRows';
import AgileBoardHeader from '../AgileBoardHeader';

function AgileBoard({sprint}) {
  const columns = sprint.board.columns;
  return (
    <table>
      <colgroup>
        { columns.map(column => <col key={'col-' + column.id} />) }
      </colgroup>
      <AgileBoardHeader columns={columns}></AgileBoardHeader>
      <AgileBoardRows orphanRow={sprint.board.orphanRow}
                      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
                      hideOrphansSwimlane={sprint.agile.hideOrphansSwimlane}
                      orphansAtTheTop={sprint.agile.orphansAtTheTop} />
    </table>
  );
}

AgileBoard.propTypes = {
  sprint: PropTypes.object
}

export default AgileBoard

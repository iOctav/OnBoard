import PropTypes from 'prop-types';
import AgileBoardRows from '../AgileBoardRows';
import AgileBoardHeader from '../AgileBoardHeader';

function AgileBoard({agileSettings}) {
  const columnTitles = agileSettings.columnSettings.columns.map(column => column.presentation);
  return (
    <table>
      <colgroup>
        { agileSettings.columnSettings.columns.map(column => <col key={'col-' + column.presentation} />) }
      </colgroup>
      <AgileBoardHeader columnSettings={agileSettings.columnSettings}></AgileBoardHeader>
      <AgileBoardRows cards={agileSettings.currentSprint.issues} columnField={agileSettings.columnSettings.field} columnStates={columnTitles} swimlaneSettings={agileSettings.swimlaneSettings}/>
    </table>
  );
}

AgileBoard.propTypes = {
  agileSettings: PropTypes.object
}

export default AgileBoard

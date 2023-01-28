import PropTypes from 'prop-types';
import HeaderCell from '../HeaderCell';

function AgileBoardHeader({columnSettings}) {
  return (
    <thead>
      <tr>
        {
          columnSettings.columns.map(column => (<HeaderCell key={'cell-head-' + column.presentation} caption={column.presentation} cardsCount={0}></HeaderCell>))
          // columnSettings.columns.map(column => <td>{column.presentation}</td>)
        }
      </tr>
    </thead>
  );
}

AgileBoardHeader.propTypes = {
  columnSettings: PropTypes.object
}

export default AgileBoardHeader

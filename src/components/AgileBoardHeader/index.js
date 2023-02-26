import PropTypes from 'prop-types';
import HeaderCell from '../HeaderCell';

function AgileBoardHeader({columns}) {
  return (
    <thead>
      <tr>
        {
          columns.map(column => (
            <HeaderCell key={'cell-head-' + column.id} caption={column.agileColumn.presentation} cardsCount={0}></HeaderCell>)
          )
        }
      </tr>
    </thead>
  );
}

AgileBoardHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object)
}

export default AgileBoardHeader

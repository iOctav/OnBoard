import PropTypes from 'prop-types';
import HeaderCell from '../HeaderCell';

function AgileBoardHeader({columns}) {
  return (
    <thead>
      <tr>
        {
          columns.map(column => (
            <HeaderCell key={'cell-head-' + column.id} caption={column.fieldValues.map(field => field.presentation).join(', ')} cardsCount={0}></HeaderCell>)
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

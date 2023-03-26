import PropTypes from 'prop-types';
import HeaderCell from '../HeaderCell';
import FakeTableCells from '../FakeTableCells';

function AgileBoardHeader({columns}) {
  return (
    <thead>
      <tr>
        <FakeTableCells/>
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

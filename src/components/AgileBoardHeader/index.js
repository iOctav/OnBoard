import HeaderCell from '../HeaderCell';
import FakeTableCells from '../FakeTableCells';
import { useSelector } from 'react-redux';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';

function AgileBoardHeader() {
  const columns = useSelector(selectColumnsMetadata);

  return (
    <thead>
      <tr>
        <FakeTableCells/>
        {
          columns.map(column => (
            <HeaderCell key={'cell-head-' + column.id} column={column}></HeaderCell>)
          )
        }
      </tr>
    </thead>
  );
}

AgileBoardHeader.propTypes = {
}

export default AgileBoardHeader

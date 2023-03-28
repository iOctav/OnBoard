import HeaderCell from '../HeaderCell';
import FakeTableCells from '../FakeTableCells';
import { useSelector } from 'react-redux';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';
import PropTypes from 'prop-types';

function AgileBoardHeader({agileName, sprintName, fieldName, explicitQuery}) {
  const columns = useSelector(selectColumnsMetadata);

  return (
    <thead>
      <tr>
        <FakeTableCells/>
        {
          columns.map(column => (
            <HeaderCell key={'cell-head-' + column.id}
                        column={column}
                        agileName={agileName}
                        sprintName={sprintName}
                        fieldName={fieldName}
                        explicitQuery={explicitQuery}/>)
          )
        }
      </tr>
    </thead>
  );
}

AgileBoardHeader.propTypes = {
  agileName: PropTypes.string.isRequired,
  sprintName: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  explicitQuery: PropTypes.string,
}

export default AgileBoardHeader

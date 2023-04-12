import PropTypes from 'prop-types';
import HeaderCell from '../HeaderCell';
import FakeTableCells from '../FakeTableCells';
import { useSelector } from 'react-redux';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';

function AgileBoardHeader({agileName, sprintName, fieldName, explicitQuery, swimlanesDepth}) {
  const columns = useSelector(selectColumnsMetadata);

  return (
    <thead>
      <tr>
        <FakeTableCells swimlanesDepth={swimlanesDepth}/>
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
  swimlanesDepth: PropTypes.number,
}

export default AgileBoardHeader

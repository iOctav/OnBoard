import styled from 'styled-components';

import PropTypes from 'prop-types';
import HeaderCell from '../HeaderCell';
import FakeTableCells from '../FakeTableCells';
import { useSelector } from 'react-redux';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';

const StickyTHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 2;
`;

function AgileBoardHeader({agileName, sprintName, fieldName, explicitQuery, swimlanesDepth}) {
  const columns = useSelector(selectColumnsMetadata);

  return (
    <StickyTHead>
      <tr>
        <FakeTableCells swimlanesDepth={swimlanesDepth}/>
        {
          columns.map(column => (
            <HeaderCell key={'cell-head-' + column.id}
                        column={column}
                        agileName={agileName}
                        sprintName={sprintName}
                        fieldName={fieldName}
                        cardsCount={column.cardsCount}
                        explicitQuery={explicitQuery}/>)
          )
        }
      </tr>
    </StickyTHead>
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

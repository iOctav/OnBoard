import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSwimlanesDepth } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';

const FakeCol = styled.col`
  width: var(--ring-unit);
`;

function AgileBoardColGroup({columnsCount}) {
  const swimlanesDepth = useSelector(selectSwimlanesDepth);
  return (
    <colgroup>
      { swimlanesDepth > 1 && Array.from({length: swimlanesDepth - 1}, (_, i) => (
        <FakeCol key={`fake-col-${i}`} />
      )) }
      { Array.from({length: columnsCount}, (_, i) => (
        <col key={`col-${i}`} />
      )) }
    </colgroup>
  );
}

AgileBoardColGroup.propTypes = {
  columnsCount: PropTypes.number.isRequired,
}

export default AgileBoardColGroup;

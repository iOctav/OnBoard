import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { selectSwimlanesDepth } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';

const FakeCol = styled.col`
  width: var(--ring-unit);
`;

const CollapsedCol = styled.col`
  width: calc(var(--ring-unit) * 8);
  padding: calc(var(--ring-unit)/2) 0 calc(var(--ring-unit)/2) calc(var(--ring-unit));
`;

function AgileBoardColGroup() {
  const swimlanesDepth = useSelector(selectSwimlanesDepth);
  const columns = useSelector(selectColumnsMetadata);

  return (
    <colgroup>
      { swimlanesDepth > 1 && Array.from({length: swimlanesDepth - 1}, (_, i) => (
        <FakeCol key={`fake-col-${i}`} />
      )) }
      { columns.map(col => col.collapsed ? (<CollapsedCol key={`col-${col.id}-collapsed`}/>) : (<col key={`col-${col.id}`}/>)) }
    </colgroup>
  );
}

AgileBoardColGroup.propTypes = {
}

export default AgileBoardColGroup;

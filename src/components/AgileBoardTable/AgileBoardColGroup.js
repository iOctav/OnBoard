import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';

const FakeCol = styled.col`
  width: var(--ring-unit);
`;

const CollapsedCol = styled.col`
  width: calc(var(--ring-unit) * 8);
  padding: calc(var(--ring-unit)/2) 0 calc(var(--ring-unit)/2) calc(var(--ring-unit));
`;

function AgileBoardColGroup({swimlanesDepth}) {
  const columns = useSelector(selectColumnsMetadata);

  return (
    <colgroup data-testid="agile-board-col-group">
      { swimlanesDepth > 0 && Array.from({length: swimlanesDepth}, (_, i) => (
        <FakeCol data-testid="fake-col" key={`fake-col-${i}`} />
      )) }
      { columns?.map(col => col.collapsed ? (<CollapsedCol data-testid="collapsed-col" key={`col-${col.id}-collapsed`}/>) : (<col data-testid="column" key={`col-${col.id}`}/>)) }
    </colgroup>
  );
}

AgileBoardColGroup.propTypes = {
  swimlanesDepth: PropTypes.number,
}

export default AgileBoardColGroup;

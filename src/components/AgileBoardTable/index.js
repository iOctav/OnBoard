import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileBoardHeader from '../AgileBoardHeader';
import AgileBoardData from '../AgileBoardData';
import AgileBoardColGroup from './AgileBoardColGroup';

const TableContainer = styled.table`
  min-width: 720px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  table-layout: fixed;
`;

function AgileBoardTable({agileId, sprintId, columns, hideOrphansSwimlane, orphansAtTheTop}) {
  return <TableContainer>
    {/*<colgroup>*/}
    {/*  { columns.map(column => <col key={'col-' + column.id} />) }*/}
    {/*</colgroup>*/}
    <AgileBoardColGroup columnsCount={columns.length}/>
    <AgileBoardHeader columns={columns}></AgileBoardHeader>
    <AgileBoardData agileId={agileId} sprintId={sprintId}
                     hideOrphansSwimlane={hideOrphansSwimlane}
                     orphansAtTheTop={orphansAtTheTop}/>
  </TableContainer>;
}

AgileBoardTable.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  columns: PropTypes.array,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
}

export default AgileBoardTable;

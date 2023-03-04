import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileBoardRows from '../AgileBoardRows';
import AgileBoardHeader from '../AgileBoardHeader';

const AgileBoardTable = styled.table`
  min-width: 720px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  border-collapse: collapse;
  table-layout: fixed;
`;

function AgileBoard({sprint}) {
  const columns = sprint.board.columns;
  return (
    <AgileBoardTable>
      <colgroup>
        { columns.map(column => <col key={'col-' + column.id} />) }
      </colgroup>
      <AgileBoardHeader columns={columns}></AgileBoardHeader>
      <AgileBoardRows orphanRow={sprint.board.orphanRow}
                      trimmedSwimlanes={sprint.board.trimmedSwimlanes}
                      hideOrphansSwimlane={sprint.agile.hideOrphansSwimlane}
                      orphansAtTheTop={sprint.agile.orphansAtTheTop} />
    </AgileBoardTable>
  );
}

AgileBoard.propTypes = {
  sprint: PropTypes.object
}

export default AgileBoard

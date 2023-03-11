import styled from 'styled-components';

import AgileBoardRows from '../AgileBoardRows';
import AgileBoardHeader from '../AgileBoardHeader';
import AgileSearchQueryPanel from '../AgileSearchQueryPanel';
import AgileTopToolbar from '../AgileTopToolbar';
import { useGetSpecificSprintForSpecificAgileQuery } from '../../store/youtrackApi';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useParams}  from 'react-router-dom';

const AgileBoardTable = styled.table`
  min-width: 720px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  table-layout: fixed;
`;

function AgileBoard() {
  const { agileId, sprintId } = useParams();
  const { data: sprint,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSpecificSprintForSpecificAgileQuery({agileId, sprintId: (sprintId || 'current')})

  let content

  if (isLoading) {
    content = <LoaderScreen/>
  } else if (isSuccess) {
    const columns = sprint.board.columns;
    content = <div>
      <AgileSearchQueryPanel currentAgileId={agileId} currentAgileName={sprint.agile.name}/>
      <AgileTopToolbar/>
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
    </div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return content;
}

export default AgileBoard;

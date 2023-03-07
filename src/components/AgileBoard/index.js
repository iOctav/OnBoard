import styled from 'styled-components';

import AgileBoardRows from '../AgileBoardRows';
import AgileBoardHeader from '../AgileBoardHeader';
import AgileSearchQueryPanel from '../AgileSearchQueryPanel';
import AgileTopToolbar from '../AgileTopToolbar';
import { useGetCurrentSprintForSpecificAgileQuery } from '../../store/youtrackApi';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';

const AgileBoardTable = styled.table`
  min-width: 720px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  table-layout: fixed;
`;

function AgileBoard() {
  const { data: sprint,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCurrentSprintForSpecificAgileQuery('131-2')

  let content

  if (isLoading) {
    content = <LoaderScreen/>
  } else if (isSuccess) {
    const columns = sprint.board.columns;
    content = <div>
      <AgileSearchQueryPanel/>
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

export default AgileBoard

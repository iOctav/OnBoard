import styled from 'styled-components';

import AgileBoardRows from '../AgileBoardRows';
import AgileBoardHeader from '../AgileBoardHeader';
import AgileSearchQueryPanel from '../AgileSearchQueryPanel';
import AgileTopToolbar from '../AgileTopToolbar';
import { useGetAgilesByIdQuery } from '../../store/youtrackApi';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useParams}  from 'react-router-dom';
import AgileBoardData from '../AgileBoardData';

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
  const { data: agile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAgilesByIdQuery(agileId)

  let content

  if (isLoading) {
    content = <LoaderScreen/>
  } else if (isSuccess) {
    const columns = agile.columnSettings.columns;
    const realSprintId = sprintId.toLowerCase() === 'current'
      ? agile.currentSprint.id : sprintId
    const sprint = agile.sprints.find(sprint => sprint.id === realSprintId)
    content = <div>
      <AgileSearchQueryPanel currentAgileId={agile.id} currentAgileName={agile.name}/>
      <AgileTopToolbar sprintsDisabled={agile.sprintsSettings.disableSprints} agileId={agile.id} sprint={{id: sprint.id, name: sprint.name, from: sprint.start, to: sprint.finish}}/>
      <AgileBoardTable>
        <colgroup>
          { columns.map(column => <col key={'col-' + column.id} />) }
        </colgroup>
        <AgileBoardHeader columns={columns}></AgileBoardHeader>
        <AgileBoardData agileId={agile.id} sprintId={realSprintId}/>
      </AgileBoardTable>
    </div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return content;
}

export default AgileBoard;

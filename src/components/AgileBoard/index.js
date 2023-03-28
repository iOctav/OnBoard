import AgileSearchQueryPanel from '../AgileSearchQueryPanel';
import AgileTopToolbar from '../AgileTopToolbar';
import { useGetAgilesByIdQuery } from '../../features/agile/agileSlice';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useLocation, useParams } from 'react-router-dom';
import AgileBoardSettings from '../AgileBoardSettings';
import { useState } from 'react';
import AgileBoardTable from '../AgileBoardTable';
import AgileBoardFooter from './AgileBoardFooter';

function AgileBoard() {
  const { agileId, sprintId } = useParams();
  const { search } = useLocation();
  const [settingsVisible, setSettingsVisible] = useState(search.startsWith('?settings'));
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
      ? agile.currentSprint.id : sprintId;
    const sprint = agile.sprints.find(sprint => sprint.id === realSprintId);
    content = <div>
      <AgileSearchQueryPanel currentAgileId={agile.id} currentAgileName={agile.name}/>
      <AgileTopToolbar sprintsDisabled={agile.sprintsSettings.disableSprints}
                       agileId={agile.id}
                       sprint={{id: sprint.id, name: sprint.name, from: sprint.start, to: sprint.finish}}
                       onSettingsButtonClick={() => setSettingsVisible((state) => !state)}/>
      <AgileBoardSettings visible={settingsVisible}
                          disabled={process.env.REACT_APP_YOUTRACK_SETTINGS_DISABLED === 'true'}
                          selectedTab={new URLSearchParams(search).get('tab')}
                          agileId={agile.id}
                          agileName={agile.name}
                          projects={agile.projects}
                          columnSettings={agile.columnSettings}
                          swimlaneSettings={agile.swimlaneSettings}
                          hideOrphansSwimlane={agile.hideOrphansSwimlane}
                          orphansAtTheTop={agile.orphansAtTheTop}
                          reportSettings={agile.extensions?.reportSettings}
                          owner={agile.owner}
                          sprintsSettings={agile.sprintsSettings}
                          cardSettings={agile.cardSettings}
                          colorizeCustomFields={agile.colorizeCustomFields}
                          colorCoding={agile.colorCoding}
                          estimationField={agile.estimationField}
                          originalEstimationField={agile.originalEstimationField}
                          readSharingSettings={agile.readSharingSettings}
                          updateSharingSettings={agile.updateSharingSettings}/>

      <AgileBoardTable agileId={agile.id} sprintId={realSprintId}
                      columns={columns}
                      hideOrphansSwimlane={agile.hideOrphansSwimlane}
                      orphansAtTheTop={agile.orphansAtTheTop}/>
      <AgileBoardFooter owner={agile.owner}/>
    </div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return content;
}

export default AgileBoard;

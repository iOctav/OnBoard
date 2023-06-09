import AgileSearchQueryPanel from '../AgileSearchQueryPanel';
import AgileTopToolbar from '../AgileTopToolbar';
import { useGetAgilesByIdQuery } from '../../features/agile/agileSlice';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useLocation, useParams } from 'react-router-dom';
import AgileBoardSettings from '../AgileBoardSettings';
import { useEffect, useState } from 'react';
import AgileBoardTable from '../AgileBoardTable';
import AgileBoardFooter from './AgileBoardFooter';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../features/auth/localeUtils';
import { useDispatch } from 'react-redux';
import { resetSelection } from '../../features/card/cardSlice';

function AgileBoard() {
  const dispatch = useDispatch();
  const { agileId, sprintId } = useParams();
  const { search } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === SUPPORTED_LANGUAGES.Russian) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = '/favicon_ru.ico';
    }
    return () => dispatch(resetSelection());
  }, [i18n.language, agileId, sprintId]);

  const [settingsVisible, setSettingsVisible] = useState(search.startsWith('settings'));
  const { data: agile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAgilesByIdQuery(agileId, {
    pollingInterval: 58000,
  });

  let content

  if (isLoading) {
    content = <LoaderScreen/>
  } else if (isSuccess) {
    const realSprintId = sprintId.toLowerCase() === 'current'
      ? agile.currentSprint?.id : sprintId;
    const sprint = agile.sprints.find(sprint => sprint.id === realSprintId);
    if (!sprint) {
      return <div data-testid="board-error">Sprint not found</div>;
    }
    content = <div data-testid="agile-board">
      <AgileSearchQueryPanel currentAgileId={agile.id} currentAgileName={agile.name}/>
      <AgileTopToolbar sprintsDisabled={agile.sprintsSettings?.disableSprints}
                       agileId={agile.id}
                       sprint={{id: sprint.id, name: sprint.name, from: sprint.start, to: sprint.finish}}
                       onSettingsButtonClick={() => setSettingsVisible((state) => !state)}/>
      <AgileBoardSettings visible={settingsVisible}
                          disabled={process.env.REACT_APP_YOUTRACK_SETTINGS_DISABLED === 'true'}
                          selectedTab={new URLSearchParams(search).get('tab')}
                          agileId={agile.id}
                          agileName={agile.name}
                          sprintId={realSprintId}
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
                       agileName={agile.name} sprintName={sprint.name}
                       columnFieldName={agile.columnSettings?.field?.name}
                       explicitQuery={agile.sprintsSettings?.explicitQuery}
                       hideOrphansSwimlane={agile.hideOrphansSwimlane}
                       orphansAtTheTop={agile.orphansAtTheTop}
                       colorField={agile.colorCoding?.prototype?.name}
                       systemSwimlaneExist={agile.swimlaneSettings?.enabled}
                       visibleCardFields={agile.cardSettings?.fields?.map(field => field.field?.name)}
                       swimlaneFieldName={agile.swimlaneSettings?.enabled ? agile.swimlaneSettings?.field.name : undefined}/>
      <AgileBoardFooter owner={agile.owner}/>
    </div>
  } else if (isError) {
    content = <div data-testid="board-error">{error.toString()}</div>
  }

  return content;
}

export default AgileBoard;

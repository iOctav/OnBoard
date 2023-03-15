import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SettingsControl from '../SettingsControl';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useState } from 'react';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetProjectsQuery, useLazyGetUsersQuery } from '../../store/youtrackApi';
import Button from '@jetbrains/ring-ui/dist/button/button';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import BoardBehaviorControl from './BoardBehaviorControl';
import UnderControlDescription from './UnderControlDescription';
import LazyTagBox from '../LazyTagBox';

const InlineInput = styled(Input)`
  display: inline-block;
  margin-right: calc(var(--ring-unit) * 1);
`;

const FloatRightButtonGroup = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
`;

function GeneralSettings({agileName, agileId, initialOwner, sprintsSettings, projects}) {
  const { t } = useTranslation();
  const [ name, setName ] = useState(agileName);
  const [ owner, setOwner ] = useState({key: initialOwner.id, label: initialOwner.fullName})
  const [ enableSprints, setEnableSprints ] = useState(!sprintsSettings.disableSprints);
  const [ projectTags, setProjectTags ] = useState(projects.map(project => ({key: project.id, label: project.shortName})));
  return (<div>
    <FloatRightButtonGroup className="general-settings-action-buttons">
      <Button onClick={() => {}} height={ControlsHeight.S}>{t('Clone board')}</Button>
      <Button danger onClick={() => {}} height={ControlsHeight.S}>{t('Delete board')}</Button>
    </FloatRightButtonGroup>
    <SettingsControl label={t('Name')}>
      <InlineInput height={ControlsHeight.S} size={Size.M} value={name} onChange={(event) => setName(event.target.value)}/>
      <span>
        {t('owned by ')}
        <LazySelectBox
          type="INLINE"
          filter={true}
          selected={owner}
          onSelect={setOwner}
          lazyDataLoaderHook={useLazyGetUsersQuery}
          makeDataset={(data) => data.map((user) => ({key: user.id, label: user.name, type: 'user', showGeneratedAvatar: true, username: user.name}))} />
      </span>
    </SettingsControl>
    <SettingsControl label={t('Projects')}>
      <LazyTagBox placeholder={t('Add project')} size={Size.L}
        onAddTag={(tag) => setProjectTags([...projectTags, tag.tag])}
        tags={projectTags}
        lazyDataLoaderHook={useLazyGetProjectsQuery}
        makeDataSource={data => data.map(project => ({key: project.id, label: project.shortName}))}/>
    </SettingsControl>
    <SettingsControl label={t('Can view and use the board')}>
      <div>Group and users control. Will be soon</div>
      <UnderControlDescription>{t('Members can view this board including fields and values that are used in the board settings')}</UnderControlDescription>
    </SettingsControl>
    <SettingsControl label={t('Can edit board settings')}>
      <div>Group and users control. Will be soon</div>
      <UnderControlDescription>{t('Users with ')}<b>{t('Low-level administration')}</b>
        {t(' permission can edit the settings of any board that they can view and use')}</UnderControlDescription>
    </SettingsControl>
    <SettingsControl label={t('Sprints')}>
      <ButtonGroup>
        <Button active={enableSprints} height={ControlsHeight.S} onClick={() => setEnableSprints(true)}>
          {t('Enabled')}
        </Button>
        <Button active={!enableSprints} height={ControlsHeight.S} onClick={() => setEnableSprints(false)}>
          {t('Disabled')}
        </Button>
      </ButtonGroup>
    </SettingsControl>
    <SettingsControl label={t('Board behavior')}>
      <BoardBehaviorControl sprintsEnabled={enableSprints}
                            agileId={agileId}
                            addNewIssueToKanban={sprintsSettings.addNewIssueToKanban}
                            isExplicit={sprintsSettings.isExplicit}
                            explicitQuery={sprintsSettings.explicitQuery}
                            hideSubtasksOfCards={sprintsSettings.hideSubtasksOfCards}
                            defaultSprint={sprintsSettings.defaultSprint}
                            projectShortNames={projectTags.map(proj => proj.label)}
                            sprintSyncField={sprintsSettings.sprintSyncField}/>
    </SettingsControl>
  </div>);
}

GeneralSettings.propTypes = {
  agileName: PropTypes.string.isRequired,
  agileId: PropTypes.string.isRequired,
  initialOwner: PropTypes.object.isRequired,
  sprintsSettings: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GeneralSettings;

import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import SettingsControl from '../SettingsControl';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useState } from 'react';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetProjectsQuery, useLazyGetUsersQuery } from '../../app/services/youtrackApi';
import Button from '@jetbrains/ring-ui/dist/button/button';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import BoardBehaviorControl from './BoardBehaviorControl';
import UnderControlDescription from './UnderControlDescription';
import LazyTagBox from '../LazyTagBox';
import UsersGroupsSelect from './UsersGroupsSelect';

const InlineInput = styled(Input)`
  display: inline-block;
  margin-right: calc(var(--ring-unit) * 1);
`;

const FloatRightButtonGroup = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
`;

function GeneralSettings({disabled, agileName, agileId, initialOwner, sprintsSettings,
                           projects, readSharingSettings, updateSharingSettings}) {
  const { t } = useTranslation();
  const [ name, setName ] = useState(agileName);
  const [ owner, setOwner ] = useState({key: initialOwner.id, label: initialOwner.fullName})
  const [ enableSprints, setEnableSprints ] = useState(!sprintsSettings.disableSprints);
  const [ projectTags, setProjectTags ] = useState(projects.map(project => ({key: project.id, label: project.name})));
  let canViewGroupsAndUsers = [...readSharingSettings.permittedGroups.map(group => ({key: group.id, label: group.name})),
    ...readSharingSettings.permittedUsers.map(user => ({key: user.id, label: user.name}))];
  if (readSharingSettings.projectBased) {
    canViewGroupsAndUsers.push({key: 'project-base', label: t('issue readers')});
  }
  const [ canView, setCanView ] = useState(canViewGroupsAndUsers);
  let canEditGroupsAndUsers = [...updateSharingSettings.permittedGroups.map(group => ({key: group.id, label: group.name})),
    ...updateSharingSettings.permittedUsers.map(user => ({key: user.id, label: user.name}))];
  if (updateSharingSettings.projectBased) {
    canEditGroupsAndUsers.push({key: 'project-base', label: t('project updaters')});
  }
  const [ canEdit, setCanEdit ] = useState(canEditGroupsAndUsers);
  return (<div>
    <FloatRightButtonGroup className="general-settings-action-buttons">
      <Button disabled={disabled} onClick={() => {}} height={ControlsHeight.S}>{t('Clone board')}</Button>
      <Button disabled={disabled} danger onClick={() => {}} height={ControlsHeight.S}>{t('Delete board')}</Button>
    </FloatRightButtonGroup>
    <SettingsControl label={t('Name')}>
      <InlineInput disabled={disabled} height={ControlsHeight.S} size={Size.M} value={name} onChange={(event) => setName(event.target.value)}/>
      <span>
        {t('owned by') + ' '}
        <LazySelectBox
          disabled={disabled}
          type="INLINE"
          filter={true}
          selected={owner}
          onSelect={setOwner}
          lazyDataLoaderHook={useLazyGetUsersQuery}
          makeDataset={(data) => data.map((user) => ({key: user.id, label: `${user.fullName}${user.login !== user.fullName ? ' (' + user.login + ')' : ''}`,
            type: 'user', icon: user.avatarUrl}))} />
      </span>
    </SettingsControl>
    <SettingsControl label={t('Projects')}>
      <LazyTagBox disabled={disabled} placeholder={t('Add project')} size={Size.L}
        onAddTag={(tag) => setProjectTags([...projectTags, tag.tag])}
        tags={projectTags}
        lazyDataLoaderHook={useLazyGetProjectsQuery}
        makeDataSource={data => data.map(project => ({key: project.id, label: project.name}))}/>
    </SettingsControl>
    <SettingsControl label={t('Can view and use the board')}>
      <UsersGroupsSelect disabled={disabled} type="INLINE"
                         projectBasedLabel="issue readers"
                         deselectAllUsersAndGroups={() => setCanView([])}
                         selected={canView}
                         onChange={setCanView}/>
      <UnderControlDescription>{t('Members can view this board including fields and values that are used in the board settings')}</UnderControlDescription>
    </SettingsControl>
    <SettingsControl label={t('Can edit board settings')}>
      <UsersGroupsSelect disabled={disabled} type="INLINE"
                         projectBasedLabel="project updaters"
                         deselectAllUsersAndGroups={() => setCanEdit([])}
                         selected={canEdit}
                         onChange={setCanEdit}/>
      <UnderControlDescription>
        <Trans t={t}>Users with <strong>Low-level administration</strong> permission can edit the settings of any board that they can view and use</Trans>
      </UnderControlDescription>
    </SettingsControl>
    <SettingsControl label={t('Sprints')}>
      <ButtonGroup>
        <Button disabled={disabled} active={enableSprints} height={ControlsHeight.S} onClick={() => setEnableSprints(true)}>
          {t('Enabled')}
        </Button>
        <Button disabled={disabled} active={!enableSprints} height={ControlsHeight.S} onClick={() => setEnableSprints(false)}>
          {t('Disabled.$$noContext')}
        </Button>
      </ButtonGroup>
    </SettingsControl>
    <SettingsControl label={t('Board behavior')}>
      <BoardBehaviorControl disabled={disabled}
                            sprintsEnabled={enableSprints}
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
  disabled: PropTypes.bool,
  agileName: PropTypes.string.isRequired,
  agileId: PropTypes.string.isRequired,
  initialOwner: PropTypes.object.isRequired,
  sprintsSettings: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  readSharingSettings: PropTypes.object.isRequired,
};

export default GeneralSettings;

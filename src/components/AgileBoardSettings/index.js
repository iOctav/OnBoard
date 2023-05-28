import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Tabs, Tab } from '@jetbrains/ring-ui/dist/tabs/tabs';
import { useCallback, useState } from 'react';
import ColumnsSettings from '../ColumnsSettings';
import SwimlanesSettings from '../SwimlanesSettings';
import { useTranslation } from 'react-i18next';
import ChartSettings from '../ChartSettings';
import GeneralSettings from '../GeneralSettings';
import CardSettings from '../CardSettings';
import NestedSwimlanesSettings from '../NestedSwimlanesSettings';
import YouTrackAgileSettingsLink from './YouTrackAgileSettingsLink';

const HeaderSpan = styled.span`
  font-size: 24px;
  line-height: 28px;
  margin-right: calc(var(--ring-unit) * 2);
`;

const HeaderSettingsDiv = styled.div`
  margin-top: calc(var(--ring-unit) * 2);
`;

const TitleSpan = styled.span`
  color: var(--ring-secondary-color);
`;

const AgileBoardSettingsContainer = styled.div`
  margin: 0 calc(var(--ring-unit) * 4) calc(var(--ring-unit)*5);
  z-index: 0;
;`

const TabsContainer = styled(Tabs)`
  margin-top: calc(var(--ring-unit) * 2);
`;

function AgileBoardSettings({visible, disabled, selectedTab, agileId, agileName, sprintId, columnSettings, colorCoding,
    swimlaneSettings, hideOrphansSwimlane, orphansAtTheTop, colorizeCustomFields,
    reportSettings, owner, sprintsSettings, projects, cardSettings, estimationField,
    originalEstimationField, readSharingSettings, updateSharingSettings}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(selectedTab || 'nested-swimlanes');
  const selectHandler = useCallback((key) => {
    setSelected(key);
  }, []);
  const projectShortNames = projects.map(project => project.shortName);

  return visible && (<AgileBoardSettingsContainer className="agile-board-settings">
    <HeaderSettingsDiv className="agile-board-settings-title">
      <HeaderSpan>{t('Board Settings')}</HeaderSpan>
      <TitleSpan>{agileName}</TitleSpan>
    </HeaderSettingsDiv>
    <TabsContainer autoCollapse
        selected={selected}
        onSelect={selectHandler}>
      <Tab id="general" key="general" title={t('General')}>
        <YouTrackAgileSettingsLink agileId={agileId} sprintId={sprintId} title={'YouTrack ' + t('General')} linkId="general"/>
        <GeneralSettings disabled={disabled} agileName={agileName} agileId={agileId}
                         initialOwner={owner} sprintsSettings={sprintsSettings}
                         projects={projects} readSharingSettings={readSharingSettings}
                         updateSharingSettings={updateSharingSettings}/>
      </Tab>
      <Tab id="columns-and swimlanes" key="columns-and swimlanes" title={t('Columns and Swimlanes')}>
        <YouTrackAgileSettingsLink agileId={agileId} sprintId={sprintId} title={'YouTrack ' + t('Columns and Swimlanes')} linkId="columns-and swimlanes"/>
        <ColumnsSettings disabled={disabled} agileId={agileId} columnSettings={columnSettings}/>
        <SwimlanesSettings
          disabled={disabled}
          agileId={agileId}
          swimlaneSettings={swimlaneSettings}
          projectShortNames={projectShortNames}
          orphansAtTheTop={orphansAtTheTop}
          hideOrphansSwimlane={hideOrphansSwimlane}/>
      </Tab>
      <Tab id="card" key="card" title={t('Card')}>
        <YouTrackAgileSettingsLink agileId={agileId} sprintId={sprintId} title={'YouTrack ' + t('Card')} linkId="card"/>
        <CardSettings disabled={disabled}
                      cardSettings={cardSettings}
                      cardOnSeveralSprints={sprintsSettings.cardOnSeveralSprints}
                      colorizeCustomFields={colorizeCustomFields}
                      projects={projects}
                      colorCoding={colorCoding}
                      estimationField={estimationField}
                      originalEstimationField={originalEstimationField}
                      sprintsEnabled={!sprintsSettings.disableSprints}/>
      </Tab>
      <Tab id="chart" key="chart" title={t('Chart')}>
        <YouTrackAgileSettingsLink agileId={agileId} sprintId={sprintId} title={'YouTrack ' + t('Chart')} linkId="chart"/>
        <ChartSettings disabled={disabled} reportSettings={reportSettings}/>
      </Tab>
      <Tab id="nested-swimlanes" key="nested-swimlanes" title={t('Nested Swimlanes')}>
        <NestedSwimlanesSettings swimlaneSettings={swimlaneSettings}
                                 projectShortNames={projectShortNames}
                                 hideOrphansSwimlane={hideOrphansSwimlane}/>
      </Tab>
    </TabsContainer>
  </AgileBoardSettingsContainer>);
}

AgileBoardSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  selectedTab: PropTypes.string,
  agileId: PropTypes.string.isRequired,
  agileName: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  columnSettings: PropTypes.object,
  swimlaneSettings: PropTypes.object,
  reportSettings: PropTypes.object,
  projectShortNames: PropTypes.arrayOf(PropTypes.string),
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  owner: PropTypes.object,
  sprintsSettings: PropTypes.object,
  projects: PropTypes.arrayOf(PropTypes.object),
  cardSettings: PropTypes.object,
  colorizeCustomFields: PropTypes.bool,
  colorCoding: PropTypes.object,
  estimationField: PropTypes.object,
  originalEstimationField: PropTypes.object,
  readSharingSettings: PropTypes.object,
  updateSharingSettings: PropTypes.object,
}

export default AgileBoardSettings

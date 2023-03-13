import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Tabs, Tab } from '@jetbrains/ring-ui/dist/tabs/tabs';
import { useCallback, useState } from 'react';
import ColumnsSettings from '../ColumnsSettings';
import SwimlanesSettings from '../SwimlanesSettings';
import { useTranslation } from 'react-i18next';
import ChartSettings from '../ChartSettings';

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

function AgileBoardSettings({visible, agileId, agileName, columnSettings,
    swimlaneSettings, projectShortName, hideOrphansSwimlane, orphansAtTheTop,
    reportSettings}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('2');
  const selectHandler = useCallback((key) => {
    setSelected(key);
  }, []);

  return visible && (<AgileBoardSettingsContainer className="agile-board-settings">
    <HeaderSettingsDiv className="agile-board-settings-title">
      <HeaderSpan>Board Settings</HeaderSpan>
      <TitleSpan>{agileName}</TitleSpan>
    </HeaderSettingsDiv>
    <TabsContainer autoCollapse
        selected={selected}
        onSelect={selectHandler}>
      <Tab disabled id="1" key="general" title={t('General')}>Will be soon</Tab>
      <Tab id="2" key="2" title={t('Columns and Swimlanes')}>
        <ColumnsSettings agileId={agileId} columnSettings={columnSettings}/>
        <SwimlanesSettings
          agileId={agileId}
          swimlaneSettings={swimlaneSettings}
          projectShortName={projectShortName}
          orphansAtTheTop={orphansAtTheTop}
          hideOrphansSwimlane={hideOrphansSwimlane}/>
      </Tab>
      <Tab disabled id="3" key="3" title={t('Card')}>Will be soon</Tab>
      <Tab id="4" key="4" title={t('Chart')}>
        <ChartSettings reportSettings={reportSettings}/>
      </Tab>
    </TabsContainer>
  </AgileBoardSettingsContainer>);
}

AgileBoardSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
  agileId: PropTypes.string.isRequired,
  agileName: PropTypes.string.isRequired,
  columnSettings: PropTypes.object,
  swimlaneSettings: PropTypes.object,
  reportSettings: PropTypes.object,
  projectShortName: PropTypes.string,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
}

export default AgileBoardSettings

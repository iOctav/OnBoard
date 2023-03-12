import styled from 'styled-components';

import PropTypes from 'prop-types';
import { Tabs, Tab } from '@jetbrains/ring-ui/dist/tabs/tabs';
import { useCallback, useState } from 'react';
import ColumnsSettings from './ColumnsSettings';

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

function AgileBoardSettings({visible, agileId, agileName, columnSettings}) {
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
      <Tab disabled id="1" key="general" title="General">Will be soon</Tab>
      <Tab id="2" key="2" title="Columns and Swimlanes">
        <ColumnsSettings agileId={agileId} columnSettings={columnSettings}/>
      </Tab>
      <Tab disabled id="3" key="3" title="Card">Will be soon</Tab>
      <Tab disabled id="4" key="4" title="Chart">Will be soon</Tab>
    </TabsContainer>
  </AgileBoardSettingsContainer>);
}

AgileBoardSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
  agileId: PropTypes.string.isRequired,
  agileName: PropTypes.string.isRequired,
  columnSettings: PropTypes.object,
}

export default AgileBoardSettings

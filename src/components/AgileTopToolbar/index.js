import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import Button from '@jetbrains/ring-ui/dist/button/button';
import AgileSprintSelect from '../AgileSprintSelect';
import PropTypes from 'prop-types';
import Settings16pxIcon from './icons/Settings16pxIcon';
import Backlog16pxIcon from './icons/Backlog16pxIcon';
import Chart16pxIcon from './icons/Chart16pxIcon';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import { useState } from 'react';

const AgileTopToolbarContainer = styled.div`
  margin: 0 calc(var(--ring-unit) * 4);
`;
const AgileTopToolbarDiv = styled.div`
  margin-top: calc(var(--ring-unit));
  padding: calc(2*var(--ring-unit)) 0 calc(var(--ring-unit));
  white-space: nowrap;
`;

const FloatRightButtonGroup = styled(ButtonGroup)`
  float: right;
`;

const FloatLeftDiv = styled.div`
  display: inline-block;
`;

const ToolbarButton = styled(Button)`
  padding: 0 16px;
  height: 24px;
`;

const MarginRightButtonGroup = styled(ButtonGroup)`
  margin-right: calc(var(--ring-unit) * 2);
`;

function AgileTopToolbar({agileId, sprint, sprintsDisabled, onSettingsButtonClick}) {
  const { t } = useTranslation();
  const [settingsButtonActive, setSettingsButtonActive] = useState(false);
  return (
    <AgileTopToolbarContainer data-testid="agile-top-toolbar">
        <AgileTopToolbarDiv className="agile-top-toolbar">
          <FloatRightButtonGroup>
            <ToolbarButton disabled icon={Chart16pxIcon} title={t('Chart')}/>
            <ToolbarButton icon={Settings16pxIcon} active={settingsButtonActive} title={t('Board settings')} onClick={() => {
              setSettingsButtonActive(!settingsButtonActive);
              onSettingsButtonClick();
            }}/>
          </FloatRightButtonGroup>
          <FloatLeftDiv>
            <MarginRightButtonGroup>
              <ToolbarButton disabled icon={Backlog16pxIcon} title={t('Backlog')}/>
            </MarginRightButtonGroup>
            { !sprintsDisabled && <AgileSprintSelect agileId={agileId} sprint={sprint}/> }
          </FloatLeftDiv>
        </AgileTopToolbarDiv>
    </AgileTopToolbarContainer>
  );
}

AgileTopToolbar.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  sprintsDisabled: PropTypes.bool,
  onSettingsButtonClick: PropTypes.func.isRequired,
};

export default AgileTopToolbar

import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import Button from '@jetbrains/ring-ui/dist/button/button';
import AgileSprintSelect from '../AgileSprintSelect';
import PropTypes from 'prop-types';
import Settings16pxIcon from './Settings16pxIcon';
import Backlog16pxIcon from './Backlog16pxIcon';
import Chart16pxIcon from './Chart16pxIcon';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';

const AgileTopToolbarContainer = styled.div`
  margin: 0 calc(var(--ring-unit) * 4);
`;
const AgileTopToolbarDiv = styled.div`
  margin-top: calc(var(--ring-unit));
  padding: calc(2*var(--ring-unit)) 0 calc(var(--ring-unit));
  white-space: nowrap;  
`;

const FloatRightButton = styled(Button)`
  float: right;
  padding: 0 16px;
  height: 24px;
`;

const FloatLeftDiv = styled.div`
  float: left;
`;

const MarginRightButton = styled(Button)`
  padding: 0 16px;
  height: 24px;
`;

const MarginRightButtonGroup = styled(ButtonGroup)`
  margin-right: calc(var(--ring-unit) * 2);
`;

function AgileTopToolbar({agileId, sprint, sprintsDisabled}) {
  const { t } = useTranslation();
  return (
    <AgileTopToolbarContainer>
      <AgileTopToolbarDiv className="agile-top-toolbar">
        <FloatLeftDiv>
          <MarginRightButtonGroup>
            <MarginRightButton icon={Backlog16pxIcon} title={t('Backlog')}/>
          </MarginRightButtonGroup>
          { !sprintsDisabled && <AgileSprintSelect agileId={agileId} sprint={sprint}/> }
        </FloatLeftDiv>
        <ButtonGroup>
          <FloatRightButton icon={Settings16pxIcon} title={t('Board settings')}/>
          <FloatRightButton icon={Chart16pxIcon} title={t('Chart')}/>
        </ButtonGroup>
      </AgileTopToolbarDiv>
    </AgileTopToolbarContainer>
  );
}

AgileTopToolbar.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprint: PropTypes.object,
  sprintsDisabled: PropTypes.bool,
};

export default AgileTopToolbar

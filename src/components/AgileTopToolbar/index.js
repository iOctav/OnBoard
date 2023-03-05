import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import Button from '@jetbrains/ring-ui/dist/button/button';
import treemapIcon from '@jetbrains/icons/treemap';
import settingsIcon from '@jetbrains/icons/settings';
import analyticsIcon from '@jetbrains/icons/analytics';

const AgileTopToolbarDiv = styled.div`
  margin: 0 calc(var(--ring-unit) * 4);
`;

const FloatRightButton = styled(Button)`
  float: right;
  border: 1px solid grey;
`;

const FloatLeftButton = styled(Button)`
  float: left;
`;

function AgileTopToolbar() {
  const { t } = useTranslation();
  return (
    <AgileTopToolbarDiv className="agile-top-toolbar">
      <FloatLeftButton icon={treemapIcon} title={t('Backlog')}/>
      <FloatRightButton icon={analyticsIcon} title={t('Chart')}/>
      <FloatRightButton icon={settingsIcon} title={t('Board settings')}/>
    </AgileTopToolbarDiv>
  );
}

export default AgileTopToolbar

import styled from 'styled-components';

import search12pxIcon from '@jetbrains/icons/search-12px';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import { Size, Input } from '@jetbrains/ring-ui/dist/input/input';
import Select from '@jetbrains/ring-ui/dist/select/select';

const AgileSearchPanelDiv = styled.div`
  margin-left: 32px;
  margin-right: 32px;
  width: 100%;
`;

const FloatButton = styled(Button)`
    float: left;
`;

const FloatSelect = styled(Select)`
    float: left;
`;

const FloatInput = styled(Input)`
  float: left;
`;

// TODO: Remove hardcoded agiles 
function AgileSearchQueryPanel() {
  const { t } = useTranslation();
  return (
    <AgileSearchPanelDiv className="agile-search-panel">
      <FloatSelect selected={{key: "131-0", label: "Demo Project Board"}}
              style={{float: 'left'}}
              type="INLINE" filter={true} data={[{key: "131-0", label: "Demo Project Board"}]}>
      </FloatSelect>
      <FloatInput placeholder={t('Filter cards on the board')} style={{float: 'left'}} size={Size.FULL}></FloatInput>
      <FloatButton icon={search12pxIcon} short title={t('Search issues')}></FloatButton>
    </AgileSearchPanelDiv>
  );
}

export default AgileSearchQueryPanel

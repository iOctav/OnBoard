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

const FloatSelect = styled(Select)`
  float: left;
`;

const OverflowDiv = styled.div`
  overflow: auto;
`;

// TODO: Remove hardcoded agiles and use rtk query to get them
function AgileSearchQueryPanel() {
  const { t } = useTranslation();
  return (
    <AgileSearchPanelDiv className="agile-search-panel">
      <FloatSelect selected={{key: "131-0", label: "Demo Project Board"}}
              type="INLINE" filter={true} data={[{key: "131-0", label: "Demo Project Board"}]}>
      </FloatSelect>
      <OverflowDiv>
        <Input placeholder={t('Filter cards on the board')} size={Size.AUTO}></Input>
        <Button icon={search12pxIcon} short title={t('Search issues')}></Button>
      </OverflowDiv>
    </AgileSearchPanelDiv>
  );
}

export default AgileSearchQueryPanel

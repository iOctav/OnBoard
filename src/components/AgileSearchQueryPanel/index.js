import styled from 'styled-components';

import search12pxIcon from '@jetbrains/icons/search-12px';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import { Size, Input } from '@jetbrains/ring-ui/dist/input/input';
import { useLazyGetAgilesQuery } from '../../store/youtrackApi';
import LazySelectBox from '../LazySelectBox';

const AgileSearchPanelDiv = styled.div`
  margin: 0 calc(var(--ring-unit) * 4);
`;

const FloatSelect = styled(LazySelectBox)`
  float: left;
`;

const OverflowDiv = styled.div`
  overflow: auto;
`;

const ReducedInput = styled(Input)`
  float: left;
  width: calc(100% - 32px);
`;

const FloatRightButton = styled(Button)`
  float: right;
`;

// TODO: Remove hardcoded agiles and use rtk query to get them
function AgileSearchQueryPanel() {
  const { t } = useTranslation();

  return (
    <AgileSearchPanelDiv className="agile-search-panel">
      <FloatSelect
              type="INLINE"
              selected={{label: 'Demo project', key: '131-2'}}
              lazyDataLoaderHook={useLazyGetAgilesQuery}
              dataMapper={(agile => ({label: agile.name, key: agile.id}))}>
      </FloatSelect>
      <OverflowDiv>
        <ReducedInput placeholder={t('Filter cards on the board')} size={Size.AUTO}></ReducedInput>
        <FloatRightButton icon={search12pxIcon} short title={t('Search issues')}></FloatRightButton>
      </OverflowDiv>
    </AgileSearchPanelDiv>
  );
}

export default AgileSearchQueryPanel

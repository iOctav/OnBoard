import styled from 'styled-components';

import search12pxIcon from '@jetbrains/icons/search-12px';
import starFilled from '@jetbrains/icons/star-filled.svg';
import starEmpty from '@jetbrains/icons/star-empty.svg';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import { Size, Input } from '@jetbrains/ring-ui/dist/input/input';
import { useLazyGetAgilesQuery } from '../../store/youtrackApi';
import LazySelectBox from '../LazySelectBox';
import { useNavigate } from 'react-router-dom';
import { currentAgileBoardUri } from '../../services/linkService';
import List from '@jetbrains/ring-ui/dist/list/list';

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
  const navigate = useNavigate();
  const switchAgileBoard = ({key}) => navigate(currentAgileBoardUri(key));
  const mapAgileDataItem = agile => ({label: agile.name, key: agile.id, description: agile.owner.fullName,
    icon: agile.favorite ? starFilled : starEmpty});

  return (
    <AgileSearchPanelDiv className="agile-search-panel">
      <FloatSelect
              type="BUTTON"
              buttonClassName="ob-agile-select-button"
              label="Agile boards"
              size={Size.AUTO}
              lazyDataLoaderHook={useLazyGetAgilesQuery}
              makeDataset={(data) => [...data.filter(item => item.favorite).map(mapAgileDataItem),
                { key: 'separator', rgItemType: List.ListProps.Type.SEPARATOR },
                ...data.filter(item => !item.favorite).map(mapAgileDataItem)]}
              onSelect={switchAgileBoard}>
      </FloatSelect>
      <OverflowDiv>
        <ReducedInput placeholder={t('Filter cards on the board')} size={Size.AUTO}></ReducedInput>
        <FloatRightButton icon={search12pxIcon} short title={t('Search issues')}></FloatRightButton>
      </OverflowDiv>
    </AgileSearchPanelDiv>
  );
}

export default AgileSearchQueryPanel

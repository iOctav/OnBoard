import styled from 'styled-components';

import starFilled from '@jetbrains/icons/star-filled.svg';
import starEmpty from '@jetbrains/icons/star-empty.svg';
import { useTranslation } from 'react-i18next';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import LazySelectBox from '../LazySelectBox';
import { useNavigate } from 'react-router-dom';
import { currentAgileBoardUri } from '../../services/linkService';
import List from '@jetbrains/ring-ui/dist/list/list';
import PropTypes from 'prop-types';
import { useLazyGetAgilesQuery, useLazyGetQueryAssistQuery } from '../../app/services/youtrackApi';
import QueryAssist from '@jetbrains/ring-ui/dist/query-assist/query-assist';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import { useStateParams } from '../../hooks/useStateParams';

const AgileSearchPanelDiv = styled.div`
  display: flex;
  margin: 0 calc(var(--ring-unit) * 4);
`;

const FloatSelect = styled(LazySelectBox)`
  float: left;
  button {
    padding-right: calc(var(--ring-unit)*3);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  };
`;

const SearchPanelInputContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const LeftSliceBorderQueryAssist = styled(QueryAssist)`
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

function AgileSearchQueryPanel({currentAgileId, currentAgileName}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useStateParams(undefined, 'query', (s) => s, (s) => s);
  const [getData] = useLazyGetQueryAssistQuery();
  const switchAgileBoard = ({key}) => navigate(currentAgileBoardUri(key));
  const mapAgileDataItem = agile => ({
    label: agile.name, key: agile.id, description: agile.owner?.fullName,
    icon: agile.favorite ? starFilled : starEmpty
  });

  const dataSource = (props) => {
    return getData(props).then(data => JSON.parse(JSON.stringify(data.data)));
  };

  return (
    <AgileSearchPanelDiv data-testid="agile-search-query-panel" className="agile-search-panel">
      <FloatSelect
        type="BUTTON"
        buttonClassName="ob-agile-select-button"
        selected={{ label: currentAgileName, key: currentAgileId }}
        size={Size.AUTO}
        height={ControlsHeight.L}
        lazyDataLoaderHook={useLazyGetAgilesQuery}
        makeDataset={(data) => [...data.filter(item => item.favorite).map(mapAgileDataItem),
          {key: 'separator', rgItemType: List.ListProps.Type.SEPARATOR},
          ...data.filter(item => !item.favorite).map(mapAgileDataItem)]}
        onSelect={switchAgileBoard}>
      </FloatSelect>
      <SearchPanelInputContainer>
        <LeftSliceBorderQueryAssist glass clear huge
                     query={query}
                     placeholder={t('Filter cards on the board')}
                     hint={t('Press ⇥ to complete first item')}
                     hintOnSelection={t('Press ↩ to complete selected item')}
                     dataSource={dataSource}
                     onApply={(queryChange) => setQuery(queryChange?.query ?? undefined)}
                     size={Size.AUTO}/>
      </SearchPanelInputContainer>
    </AgileSearchPanelDiv>
  );
}

AgileSearchQueryPanel.propTypes = {
  currentAgileId: PropTypes.string,
  currentAgileName: PropTypes.string,
}

export default AgileSearchQueryPanel

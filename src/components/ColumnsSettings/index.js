import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LazySelectBox from '../LazySelectBox';
import { useState } from 'react';
import {
  useLazyGetAvailableColumnFieldsQuery,
  useLazyGetColumnSettingsAvailableColumnFieldsQuery
} from '../../app/services/youtrackApi';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import ColumnsSettingsTable from './ColumnsSettingsTable';

const MarginedSelectBox = styled(LazySelectBox)`
  margin: 0 calc(var(--ring-unit));
`;

function ColumnsSettings({disabled, agileId, columnSettings}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState({key: columnSettings.field.id, label: columnSettings.field.name});
  const usedColumns = columnSettings.columns.reduce((acc, column) => [...acc, ...column.fieldValues], []).map(field => field.name);
  return (<div className="columns-settings">
    <span>
      <span><b>{t('Columns')}</b>{t(' are identified by')}</span>
      <MarginedSelectBox
        disabled={disabled}
        selected={selected}
        makeDataset={data => data.map(field => ({value: field.id, label: field.name, description: field.fieldType.presentation}))}
        lazyDataLoaderHook={useLazyGetAvailableColumnFieldsQuery}
        lazyDataLoaderHookParams={agileId}
        size={Size.AUTO}
        height={ControlsHeight.S}
        onSelect={setSelected}
        add={{label: t('New custom field'), alwaysVisible: true}}/>
    </span>
    <ColumnsSettingsTable disabled={disabled} columns={columnSettings.columns}/>
    <LazySelectBox
      disabled={disabled}
      type="INLINE"
      label={t('Add column')}
      lazyDataLoaderHook={useLazyGetColumnSettingsAvailableColumnFieldsQuery}
      lazyDataLoaderHookParams={agileId}
      makeDataset={data => data.filter(field => usedColumns.indexOf(field.name) < 0).map(field => ({value: field.id, label: field.presentation}))}
      add={{label: t('Create column'), alwaysVisible: true}}/>
  </div>);
}

ColumnsSettings.propTypes = {
  disabled: PropTypes.bool,
  agileId: PropTypes.string.isRequired,
  columnSettings: PropTypes.object,
};

export default ColumnsSettings;

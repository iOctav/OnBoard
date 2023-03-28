import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import closeIcon from '@jetbrains/icons/close-12px';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Input from '@jetbrains/ring-ui/dist/input/input';
import Select from '@jetbrains/ring-ui/dist/select/select';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import NameColumnTemplate from './NameColumnTemplate';

const VerticalAlignTable = styled(Table)`
  td {
    vertical-align: top;
    padding: 6px 8px;
  }
`;

function makeWIPInput(value, disabled) {
  if (value) {
    return (<Input disabled={disabled} height={ ControlsHeight.S } value={value.toString()} size={ Size.AUTO } placeholder="No"/>);
  } else {
    return (<Input disabled={disabled} height={ ControlsHeight.S } size={ Size.AUTO } placeholder="No"/>);
  }
}

function ColumnsSettingsTable({disabled, columns}) {
  const { t } = useTranslation();
  const tableColumns = [
    {key: 'name', id: 'name', getValue: (item, column) => (<NameColumnTemplate disabled={disabled} fieldValues={item.fieldValues}/>) },
    {key: 'min', id: 'min', title: t('Min'), getValue: (item, column) => makeWIPInput(item.wipLimit?.min, disabled)},
    {key: 'max', id: 'max', title: t('Max WIP'), getValue: (item, column) => makeWIPInput(item.wipLimit?.max, disabled)},
    {key: 'merge', id: 'merge', getValue: (item, column) => (<Select disabled={disabled} type="INLINE" filter label="Merge with"/>)},
    {key: 'remove', id: 'remove', getValue: (item, column) => (item.fieldValues.map(
      field =>
        (<div key={field.id}><Button disabled={disabled} icon={closeIcon} title={t('Remove')}/></div>)
      ))},
  ]
  const data = [...columns].sort((a, b) => a.ordinal - b.ordinal).map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (<VerticalAlignTable
    draggable={!disabled} alwaysShowDragHandle dragHandleTitle={t('Drag to reorder')}
    data={data}
    selectable={false}
    sortKey="ordinal"
    selection={selection} onSelect={() => {}}
    columns={tableColumns}>
  </VerticalAlignTable>);
}

ColumnsSettingsTable.propTypes = {
  disabled: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ColumnsSettingsTable;

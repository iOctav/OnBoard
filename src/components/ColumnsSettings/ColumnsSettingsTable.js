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
import { ControlsHeight } from '@jetbrains/ring-ui/components/global/controls-height';
import NameColumnTemplate from './NameColumnTemplate';

const VerticalAlignTable = styled(Table)`
  td {
    vertical-align: top;
    padding: 6px 8px;
  }
`;

function makeWIPInput(value) {
  if (value) {
    return (<Input height={ ControlsHeight.S } value={value.toString()} size={ Size.AUTO } placeholder="No"/>);
  } else {
    return (<Input height={ ControlsHeight.S } size={ Size.AUTO } placeholder="No"/>);
  }
}

function ColumnsSettingsTable({columns}) {
  const { t } = useTranslation();
  const tableColumns = [
    {key: 'name', id: 'name', getValue: (item, column) => (<NameColumnTemplate fieldValues={item.fieldValues}/>) },
    {key: 'min', id: 'min', title: t('Min'), getValue: (item, column) => makeWIPInput(item.wipLimit?.min)},
    {key: 'max', id: 'max', title: t('Max WIP'), getValue: (item, column) => makeWIPInput(item.wipLimit?.max)},
    {key: 'merge', id: 'merge', getValue: (item, column) => (<Select type="INLINE" filter label="Merge with"/>)},
    {key: 'remove', id: 'remove', getValue: (item, column) => (item.fieldValues.map(
      field =>
        (<div key={field.id}><Button icon={closeIcon} title={t('Remove')}/></div>)
      ))},
  ]
  const data = [...columns].sort((a, b) => a.ordinal - b.ordinal).map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (<VerticalAlignTable
    draggable alwaysShowDragHandle dragHandleTitle={t('Drag to reorder')}
    data={data}
    selectable={false}
    sortKey="ordinal"
    selection={selection} onSelect={() => {}}
    columns={tableColumns}>
  </VerticalAlignTable>);
}

ColumnsSettingsTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ColumnsSettingsTable;

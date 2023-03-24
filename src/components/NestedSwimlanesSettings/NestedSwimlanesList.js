import { useTranslation } from 'react-i18next';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import pencilIcon from '@jetbrains/icons/pencil';
import closeIcon from '@jetbrains/icons/close-12px';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import { addNestedSwimlane, selectSwimlanesMetadata } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import { useDispatch, useSelector } from 'react-redux';

function NestedSwimlanesList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const swimlanes = useSelector(selectSwimlanesMetadata);
  console.log(swimlanes);
  const tableColumns = [
    {key: 'type', id: 'type', title: t('Identifier')},
    {key: 'field', id: 'field', title: t('Field'), getValue: (item, column) => (<span>{item.field.presentation}</span>)},
    {key: 'values', id: 'values', title: t('Values'), getValue: (item, column) => (<span>{item.values?.length > 0 ? 'Have': 'None'}</span>)},
    {key: 'remove', id: 'remove', getValue: (item, column) => (<Button icon={closeIcon} title={t('Remove')}/>)},
  ];
  const data = swimlanes.map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (<div>
    <Table draggable alwaysShowDragHandle
           metaColumnStyle={{display: 'none'}}
           data={swimlanes}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns}/>
    <Button text onClick={() => dispatch(addNestedSwimlane({order: swimlanes.length}))}>Add swimlane</Button>
  </div>);
}

NestedSwimlanesList.propTypes = {
}

export default NestedSwimlanesList;
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import closeIcon from '@jetbrains/icons/close-12px';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import {
  createNestedSwimlane, removeNestedSwimlane,
  selectSwimlanesMetadata,
  updateNestedSwimlane
} from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import { useLazyGetIssuesFilterFieldsQuery, useLazyGetValuesFilterFieldsQuery } from '../../app/services/youtrackApi';
import LazySelectBox from '../LazySelectBox';
import { Size } from '@jetbrains/ring-ui/dist/input/input';

function NestedSwimlanesList({projectShortNames}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const swimlanes = useSelector(selectSwimlanesMetadata);
  console.log(swimlanes);
  const tableColumns = [
    {key: 'type', id: 'type', title: t('Identifier'), getValue: (item) => (
      <ButtonGroup>
        <Button active={item.type === SwimlaneType.Values} height={ControlsHeight.S}
                onClick={() => dispatch(updateNestedSwimlane({id: item.id, changes: { type: SwimlaneType.Values }}))}>{t('Values')}
        </Button>
        <Button active={item.type === SwimlaneType.Issues} height={ControlsHeight.S}
                onClick={() => dispatch(updateNestedSwimlane({id: item.id, changes: { type: SwimlaneType.Issues }}))}>{t('Issues')}
        </Button>
      </ButtonGroup>
      )},
    {key: 'field', id: 'field', title: t('Field'), getValue: (item) => (item.type === SwimlaneType.Values || item.type === SwimlaneType.Issues) &&
        (<LazySelectBox
          selected={{label: item.field?.presentation, key: item.field?.id}}
          makeDataset={data => data.map(field => ({value: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable}))}
          lazyDataLoaderHook={item.type === SwimlaneType.Values ? useLazyGetValuesFilterFieldsQuery : useLazyGetIssuesFilterFieldsQuery}
          lazyDataLoaderHookParams={projectShortNames}
          size={Size.M}
          height={ControlsHeight.S}
          onSelect={(field) => dispatch(updateNestedSwimlane({id: item.id, changes: { field: {id: field.value, presentation: field.label, aggregateable: field.aggregateable}}}))}/>)
      },
    {key: 'values', id: 'values', title: t('Values'), getValue: (item) => (<span>{item.values?.length > 0 ? 'Have': 'None'}</span>)},
    {key: 'remove', id: 'remove', getValue: (item) => (<Button icon={closeIcon} onClick={() => dispatch(removeNestedSwimlane(item.id))} title={t('Remove')}/>)},
  ];
  const data = swimlanes.map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (<div>
    <Table draggable alwaysShowDragHandle sortKey="order"
           metaColumnStyle={{display: 'none'}}
           data={swimlanes}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns}/>
    <Button text onClick={() => dispatch(createNestedSwimlane({order: swimlanes.length}))}>Add swimlane</Button>
  </div>);
}

NestedSwimlanesList.propTypes = {
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NestedSwimlanesList;
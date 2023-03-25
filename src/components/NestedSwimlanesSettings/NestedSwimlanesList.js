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
import SwimlaneValuesTagBox from './SwimlaneValuesTagBox';
import { selectCustomFieldIds } from '../../features/customFields/customFieldsSlice';

function NestedSwimlanesList({projectShortNames}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const swimlanes = useSelector(selectSwimlanesMetadata);
  const availableFields = useSelector(selectCustomFieldIds);

  const tableColumns = [
    {key: 'type', id: 'type', title: t('Identifier'), getValue: (item) => (
      <ButtonGroup>
        <Button active={item.type === SwimlaneType.Values} height={ControlsHeight.S}
                onClick={() => item.type !== SwimlaneType.Values &&
                  dispatch(updateNestedSwimlane({id: item.id, changes: { type: SwimlaneType.Values, values: [] }}))}>{t('Values')}
        </Button>
        <Button active={item.type === SwimlaneType.Issues} height={ControlsHeight.S} disabled
                onClick={() => item.type !== SwimlaneType.Issues &&
                  dispatch(updateNestedSwimlane({id: item.id, changes: { type: SwimlaneType.Issues, values: [] }}))}>{t('Issues')}
        </Button>
      </ButtonGroup>
      )},
    {key: 'field', id: 'field', title: t('Field'), getValue: (item) => (item.type === SwimlaneType.Values || item.type === SwimlaneType.Issues) &&
        (<LazySelectBox
          selected={{label: item.field?.presentation, key: item.field?.id}}
          makeDataset={data => data.filter(field => availableFields.includes(field.id)).map(field => ({value: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable}))}
          lazyDataLoaderHook={item.type === SwimlaneType.Values ? useLazyGetValuesFilterFieldsQuery : useLazyGetIssuesFilterFieldsQuery}
          lazyDataLoaderHookParams={projectShortNames}
          size={Size.M}
          height={ControlsHeight.S}
          onSelect={field => field.value !== item.field?.id &&
            dispatch(updateNestedSwimlane({id: item.id, changes:
                { field:
                    { id: field.value, presentation: field.label, aggregateable: field.aggregateable, name: field.label },
                  values: []
                }}
            ))}
        />)
      },
    {key: 'values', id: 'values', title: t('Values'), getValue: (item) => (item.field?.id && <SwimlaneValuesTagBox swimlane={item}/>)},
    {key: 'remove', id: 'remove', getValue: (item) => (item.id === swimlanes.length - 1 &&
        <Button icon={closeIcon} onClick={() => dispatch(removeNestedSwimlane(item.id))} title={t('Remove')}/>)},
  ];
  const data = swimlanes.map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (<div>
    <Table draggable alwaysShowDragHandle sortKey="id"
           metaColumnStyle={{display: 'none'}}
           data={swimlanes}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns} />
    <Button text onClick={() => dispatch(createNestedSwimlane({id: swimlanes.length}))}>Add swimlane</Button>
  </div>);
}

NestedSwimlanesList.propTypes = {
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NestedSwimlanesList;
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import closeIcon from '@jetbrains/icons/close-12px';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import {
  createNestedSwimlane, removeNestedSwimlane,
  selectSwimlanesMetadataEntities,
  updateNestedSwimlane, useUpdateGeneralSwimlaneSettingsMutation
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

const BorderedSpan = styled.span`
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 20px;
  padding: 0 8px;
  cursor: default;
  vertical-align: baseline;
  color: var(--ring-text-color);
  border: 1px var(--ring-line-color) solid;
  border-radius: var(--ring-border-radius);
  background-color: var(--ring-added-background-color);
  font-size: var(--ring-font-size-smaller);
  font-weight: normal;
  font-style: normal;
  line-height: 17px;
  margin-left: 5px;
`;

function NestedSwimlanesList({agileId, projectShortNames}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const swimlanes = useSelector(selectSwimlanesMetadataEntities);
  const availableFields = useSelector(selectCustomFieldIds);
  const [updateGeneralSwimlane] = useUpdateGeneralSwimlaneSettingsMutation();

  const swapSwimlanes = (index1, index2) => {
    const order1 = swimlanes[index1].order;
    if (order1 === 0 || swimlanes[index2].order === 0) {
      return;
    }

    dispatch(updateNestedSwimlane({id: index1, changes: { order: swimlanes[index2].order }}));
    dispatch(updateNestedSwimlane({id: index2, changes: { order: order1 }}));
  };

  const tableColumns = [
    {key: 'type', id: 'type', title: t('Identifier'), getValue: (item) => (
      <>
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
        {item.order === 0 && (<BorderedSpan><span>{t('General')}</span></BorderedSpan>)}
       </>
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
    {key: 'remove', id: 'remove', getValue: (item) => (item.order === Object.keys(swimlanes).length - 1 &&
        <Button icon={closeIcon} onClick={() => dispatch(removeNestedSwimlane(item.id))} title={t('Remove')}/>)},
  ];
  const data = Object.keys(swimlanes).map(key => ({...swimlanes[key], key: key}))
    .sort((a, b) => a.order - b.order);
  const selection = new Selection({data: data});
  return (<div>
    <Table draggable alwaysShowDragHandle sortOrder sortKey="order"
           onReorder={(reorder) => swapSwimlanes(reorder.oldIndex, reorder.newIndex)}
           metaColumnStyle={{display: 'none'}}
           data={data}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns} />
    <Button text onClick={() => dispatch(createNestedSwimlane({id: Object.keys(swimlanes).length, order: Object.keys(swimlanes).length}))}>Add swimlane</Button>
  </div>);
}

NestedSwimlanesList.propTypes = {
  agileId: PropTypes.string.isRequired,
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NestedSwimlanesList;
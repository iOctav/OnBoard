import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
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
import SwimlaneValuesTagBox from './SwimlaneValuesTagBox';
import Checkbox from '@jetbrains/ring-ui/dist/checkbox/checkbox';
import SwimlaneFieldSelect from './SwimlaneFieldSelect';

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

const LevelMarker = styled.span`
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 20px;
  padding: 0 8px;
  cursor: default;
  vertical-align: baseline;
  color: var(--ring-secondary-color);
  border: 1px var(--ring-line-color) solid;
  border-radius: var(--ring-border-radius);
  background-color: var(--ring-content-background-color);
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
  const [updateGeneralSwimlane] = useUpdateGeneralSwimlaneSettingsMutation();

  const swapSwimlanes = (id1, id2) => {
    const order1 = swimlanes[id1].order;
    if (order1 === 0 || swimlanes[id2].order === 0) {
      return;
    }
    dispatch(updateNestedSwimlane({id: id1, changes: { order: swimlanes[id2].order }}));
    dispatch(updateNestedSwimlane({id: id2, changes: { order: order1 }}));
  };

  const tableColumns = [
    {key: 'type', id: 'type', title: t('Identifier'), getValue: (item) => (
      <>
        <ButtonGroup>
          <Button active={item.type === SwimlaneType.Values} height={ControlsHeight.S} disabled={item.order === 0}
                  onClick={() => item.type !== SwimlaneType.Values &&
                    dispatch(updateNestedSwimlane({id: item.id, changes: { type: SwimlaneType.Values, field: {}, values: [] }}))}>{t('Values')}
          </Button>
          <Button active={item.type === SwimlaneType.Issues} height={ControlsHeight.S} disabled={item.order === 0}
                  onClick={() => item.type !== SwimlaneType.Issues &&
                    dispatch(updateNestedSwimlane({id: item.id, changes: { type: SwimlaneType.Issues, field: {}, values: [] }}))}>{t('Issues')}
          </Button>
        </ButtonGroup>
        {item.order > 0 ? (<LevelMarker>L{item.order}</LevelMarker>) : (<BorderedSpan><span>{t('General')}</span></BorderedSpan>)}

       </>
      )},
    {key: 'field', id: 'field', title: t('Field'), getValue: (item) =>
        (item.type === SwimlaneType.Values || item.type === SwimlaneType.Issues) &&
        (<SwimlaneFieldSelect projectShortNames={projectShortNames} swimlaneId={item.key}/>)},
    {key: 'values', id: 'values', title: t('Values'), getValue: (item) =>
        (item.field?.id && <SwimlaneValuesTagBox swimlane={item}/>)},
    {key: 'enableColor', id: 'enableColor', title: t('Enable background color'), getValue: (item) =>
        (<Checkbox disabled={item.order === 0} checked={item.enableColor}
          onChange={(event) => dispatch(updateNestedSwimlane({id: item.id, changes: { enableColor: event.target.checked}}))} />)},
    {key: 'hideOrphan', id: 'hideOrphan', title: t('Show swimlane for uncategorized cards'), getValue: (item) =>
        (<Checkbox disabled={item.order === 0} checked={!item.hideOrphansSwimlane}
          onChange={(event) => dispatch(updateNestedSwimlane({id: item.id, changes: { hideOrphansSwimlane: !event.target.checked}}))} />)},
  ];
  const data = Object.keys(swimlanes).map(key => ({...swimlanes[key], key: key}))
    .sort((a, b) => a.order - b.order);
  const selection = new Selection({data: data});
  return (<div>
    <Table draggable alwaysShowDragHandle sortOrder sortKey="order"
           onReorder={(reorder) => swapSwimlanes(data[reorder.oldIndex].id, data[reorder.newIndex].id)}
           metaColumnStyle={{display: 'none'}}
           data={data}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns} />
    <Button text onClick={() => dispatch(createNestedSwimlane({order: data[data.length - 1].order + 1}))}>Add swimlane</Button>
    <Button disabled={data.length < 2} text onClick={() => dispatch(removeNestedSwimlane(data[data.length-1].id))}>Remove last</Button>
  </div>);
}

NestedSwimlanesList.propTypes = {
  agileId: PropTypes.string.isRequired,
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NestedSwimlanesList;
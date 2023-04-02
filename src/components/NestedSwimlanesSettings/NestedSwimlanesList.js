import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import SwimlaneValuesTagBox from './SwimlaneValuesTagBox';
import Checkbox from '@jetbrains/ring-ui/dist/checkbox/checkbox';
import SwimlaneFieldSelect from './SwimlaneFieldSelect';
import { useStateParams } from '../../hooks/useStateParams';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

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

function NestedSwimlanesList({projectShortNames, systemSwimlane}) {
  const { t } = useTranslation();
  const [swimlanes, setSwimlanes] = useStateParams({}, 'nested-swimlanes', (s) => JSON.stringify(s), (s) => JSON.parse(s));

  const swapSwimlanes = (id1, id2) => {
    const order1 = swimlanes[id1].order;
    if ((order1 === 0 && id1 === systemSwimlane?.id) || (swimlanes[id2].order === 0 && id2 === systemSwimlane?.id)) {
      return;
    }
    setSwimlanes(update(swimlanes, { [id1]: { $merge: { order: swimlanes[id2].order }}, [id2]: { $merge: { order: order1 }}}));
  };

  const createSwimlane = (order) => {
    const id = uuidv4();
    const emptySwimlane = {
      id: id,
      order: order,
      type: SwimlaneType.None,
      system: false,
      field: {},
      values: [],
      hideOrphansSwimlane: false,
      enableColor: false,
      dateType: undefined,
    };
    setSwimlanes(update(swimlanes, {[id]: {$set: emptySwimlane }}));
  };

  const updateSwimlane = (id, properties) => {
    setSwimlanes(update(swimlanes, { [id]: { $merge: properties }}))
  }

  const changeSwimlaneType = (id, type) => {
    updateSwimlane(id, { type: type, field: {}, values: [] });
  }

  const removeSwimlane = (id) => {
    setSwimlanes(update(swimlanes, {$unset: [id]}));
  }

  const tableColumns = [
    {key: 'type', id: 'type', title: t('Identifier'), getValue: (item) => (
      <>
        <ButtonGroup>
          <Button active={item.type === SwimlaneType.Values} height={ControlsHeight.S} disabled={item.system}
                  onClick={() => item.type !== SwimlaneType.Values && changeSwimlaneType(item.id, SwimlaneType.Values)}>{t('Values')}
          </Button>
          <Button active={item.type === SwimlaneType.Issues} height={ControlsHeight.S} disabled={item.system}
                  onClick={() => item.type !== SwimlaneType.Issues && changeSwimlaneType(item.id, SwimlaneType.Issues)}>{t('Issues')}
          </Button>
        </ButtonGroup>
        {!item.system ? (<LevelMarker>L{item.order}</LevelMarker>) : (<BorderedSpan><span>{t('System')}</span></BorderedSpan>)}

       </>
      )},
    {key: 'field', id: 'field', title: t('Field'), getValue: (item) =>
        (item.type === SwimlaneType.Values || item.type === SwimlaneType.Issues) &&
        (<SwimlaneFieldSelect projectShortNames={projectShortNames} swimlane={item} onChange={(properties) => updateSwimlane(item.id, properties)}/>)},
    {key: 'values', id: 'values', title: t('Values'), getValue: (item) =>
        (item.field?.id && <SwimlaneValuesTagBox swimlane={item} onChange={(properties => updateSwimlane(item.id, properties))}/>)},
    {key: 'enableColor', id: 'enableColor', title: t('Enable background color'), getValue: (item) =>
        (<Checkbox checked={item.enableColor} disabled={item.system}
          onChange={(event) => updateSwimlane(item.id, {enableColor: event.target.checked})} />)},
    {key: 'hideOrphan', id: 'hideOrphan', title: t('Show swimlane for uncategorized cards'), getValue: (item) =>
        (<Checkbox checked={!item.hideOrphansSwimlane} disabled={item.system}
          onChange={(event) => updateSwimlane(item.id, {hideOrphansSwimlane: !event.target.checked})} />)},
  ];
  const data = Object.keys(swimlanes).map(key => ({...swimlanes[key], key: key}))
    .sort((a, b) => a.order - b.order);
  (systemSwimlane?.id && data.unshift(systemSwimlane));
  const selection = new Selection({data: data});
  return (<div>
    <Table draggable alwaysShowDragHandle sortOrder sortKey="order"
           onReorder={(reorder) => swapSwimlanes(data[reorder.oldIndex].id, data[reorder.newIndex].id)}
           metaColumnStyle={{display: 'none'}}
           data={data}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns} />
    <Button text onClick={() => createSwimlane(data.length > 0 ? data[data.length - 1].order + 1 : 1)}>Add swimlane</Button>
    <Button disabled={data.length < 1 || (data.length === 1 && systemSwimlane?.id)} text onClick={() => removeSwimlane(data[data.length-1].id)}>Remove last</Button>
  </div>);
}

NestedSwimlanesList.propTypes = {
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  systemSwimlane: PropTypes.object,
}

export default NestedSwimlanesList;
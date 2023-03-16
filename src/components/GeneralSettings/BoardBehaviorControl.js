import PropTypes from 'prop-types';
import Radio from '@jetbrains/ring-ui/dist/radio/radio';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import Input from '@jetbrains/ring-ui/dist/input/input';
import Checkbox from '@jetbrains/ring-ui/dist/checkbox/checkbox';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetIssuesFilterFieldsQuery, useLazyGetSprintsForAgileQuery } from '../../store/youtrackApi';
import UnderControlDescription from './UnderControlDescription';

function BoardBehaviorControl({sprintsEnabled, addNewIssueToKanban, isExplicit, explicitQuery,
                                hideSubtasksOfCards, defaultSprint, agileId, projectShortNames,
                                sprintSyncField}) {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState(!sprintsEnabled
    ? (!isExplicit ? 'explicit' : addNewIssueToKanban ? 'auto' : 'manual')
    : (sprintSyncField ? 'sprint-explicit' : defaultSprint ? 'sprint-auto' : 'manual'));
  const [showSubtasksOfCardsData, setShowSubtasksOfCardsData] = useState(!hideSubtasksOfCards);
  const [filterQuery, setFilterQuery] = useState(explicitQuery);
  const [syncField, setSyncField] = useState({key: sprintSyncField?.id, label: sprintSyncField?.name});
  const [sprint, setSprint] = useState({key: defaultSprint?.id, label: defaultSprint?.name});
  const explicitValue = radioValue === 'explicit' || radioValue === 'sprint-explicit';
  return (
    <div>
      <Radio value={radioValue} onChange={setRadioValue}>
        <Radio.Item value="manual">{t('Manually assign issues')}</Radio.Item>
        {!sprintsEnabled && <Radio.Item value="auto">{t('Automatically add new issues')}</Radio.Item>}
        {!sprintsEnabled && <Radio.Item value="explicit">{t('Filter cards to match a query')}</Radio.Item>}
        {sprintsEnabled && <Radio.Item value="sprint-auto">{t('Automatically add new issues to ')}
          <LazySelectBox type="INLINE" filter={true} disabled={radioValue !== 'sprint-auto'}
                         label={t('select sprint')} selected={radioValue !== 'sprint-auto' ? undefined : sprint} onSelect={setSprint}
                         lazyDataLoaderHook={useLazyGetSprintsForAgileQuery} lazyDataLoaderHookParams={agileId}
                         makeDataset={data => data.map(sprint => ({key: sprint.id, label: sprint.name}))}
                         add={{label: t('Add new sprint'), alwaysVisible: true}}/>
        </Radio.Item>}
        {sprintsEnabled && <Radio.Item value="sprint-explicit">{t('Link sprints to values for ')}
          <LazySelectBox type="INLINE" filter={true} disabled={radioValue !== 'sprint-explicit'}
            label={t('select custom field')} selected={radioValue !== 'sprint-explicit' ? undefined : syncField} onSelect={setSyncField}
            lazyDataLoaderHook={useLazyGetIssuesFilterFieldsQuery}
            lazyDataLoaderHookParams={projectShortNames}
            makeDataset={data => data.map(field => ({value: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable}))}/>
        </Radio.Item>}
      </Radio>
      <Input height={ControlsHeight.S} size={Size.L} disabled={radioValue !== 'explicit'}
             value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)}
             placeholder={t('Enter a search query to filter the cards on the board')}/>
      {sprintsEnabled && <UnderControlDescription>{t('To enter a query, enable the ')}<b>{t('Link sprints to values')}</b>{t(' option')}</UnderControlDescription>}
      <Checkbox label={t('Ignore subtasks of existing cards')} disabled={!explicitValue}
                checked={explicitValue && !showSubtasksOfCardsData}
                onChange={(event) => setShowSubtasksOfCardsData(!event.target.checked)}/>
    </div>
  );
}

BoardBehaviorControl.propTypes = {
  sprintsEnabled: PropTypes.bool.isRequired,
  addNewIssueToKanban: PropTypes.bool.isRequired,
  isExplicit: PropTypes.bool.isRequired,
  explicitQuery: PropTypes.string,
  hideSubtasksOfCards: PropTypes.bool.isRequired,
  defaultSprint: PropTypes.object,
  agileId: PropTypes.string,
  projectShortNames: PropTypes.arrayOf(PropTypes.string),
  sprintSyncField: PropTypes.object,
};

export default BoardBehaviorControl;

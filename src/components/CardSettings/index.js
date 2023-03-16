import styled from 'styled-components';

import PropTypes from 'prop-types';
import SettingsControl from '../SettingsControl';
import { useTranslation } from 'react-i18next';
import Checkbox from '@jetbrains/ring-ui/dist/checkbox/checkbox';
import { useState } from 'react';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetColorSchemeFilterFieldsQuery, useLazyGetEstimationFilterFieldsQuery } from '../../store/youtrackApi';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import ProjectColorTable from './ProjectColorTable';
import CustomFieldsTable from './CustomFieldsTable';

const CheckBoxContainer = styled.div`
  position: relative;
  margin: calc(var(--ring-unit) * 3) 0 16px;
`;

function CardSettings({cardSettings, colorCoding, estimationField, originalEstimationField, colorizeCustomFields, cardOnSeveralSprints, projects}) {
  const { t } = useTranslation();
  const [colorizeCustomFieldsValue, setColorizeCustomFieldsValue] = useState(colorizeCustomFields);
  const [cardOnSeveralSprintsValue, setCardOnSeveralSprintsValue] = useState(cardOnSeveralSprints);
  const projectShortNames = projects.map(project => project.shortName);
  const noEstimationField = { label: t('No current estimation field'), key: 'no-estimation' };
  const noColorItem = { label: t('No color scheme'), key: 'no-color' };
  const projectColorItem = { label: t('Project'), key: 'project-colors' };
  const [colorScheme, setColorScheme] = useState(colorCoding
    ? colorCoding.projectColors ? projectColorItem : { key: colorCoding.id, label: colorCoding.prototype?.name }
    : noColorItem);
  const [estimationFieldItem, setEstimationFieldItem] = useState(
    estimationField ? { key: estimationField.id, label: estimationField.name } : noEstimationField);
  const [originalEstimationFieldItem, setOriginalEstimationFieldItem] = useState(
    originalEstimationField ? { key: originalEstimationField.id, label: originalEstimationField.name } : noEstimationField);
  // const []
  return (<div>
    <SettingsControl label={t('Current estimation field')}>
      <LazySelectBox selected={estimationFieldItem}
                     lazyDataLoaderHook={useLazyGetEstimationFilterFieldsQuery}
                     lazyDataLoaderHookParams={projectShortNames}
                     makeDataset={data => [noEstimationField, ...(data.map(field => ({key: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable})))]}
                     size={Size.M}
                     height={ControlsHeight.S}
                     onSelect={item => {
                       originalEstimationFieldItem.key === item.key && setOriginalEstimationFieldItem(noEstimationField);
                       setEstimationFieldItem(item);
                     }}
                     add={{label: t('New custom field'), alwaysVisible: true}}/>
    </SettingsControl>
    {estimationFieldItem?.key !== noEstimationField.key &&
      <SettingsControl label={t('Original estimation field')}>
        <LazySelectBox selected={originalEstimationFieldItem}
                       lazyDataLoaderHook={useLazyGetEstimationFilterFieldsQuery}
                       lazyDataLoaderHookParams={projectShortNames}
                       makeDataset={data => [noEstimationField, ...(data.filter(field => field.id !== estimationFieldItem.key).map(field => ({key: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable})))]}
                       size={Size.M}
                       height={ControlsHeight.S}
                       onSelect={setOriginalEstimationFieldItem}
                       add={{label: t('New custom field'), alwaysVisible: true}}/>
      </SettingsControl>}
    <SettingsControl label={t('Color scheme')}>
      <LazySelectBox selected={colorScheme}
                     lazyDataLoaderHook={useLazyGetColorSchemeFilterFieldsQuery}
                     lazyDataLoaderHookParams={projectShortNames}
                     makeDataset={data => [noColorItem, projectColorItem, ...(data.map(field => ({key: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable})))]}
                     size={Size.M}
                     height={ControlsHeight.S}
                     onSelect={setColorScheme}/>
    </SettingsControl>
    <SettingsControl label={t('Custom fields')}/>
    <CustomFieldsTable fields={cardSettings.fields} projects={projects}/>
    <CheckBoxContainer>
      <Checkbox label={t('Show colors for other custom fields')}
                checked={colorizeCustomFieldsValue}
                onChange={(event) => setColorizeCustomFieldsValue(!event.target.checked)}/>
    </CheckBoxContainer>
    <CheckBoxContainer>
      <Checkbox label={t('Allow cards to be assigned to multiple sprints')}
                checked={cardOnSeveralSprintsValue}
                onChange={(event) => setCardOnSeveralSprintsValue(!event.target.checked)}/>
    </CheckBoxContainer>
    { colorScheme.key === projectColorItem.key &&
      <ProjectColorTable projectColors={colorCoding.projectColors}></ProjectColorTable>
    }
  </div>);
}

CardSettings.propTypes = {
  cardSettings: PropTypes.object.isRequired,
  colorizeCustomFields: PropTypes.bool.isRequired,
  cardOnSeveralSprints: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  estimationField: PropTypes.object,
  originalEstimationField: PropTypes.object,
  colorCoding: PropTypes.object,
};

export default CardSettings;

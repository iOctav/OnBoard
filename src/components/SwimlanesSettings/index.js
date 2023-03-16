import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import { useState } from 'react';
import { SwimlaneType } from './swimlane-type';
import { useLazyGetValuesFilterFieldsQuery, useLazyGetIssuesFilterFieldsQuery } from '../../store/youtrackApi';
import LazySelectBox from '../LazySelectBox';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import Checkbox from '@jetbrains/ring-ui/dist/checkbox/checkbox';
import Select from '@jetbrains/ring-ui/dist/select/select';
import SwimlaneAttributesList from './SwimlaneAttributesList';

const SettingsLabel = styled.span`
  padding-right: 0;
  padding-left: 0;
  display: inline-block;
  margin-right: calc(var(--ring-unit));
  font-size: var(--ring-font-size);
`;

const MarginedSelectBox = styled(LazySelectBox)`
  margin: 0 calc(var(--ring-unit));
`;

const MarginedCheckboxContainer = styled.div`
  margin-top: calc(var(--ring-unit) * 3);
`;

function calculateSwimlaneType(swimlaneSettings) {
  if (swimlaneSettings.enabled) {
    if (swimlaneSettings.$type === 'AttributeBasedSwimlaneSettings') {
      return SwimlaneType.Values;
    }
    if (swimlaneSettings.$type === 'IssueBasedSwimlaneSettings') {
      return SwimlaneType.Issues;
    }
  }
  return SwimlaneType.None;
}

function SwimlanesSettings({agileId, swimlaneSettings, projectShortNames, hideOrphansSwimlane, orphansAtTheTop}) {
  const { t } = useTranslation();
  const [selectedField, setSelectedField] = useState({label: swimlaneSettings.field?.presentation, key: swimlaneSettings.field?.id});
  const [swimlaneType, setSwimlaneType] = useState(calculateSwimlaneType(swimlaneSettings));
  const [showOrphan, setShowOrphan] = useState(!hideOrphansSwimlane);
  const swimlanePositionValue = { label: t('at the top of the board'), key: 'at-top' }
  return (<div className="columns-settings">
    <span>
      <SettingsLabel><b>{t('Swimlanes')}</b>{t(' are identified by')}</SettingsLabel>
      <ButtonGroup>
        <Button active={swimlaneType === SwimlaneType.None} height={ControlsHeight.S}
                onClick={() => setSwimlaneType(SwimlaneType.None)}>{t('No swimlanes')}
        </Button>
        <Button active={swimlaneType === SwimlaneType.Values} height={ControlsHeight.S}
                onClick={() => setSwimlaneType(SwimlaneType.Values)}>{t('Values')}
        </Button>
        <Button active={swimlaneType === SwimlaneType.Issues} height={ControlsHeight.S}
                onClick={() => setSwimlaneType(SwimlaneType.Issues)}>{t('Issues')}
        </Button>
      </ButtonGroup>
      {
        swimlaneType !== SwimlaneType.None &&
        (<span>
          <span>{t(' from field ')}</span>
          {
            swimlaneType === SwimlaneType.Values &&
            <MarginedSelectBox
              selected={selectedField}
              makeDataset={data => data.map(field => ({value: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable}))}
              lazyDataLoaderHook={useLazyGetValuesFilterFieldsQuery}
              lazyDataLoaderHookParams={projectShortNames}
              size={Size.M}
              height={ControlsHeight.S}
              onSelect={setSelectedField}/>
          }

          {
            swimlaneType === SwimlaneType.Issues &&
            <MarginedSelectBox
              selected={selectedField}
              makeDataset={data => data.map(field => ({value: field.id, label: field.name, description: field.customField?.fieldType?.presentation, aggregateable: field.aggregateable}))}
              lazyDataLoaderHook={useLazyGetIssuesFilterFieldsQuery}
              lazyDataLoaderHookParams={projectShortNames}
              size={Size.M}
              height={ControlsHeight.S}
              onSelect={setSelectedField}/>
          }
        </span>)
      }
    </span>
    { !selectedField.aggregateable && (swimlaneType !== SwimlaneType.None) && (<SwimlaneAttributesList agileId={agileId} fieldValues={swimlaneSettings.values}/>)}
    <MarginedCheckboxContainer>
      <Checkbox checked={showOrphan} label={t('Show swimlane for uncategorized cards')} onChange={(event) => setShowOrphan(event.target.checked)}/>
      { showOrphan
        ? (<Select type="INLINE" data={[swimlanePositionValue]} selected={orphansAtTheTop && swimlanePositionValue}></Select>)
        : <span>{t('at the top of the board ')}</span>
      }
    </MarginedCheckboxContainer>
  </div>);
}

SwimlanesSettings.propTypes = {
  agileId: PropTypes.string.isRequired,
  swimlaneSettings: PropTypes.object.isRequired,
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideOrphansSwimlane: PropTypes.bool.isRequired,
  orphansAtTheTop: PropTypes.bool.isRequired,
};

export default SwimlanesSettings;

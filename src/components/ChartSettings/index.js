import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useState } from 'react';
import { FilterType } from './filter-type';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import SettingsControl from '../SettingsControl';

function ChartSettings({disabled, reportSettings}) {
  const { t } = useTranslation();
  const [ doNotUseBurndown, setDoNotUseBurndown ] = useState(reportSettings.doNotUseBurndown);
  const [ filterType, setFilterType ] = useState(reportSettings.filterType.id);
  const [ subQuery, setSubQuery ] = useState(reportSettings.subQuery);
  return (<div>
    <SettingsControl label={t('Type')}>
      <ButtonGroup>
        <Button disabled={disabled} active={!doNotUseBurndown} height={ControlsHeight.S} onClick={() => setDoNotUseBurndown(false)}>
          {t('Burndown')}
        </Button>
        <Button disabled={disabled} active={doNotUseBurndown} height={ControlsHeight.S} onClick={() => setDoNotUseBurndown(true)}>
          {t('Cumulative flow')}
        </Button>
      </ButtonGroup>
    </SettingsControl>
    <SettingsControl label={t('Issue filter')}>
      <ButtonGroup>
        <Button disabled={disabled}
                active={filterType === FilterType.ALL_TASKS}
                height={ControlsHeight.S}
                onClick={() => setFilterType(FilterType.ALL_TASKS)}>
          {t('All cards')}
        </Button>
        <Button disabled={disabled}
                active={filterType === FilterType.QUERY}
                height={ControlsHeight.S}
                onClick={() => setFilterType(FilterType.QUERY)}>
          {t('Custom')}
        </Button>
      </ButtonGroup>
    </SettingsControl>
    {filterType === FilterType.QUERY &&
      <SettingsControl label={t('Query')}>
        <Input disabled={disabled} height={ControlsHeight.S} size={Size.L} value={subQuery} onChange={(event) => setSubQuery(event.target.value)}/>
      </SettingsControl>
    }
  </div>)
}

ChartSettings.propTypes = {
  disabled: PropTypes.bool,
  reportSettings: PropTypes.object.isRequired,
}

export default ChartSettings;

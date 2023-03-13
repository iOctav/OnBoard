import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@jetbrains/ring-ui/dist/button-group/button-group';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useState } from 'react';
import { FilterType } from './filter-type';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { Size } from '@jetbrains/ring-ui/dist/input/input';

const ChartSettingsLabel = styled.span`
  position: relative;
  top: 0;
  display: inline-block;
  float: left;
  max-width: 144px;
  padding-top: 4px;
  vertical-align: top;
  line-height: 16px;
`;

const ChartLabelledControl = styled.div`
  position: relative;
  margin: 16px 0;
`;

const ChartControlContainer = styled.div`
  margin-bottom: calc(var(--ring-unit));
  position: relative;
  width: auto;
  min-height: 24px;
  margin-left: 160px;
  vertical-align: top;
  line-height: 24px;
`;

function ChartSettings({reportSettings}) {
  const { t } = useTranslation();
  const [ doNotUseBurndown, setDoNotUseBurndown ] = useState(reportSettings.doNotUseBurndown);
  const [ filterType, setFilterType ] = useState(reportSettings.filterType.id);
  const [ subQuery, setSubQuery ] = useState(reportSettings.subQuery);
  return (<div>
    <ChartLabelledControl>
      <ChartSettingsLabel>{t('Type')}</ChartSettingsLabel>
      <ChartControlContainer>
        <ButtonGroup>
          <Button active={!doNotUseBurndown} height={ControlsHeight.S} onClick={() => setDoNotUseBurndown(false)}>
            {t('Burndown')}
          </Button>
          <Button active={doNotUseBurndown} height={ControlsHeight.S} onClick={() => setDoNotUseBurndown(true)}>
            {t('Cumulative flow')}
          </Button>
        </ButtonGroup>
      </ChartControlContainer>
    </ChartLabelledControl>
    <ChartLabelledControl>
      <ChartSettingsLabel>{t('Issue filter')}</ChartSettingsLabel>
      <ChartControlContainer>
        <ButtonGroup>
          <Button active={filterType === FilterType.ALL_TASKS}
                  height={ControlsHeight.S}
                  onClick={() => setFilterType(FilterType.ALL_TASKS)}>
            {t('All cards')}
          </Button>
          <Button active={filterType === FilterType.QUERY}
                  height={ControlsHeight.S}
                  onClick={() => setFilterType(FilterType.QUERY)}>
            {t('Custom')}
          </Button>
        </ButtonGroup>
      </ChartControlContainer>
    </ChartLabelledControl>
    {filterType === FilterType.QUERY &&
      <ChartLabelledControl>
        <ChartSettingsLabel>{t('Query')}</ChartSettingsLabel>
        <ChartControlContainer>
          <Input size={Size.L} value={subQuery} onChange={(event) => setSubQuery(event.target.value)}/>
        </ChartControlContainer>
      </ChartLabelledControl>
    }
  </div>)
}

ChartSettings.propTypes = {
  reportSettings: PropTypes.object.isRequired,
}

export default ChartSettings;

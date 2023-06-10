import PropTypes from 'prop-types';
import { getDatasetByDatePeriodType } from '../../features/customFields/dateFieldUtils';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useTranslation } from 'react-i18next';
import Select from '@jetbrains/ring-ui/dist/select/select';
import { useMemo } from 'react';

function DateValuesSelect({swimlane, onChange}) {
  const { t } = useTranslation();
  const dataset = useMemo(() =>
      getDatasetByDatePeriodType(swimlane.field?.dateType)
        .map(item => ({...item, label: t(item.label)})),
  [swimlane.field]);
  const values = useMemo(() =>
      swimlane.values.map(item => ({...item, label: t(item.label)})),
    [swimlane.values]);

  return (<Select
      label={t('Add value')} size={Size.L}
      multiple={{selectAll: true}}
      selected={values} disabled={swimlane.order === 0}
      onChange={(values) => onChange({ values: [...values]})}
      data={dataset}/>
  );
}

DateValuesSelect.propTypes = {
  swimlane: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateValuesSelect;
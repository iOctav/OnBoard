import PropTypes from 'prop-types';
import { getDatasetByDatePeriodType } from '../../features/customFields/dateFieldUtils';
import { updateNestedSwimlane } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Select from '@jetbrains/ring-ui/dist/select/select';


function DateValuesSelect({swimlane}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataset = getDatasetByDatePeriodType(swimlane.field?.dateType);

  return (<Select
      label={t('Add value')} size={Size.L}
      multiple={{selectAll: true}}
      selected={swimlane.values} disabled={swimlane.order === 0}
      onChange={(values) => dispatch(updateNestedSwimlane({id: swimlane.id, changes: { values: [...values]}}))}
      data={dataset}/>
  );
}

DateValuesSelect.propTypes = {
  swimlane: PropTypes.object.isRequired,
}

export default DateValuesSelect;
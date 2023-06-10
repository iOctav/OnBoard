import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';
import { useLazyGetIssuesFilterFieldsQuery, useLazyGetValuesFilterFieldsQuery } from '../../app/services/youtrackApi';
import { getDatasetByDatePeriodType, getDateFieldType } from '../../features/customFields/dateFieldUtils';
import { useSelector } from 'react-redux';
import { selectCustomFieldIds } from '../../features/customFields/customFieldsSlice';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useTranslation } from 'react-i18next';

function SwimlaneFieldSelect({projectShortNames, swimlane, onChange}) {
  const { t } = useTranslation();
  const availableFields = useSelector(selectCustomFieldIds);

  return (<LazySelectBox disabled={swimlane.system}
    selected={{label: capitalizeFirstLetter(swimlane.field?.presentation), key: swimlane.field?.id}}
    makeDataset={data => data.filter(field => availableFields.includes(field.id) || field.instant || field.id === 'tag')
      .map(field => ({value: field.id,
        label: capitalizeFirstLetter(t(field.name, { context: 'Predefined fields'})), description: field.customField?.fieldType?.presentation,
        fieldTypeId: field?.customField?.fieldType?.id,
        aggregateable: field.aggregateable}))}
    lazyDataLoaderHook={swimlane.type === SwimlaneType.Values ? useLazyGetValuesFilterFieldsQuery : useLazyGetIssuesFilterFieldsQuery}
    lazyDataLoaderHookParams={projectShortNames}
    size={Size.M}
    height={ControlsHeight.S}
    onSelect={field => {
      if (field.value !== swimlane.field?.id) {
        const dateType = getDateFieldType(field.fieldTypeId, field.value);
        onChange({ field:
                { id: field.value, presentation: field.label, aggregateable: field.aggregateable, name: field.value, dateType: dateType },
              values: !dateType ? [] :  getDatasetByDatePeriodType(dateType)
            });
      }}}
  />);
}

SwimlaneFieldSelect.propTypes = {
  projectShortNames: PropTypes.array,
  swimlane: PropTypes.object.isRequired,
  onChange: PropTypes.func,
}

export default SwimlaneFieldSelect;

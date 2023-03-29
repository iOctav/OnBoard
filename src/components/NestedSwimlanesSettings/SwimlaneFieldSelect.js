import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';
import { useLazyGetIssuesFilterFieldsQuery, useLazyGetValuesFilterFieldsQuery } from '../../app/services/youtrackApi';
import { getDatasetByDatePeriodType, getDateFieldType } from '../../features/customFields/dateFieldUtils';
import { selectSwimlaneMetadataById, updateNestedSwimlane } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCustomFieldIds } from '../../features/customFields/customFieldsSlice';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';
import { Size } from '@jetbrains/ring-ui/dist/input/input';

function SwimlaneFieldSelect({projectShortNames, swimlaneId}) {
  const dispatch = useDispatch();
  const availableFields = useSelector(selectCustomFieldIds);
  const swimlane = useSelector(state => selectSwimlaneMetadataById(state, swimlaneId));

  return (<LazySelectBox
    selected={{label: capitalizeFirstLetter(swimlane.field?.presentation), key: swimlane.field?.id}}
    disabled={swimlane.order === 0}
    makeDataset={data => data.filter(field => availableFields.includes(field.id) || field.instant || field.id === 'tag')
      .map(field => ({value: field.id,
        label: capitalizeFirstLetter(field.name), description: field.customField?.fieldType?.presentation,
        fieldTypeId: field?.customField?.fieldType?.id,
        aggregateable: field.aggregateable}))}
    lazyDataLoaderHook={swimlane.type === SwimlaneType.Values ? useLazyGetValuesFilterFieldsQuery : useLazyGetIssuesFilterFieldsQuery}
    lazyDataLoaderHookParams={projectShortNames}
    size={Size.M}
    height={ControlsHeight.S}
    onSelect={field => {
      if (field.value !== swimlane.field?.id) {
        const dateType = getDateFieldType(field.fieldTypeId, field.value);
        dispatch(updateNestedSwimlane({id: swimlane.id, changes:
            { field:
                { id: field.value, presentation: field.label, aggregateable: field.aggregateable, name: field.label, dateType: dateType },
              values: !dateType ? [] :  getDatasetByDatePeriodType(dateType)
            }}
        ))
      }}}
  />);
}

SwimlaneFieldSelect.propTypes = {
  projectShortNames: PropTypes.array,
  swimlaneId: PropTypes.string.isRequired,
}

export default SwimlaneFieldSelect;

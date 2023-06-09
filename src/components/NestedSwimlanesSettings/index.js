import PropTypes from 'prop-types';
import NestedSwimlanesList from './NestedSwimlanesList';
import { v4 as uuidv4 } from 'uuid';
import { calculateSwimlaneType } from '../../utils/swimlanesUtils';
import { DatePeriodType } from '../../features/customFields/date-period-type';
import {
  DateSwimlanePastPeriods,
  DateSwimlanePeriods,
  getDateFieldType
} from '../../features/customFields/dateFieldUtils';

function NestedSwimlanesSettings({projectShortNames, swimlaneSettings, hideOrphansSwimlane}) {
  let systemSwimlane;
  if (swimlaneSettings && swimlaneSettings.enabled) {
    const id = uuidv4();
    const dateType = getDateFieldType(swimlaneSettings?.field?.customField?.fieldType?.id, swimlaneSettings?.field?.id);
    systemSwimlane = {
      id: id,
      order: 0,
      type: calculateSwimlaneType(true, swimlaneSettings?.$type),
      system: true,
      field: {
        id: swimlaneSettings.field.id,
        name: swimlaneSettings.field.name,
        presentation: swimlaneSettings.field.presentation,
        aggregateable: swimlaneSettings.values?.length > 0 || swimlaneSettings.field.multiValue,
        dateType: dateType,
      },
      values:  !dateType ? [...swimlaneSettings.values].map(val => ({key: val.name, id: val.id, label: val.presentation, colorId: null}))
        : dateType === DatePeriodType.Both ? DateSwimlanePeriods : DateSwimlanePastPeriods,
        hideOrphansSwimlane: hideOrphansSwimlane,
        enableColor: false,
    };
  }
  return (<NestedSwimlanesList projectShortNames={projectShortNames} systemSwimlane={systemSwimlane}/>);
}

NestedSwimlanesSettings.propTypes = {
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  swimlaneSettings: PropTypes.object,
  hideOrphansSwimlane: PropTypes.bool,
}

export default NestedSwimlanesSettings;
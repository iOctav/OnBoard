import '../ColorPalette/palette.css';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectCustomFieldMetadataById } from '../../features/customFields/customFieldsSlice';
import SelectCardField from './SelectCardField';
import {
    getDataPattern, getDataPlaceholder,
    isDateField,
    isDateTimeField,
    isPeriodField,
    isSelectField
} from '../../features/customFields/fieldUtils';
import FieldDatePicker from './FieldDatePicker';
import FieldInput from './FieldInput';
import FieldPeriod from './FieldPeriod';

function AgileCardField({issueId, field}) {
    const customField = useSelector(state => selectCustomFieldMetadataById(state, field.projectCustomField.field.id));

    if (isDateField(customField.valueType)) {
        return (<FieldDatePicker customField={customField} value={field.value} withTime={isDateTimeField(customField.valueType)}/>);
    }
    if (isPeriodField(customField.valueType)) {
        return <FieldPeriod customField={customField} value={field.value?.minutes}/>;
    }

    if (isSelectField(customField.valueType)) {
        const selected = {
            value: undefined,
            colorId: parseInt(field.value?.color?.id),
        };
        if (customField.isMultiValue) {
            selected.value = field.value?.length > 0 ? field.value.map(item => ({ label: item.name, key: item.id })) : [];
        } else {
            selected.value = field.value && { label: field.value?.name, key: field.value?.id };
        }
        return (<SelectCardField issueId={issueId} customField={ customField } selected={selected}/>);
    } else {
        const dataPattern = getDataPattern(customField.valueType);
        const placeholder = getDataPlaceholder(customField.valueType);
        return (<FieldInput customField={customField} value={field.value} placeholder={placeholder} errorText="Doesn't match the pattern" pattern={dataPattern}/>);
    }
}

AgileCardField.propTypes = {
    issueId: PropTypes.string.isRequired,
    field: PropTypes.object,
}

export default AgileCardField

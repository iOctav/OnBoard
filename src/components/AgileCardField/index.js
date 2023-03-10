import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import {
    useLazyGetBuildBundleValuesQuery,
    useLazyGetEnumBundleValuesQuery,
    useLazyGetOwnedBundleValuesQuery,
    useLazyGetStateBundleValuesQuery,
    useLazyGetUserBundleValuesQuery,
    useLazyGetVersionBundleValuesQuery
} from '../../store/youtrackApi';

const mapTypeDataRequest = (fieldType) => {
    switch (fieldType) {
        case 'EnumProjectCustomField': return useLazyGetEnumBundleValuesQuery;
        case 'StateProjectCustomField': return useLazyGetStateBundleValuesQuery;
        case 'UserProjectCustomField': return useLazyGetUserBundleValuesQuery;
        case 'OwnedProjectCustomField': return useLazyGetOwnedBundleValuesQuery;
        case 'VersionProjectCustomField': return useLazyGetVersionBundleValuesQuery;
        case 'BuildProjectCustomField': return useLazyGetBuildBundleValuesQuery;
        default: return null;
    }
}

function AgileCardField({field}) {
    if (!field.projectCustomField.bundle) return null;
    const mapBundleDataItem = item => ({label: item.name, key: item.id});
    const isMultiValue = field.projectCustomField.field.fieldType.isMultiValue;
    let selected;
    let label = field.projectCustomField?.emptyFieldText ?? '?';
    if (isMultiValue) {
        selected = field.value.length > 0 ? field.value.map(item => ({ label: item.name, key: item.id })) : [];
    } else {
        selected = field.value && { label: field.value.name, key: field.value.id };
    }
    const lazyDataBundleHook = mapTypeDataRequest(field.projectCustomField.$type);
    return (
        <LazySelectBox className="agile-card-enumeration-item"
                selected={selected}
                lazyDataLoaderHook={lazyDataBundleHook}
                label={label}
                lazyDataLoaderHookParams={field.projectCustomField.bundle.id}
                makeDataset={(data) => data.map(mapBundleDataItem)}
                multiple={field.projectCustomField.field.fieldType.isMultiValue}
                type="INLINE">
        </LazySelectBox>
    );
}

AgileCardField.propTypes = {
    field: PropTypes.object,
}

export default AgileCardField

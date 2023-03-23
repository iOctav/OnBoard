import styled from 'styled-components';

import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import {
    useLazyGetBuildBundleValuesQuery,
    useLazyGetEnumBundleValuesQuery,
    useLazyGetOwnedBundleValuesQuery,
    useLazyGetStateBundleValuesQuery,
    useLazyGetUserBundleValuesQuery,
    useLazyGetVersionBundleValuesQuery
} from '../../app/services/youtrackApi';
import {useState} from 'react';

const CardFieldAnchor = styled.span`
    cursor: pointer;
    text-decoration: none;
    color: var(--ring-secondary-color);
    border: 0;
    &:hover {
        color: var(--ring-link-hover-color);
        text-decoration: none;
    }
`;

const LeftMarginSpan = styled.span`
    margin-left: calc(var(--ring-unit));
`;

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
    let selected;
    const isMultiValue = field.projectCustomField.field.fieldType.isMultiValue;
    let label = field.projectCustomField?.emptyFieldText ?? '?';
    if (isMultiValue) {
        selected = field.value.length > 0 ? field.value.map(item => ({ label: item.name, key: item.id })) : [];
    } else {
        selected = field.value && { label: field.value.name, key: field.value.id };
    }
    const [selectedItem, setSelectedItem] = useState(selected);
    if (!field.projectCustomField.bundle) return null;
    const mapBundleDataItem = item => ({label: item.name, key: item.id});
    const lazyDataBundleHook = mapTypeDataRequest(field.projectCustomField.$type);
    return (
        <LazySelectBox
                selected={selected}
                lazyDataLoaderHook={lazyDataBundleHook}
                label={label}
                lazyDataLoaderHookParams={field.projectCustomField.bundle.id}
                makeDataset={(data) => data.map(mapBundleDataItem)}
                multiple={field.projectCustomField.field.fieldType.isMultiValue}
                type="CUSTOM"
                onSelect={(item) => setSelectedItem(item)}
                customAnchor={({wrapperProps, buttonProps, popup}) => (
                <LeftMarginSpan className="agile-card-enumeration-item" {...wrapperProps}>
                    <CardFieldAnchor title={field.projectCustomField.field.name + ': ' + (selectedItem?.label ?? label)} {...buttonProps}></CardFieldAnchor>
                    {popup}
                </LeftMarginSpan>)}>
        </LazySelectBox>
    );
}

AgileCardField.propTypes = {
    field: PropTypes.object,
}

export default AgileCardField

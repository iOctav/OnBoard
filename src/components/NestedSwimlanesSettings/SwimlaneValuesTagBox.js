import PropTypes from 'prop-types';
import {
  useLazyGetBuildBundleValuesQuery,
  useLazyGetEnumBundleValuesQuery, useLazyGetOwnedBundleValuesQuery, useLazyGetProjectsQuery,
  useLazyGetStateBundleValuesQuery,
  useLazyGetUserBundleValuesQuery, useLazyGetVersionBundleValuesQuery
} from '../../app/services/youtrackApi';
import LazyTagBox from '../LazyTagBox';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { selectCustomFieldMetadataById } from '../../features/customFields/customFieldsSlice';
import { useState } from 'react';
import { updateNestedSwimlane } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';

const mapTypeDataRequest = (fieldType) => {
  switch (fieldType) {
    case 'EnumBundle': return useLazyGetEnumBundleValuesQuery;
    case 'StateBundle': return useLazyGetStateBundleValuesQuery;
    case 'UserBundle': return useLazyGetUserBundleValuesQuery;
    case 'OwnedBundle': return useLazyGetOwnedBundleValuesQuery;
    case 'VersionBundle': return useLazyGetVersionBundleValuesQuery;
    case 'BuildBundle': return useLazyGetBuildBundleValuesQuery;
    default: return null;
  }
}

function SwimlaneValuesTagBox({swimlane}) {
  const { t } = useTranslation();
  const customField = useSelector(state => selectCustomFieldMetadataById(state, swimlane.field.id));
  const dispatch = useDispatch();

  const lazyDataBundleHook = mapTypeDataRequest(customField?.bundle?.type);
  if (lazyDataBundleHook) {
    return (<LazyTagBox placeholder={t('Add value')} size={Size.L}
              tags={swimlane.values} disabled={swimlane.order === 0}
              onAddTag={(tag) => dispatch(updateNestedSwimlane({id: swimlane.id, changes: { values: [...swimlane.values, tag.tag]}}))}
              lazyDataLoaderHook={lazyDataBundleHook}
              lazyDataLoaderHookParams={customField?.bundle?.id}
              makeDataSource={(data) => data.map(item => ({label: item.name, key: item.name, id: item.id}))}/>)
  } else {
    return null;
  }

}

SwimlaneValuesTagBox.propTypes = {
  swimlane: PropTypes.object.isRequired,
};

export default SwimlaneValuesTagBox;

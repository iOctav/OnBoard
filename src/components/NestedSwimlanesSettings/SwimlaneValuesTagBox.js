import PropTypes from 'prop-types';
import {
  useLazyGetBuildBundleValuesQuery,
  useLazyGetEnumBundleValuesQuery, useLazyGetIssueTagsQuery,
  useLazyGetOwnedBundleValuesQuery,
  useLazyGetStateBundleValuesQuery,
  useLazyGetUserBundleValuesQuery,
  useLazyGetVersionBundleValuesQuery
} from '../../app/services/youtrackApi';
import LazyTagBox from '../LazyTagBox';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { selectCustomFieldMetadataById } from '../../features/customFields/customFieldsSlice';
import DateValuesSelect from './DateValuesSelect';

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

const mapIdDataRequest = (fieldId) => {
  switch (fieldId.toLowerCase()) {
    case 'tag': return useLazyGetIssueTagsQuery;
    default: return null;
  }
}


function SwimlaneValuesTagBox({swimlane, onChange}) {
  const { t } = useTranslation();
  const customField = useSelector(state => selectCustomFieldMetadataById(state, swimlane.field.id));

  const lazyDataBundleHook = mapTypeDataRequest(customField?.bundle?.type) || mapIdDataRequest(swimlane.field.id);
  if (lazyDataBundleHook) {
    return (<LazyTagBox placeholder={t('Add value')} size={Size.L}
              tags={swimlane.values} disabled={swimlane.system}
              onAddTag={(tag) => onChange({ values: [...swimlane.values, tag.tag]})}
              onRemoveTag={(tag) => onChange({ values: swimlane.values.filter(value => value !== tag.tag)})}
              lazyDataLoaderHook={lazyDataBundleHook}
              lazyDataLoaderHookParams={customField?.bundle?.id}
              makeDataSource={(data) => data.map(item => ({label: item.name, key: item.name, id: item.id,
                colorId: item.color?.id !== '0' ? item.color?.id : null}))}/>)
  } else {
    return (<DateValuesSelect swimlane={swimlane} onChange={onChange}/>);
  }

}

SwimlaneValuesTagBox.propTypes = {
  swimlane: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SwimlaneValuesTagBox;

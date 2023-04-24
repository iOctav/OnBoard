import PropTypes from 'prop-types';
import LazyTagBox from '../LazyTagBox';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { selectCustomFieldMetadataById } from '../../features/customFields/customFieldsSlice';
import DateValuesSelect from './DateValuesSelect';
import { COLORS } from '../ColorPalette/colors';
import { mapIdDataRequest, mapTypeDataRequest } from '../../features/customFields/fieldUtils';

function SwimlaneValuesTagBox({swimlane, onChange}) {
  const { t } = useTranslation();
  const customField = useSelector(state => selectCustomFieldMetadataById(state, swimlane.field.id));

  const lazyDataBundleHook = mapTypeDataRequest(customField?.valueType) || mapIdDataRequest(swimlane.field.id);
  if (lazyDataBundleHook) {
    return (<LazyTagBox placeholder={t('Add value')} size={Size.L}
              tags={swimlane.values} disabled={swimlane.system}
              onAddTag={(tag) => onChange({ values: [...swimlane.values, tag.tag]})}
              onRemoveTag={(tag) => onChange({ values: swimlane.values.filter(value => value !== tag.tag)})}
              lazyDataLoaderHook={lazyDataBundleHook}
              lazyDataLoaderHookParams={customField?.bundle?.id}
              makeDataSource={(data) => data.map(item => {
                const colorId = item.color?.id !== '0' ? item.color?.id : null;
                return ({label: item.name, key: item.name, id: item.id,
                  colorId, backgroundColor: colorId && COLORS[colorId].background, textColor: colorId && COLORS[colorId].text});
              })}/>)
  } else {
    return (<DateValuesSelect swimlane={swimlane} onChange={onChange}/>);
  }

}

SwimlaneValuesTagBox.propTypes = {
  swimlane: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SwimlaneValuesTagBox;

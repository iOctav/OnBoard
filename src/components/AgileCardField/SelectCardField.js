import PropTypes from 'prop-types';
import { useState } from 'react';
import { mapTypeDataRequest } from '../../features/customFields/fieldUtils';
import LazySelectBox from '../LazySelectBox';
import { CardFieldAnchor, LeftMarginSpan, Marker } from './styled-components';
import { COLORS } from '../ColorPalette/colors';

function SelectCardField({customField, selected}) {
  const [selectedItem, setSelectedItem] = useState(selected);
  const lazyDataBundleHook = mapTypeDataRequest(customField?.valueType);
  if (!lazyDataBundleHook) return null;
  const mapBundleDataItem = item => ({label: item.name, key: item.id});
  const emptyFieldText = customField?.emptyFieldText ?? '?';

  return (
    <LazySelectBox
      selected={selected.value}
      lazyDataLoaderHook={lazyDataBundleHook}
      label={emptyFieldText}
      lazyDataLoaderHookParams={customField?.bundle?.id}
      makeDataset={(data) => data.map(mapBundleDataItem)}
      multiple={customField.isMultiValue}
      type="CUSTOM"
      onSelect={(item) => setSelectedItem(item)}
      customAnchor={({wrapperProps, buttonProps, popup}) => (
        <LeftMarginSpan className="agile-card-enumeration-item" {...wrapperProps}>
          {!!selected.colorId && <Marker className={`ring-palette_tone-${COLORS[selected.colorId].tone}-${COLORS[selected.colorId].brightness}`}/>}
          <CardFieldAnchor title={customField?.name + ': ' + (selectedItem?.label ?? emptyFieldText)} {...buttonProps}></CardFieldAnchor>
          {popup}
        </LeftMarginSpan>)}>
    </LazySelectBox>
  );
}

SelectCardField.propTypes = {
  customField: PropTypes.object,
  selected: PropTypes.object,
}

export default SelectCardField;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { mapTypeDataRequest } from '../../features/customFields/fieldUtils';
import LazySelectBox from '../LazySelectBox';
import { CardFieldAnchor, LeftMarginSpan, Marker } from './styled-components';
import { COLORS } from '../ColorPalette/colors';
import ColorAnchor from '../ColorPicker/ColorAnchor';
import { CustomFieldPresentationType } from '../../features/customFields/custom-field-presentation-type';

function SelectCardField({customField, selected}) {
  const [selectedItem, setSelectedItem] = useState(selected);
  const lazyDataBundleHook = mapTypeDataRequest(customField?.valueType);
  if (!lazyDataBundleHook) return null;
  const mapBundleDataItem = item => ({label: item.name, key: item.id, description: item.color?.id !== '0' && (<ColorAnchor label={item.name[0]} colorId={item.color?.id}/>)});
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
          {customField.presentationType === CustomFieldPresentationType.FullName
            ? (<>
                {!!selectedItem.colorId && <Marker className={`ring-palette_tone-${COLORS[selectedItem.colorId].tone}-${COLORS[selectedItem.colorId].brightness}`}/>}
                <CardFieldAnchor title={customField?.name + ': ' + (selectedItem?.label ?? emptyFieldText)} {...buttonProps}/>
              </>)
            : <ColorAnchor label={selectedItem.value && selectedItem.value.label[0]} colorId={selected.colorId} {...buttonProps}/>
          }
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

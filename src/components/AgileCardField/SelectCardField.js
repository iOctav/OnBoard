import PropTypes from 'prop-types';
import { useState } from 'react';
import { mapTypeDataRequest } from '../../features/customFields/fieldUtils';
import LazySelectBox from '../LazySelectBox';
import { CardFieldAnchor, LeftMarginSpan, Marker } from './styled-components';
import { COLORS } from '../ColorPalette/colors';
import ColorAnchor from '../ColorPicker/ColorAnchor';
import { CustomFieldPresentationType } from '../../features/customFields/custom-field-presentation-type';
import { useUpdateIssueFieldMutation } from '../../features/sprint/sprintSlice';
import { useParams } from 'react-router-dom';
import { PropertyUpdateType } from '../../features/sprint/propertyUpdateType';

function SelectCardField({issueId, customField, selected}) {
  const { agileId, sprintId } = useParams();
  const [selectedItem, setSelectedItem] = useState(selected);
  const lazyDataBundleHook = mapTypeDataRequest(customField?.valueType);
  const [updateIssueField] = useUpdateIssueFieldMutation();
  if (!lazyDataBundleHook) return null;
  const mapBundleDataItem = item => ({label: item.name, key: item.id, colorId: parseInt(item.color?.id), value: { label: item.name, key: item.id },
    description: item.color?.id !== '0' ? (<ColorAnchor label={item.name[0]} colorId={item.color?.id}/>) : ''});
  const emptyFieldText = customField?.emptyFieldText ?? '?';
  const updateField = (value) => {
    setSelectedItem(value)
    updateIssueField({
      agileId,
      sprintId,
      issueId: issueId,
      propertiesUpdates: [
        {
          fieldId: customField.name,
          type: PropertyUpdateType.CardField,
          value: customField.isMultiValue
            ? value.map(item => ({name: item.label}))
            : {
                name: value.label
              },
        }
      ]
    });
  };

  return (
    <LazySelectBox
      selected={selected?.value}
      lazyDataLoaderHook={lazyDataBundleHook}
      label={emptyFieldText}
      lazyDataLoaderHookParams={customField?.bundle?.id}
      makeDataset={(data) => data.map(mapBundleDataItem)}
      multiple={customField.isMultiValue}
      type="CUSTOM"
      onChange={(values) => updateField(values)}
      customAnchor={({wrapperProps, buttonProps, popup}) => (
        <LeftMarginSpan className="agile-card-enumeration-item" {...wrapperProps}>
          {customField.presentationType === CustomFieldPresentationType.FullName
            ? (<>
                {!!selectedItem.colorId && <Marker className={`ring-palette_tone-${COLORS[selectedItem.colorId].tone}-${COLORS[selectedItem.colorId].brightness}`}/>}
                <CardFieldAnchor title={customField?.name + ': ' + (selectedItem?.label ?? emptyFieldText)} {...buttonProps}/>
              </>)
            : <ColorAnchor label={selectedItem.value && selectedItem.value.label[0]} colorId={selectedItem.colorId} {...buttonProps}/>
          }
          {popup}
        </LeftMarginSpan>)}>
    </LazySelectBox>
  );
}

SelectCardField.propTypes = {
  issueId: PropTypes.string.isRequired,
  customField: PropTypes.object,
  selected: PropTypes.object,
}

export default SelectCardField;

import Popup from '@jetbrains/ring-ui/dist/popup/popup';
import Dropdown from '@jetbrains/ring-ui/dist/dropdown/dropdown';
import Button from '@jetbrains/ring-ui/dist/button/button';
import ColorPalette from '../ColorPalette';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ColorAnchor from './ColorAnchor';

function ColorPicker({label, selected, onSave, onCancel}) {
  const { t } = useTranslation();
  const [color, setColor] = useState(selected);
  return (
    <Dropdown anchor={(<ColorAnchor label={label} colorId={color}></ColorAnchor>)}
              onHide={() => setColor(selected)}>
      {props =>
        <Popup {...props}>
          <ColorPalette selected={color} onSelect={setColor}></ColorPalette>
          <div>
            <Button onClick={() => {
              onSave && onSave(color);
              props.onCloseAttempt();
            }}>{t('Save')}</Button>
            <Button  onClick={() => {
              setColor(selected);
              onCancel && onCancel(color);
              props.onCloseAttempt();
            }}>{t('Cancel')}</Button>
          </div>
        </Popup>
      }
    </Dropdown>
  );
}

ColorPicker.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ColorPicker;

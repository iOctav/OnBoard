import styled from 'styled-components';

import Popup from '@jetbrains/ring-ui/dist/popup/popup';
import Dropdown from '@jetbrains/ring-ui/dist/dropdown/dropdown';
import Button from '@jetbrains/ring-ui/dist/button/button';
import ColorPalette from '../ColorPalette';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../ColorPalette/colors';

const ColorAnchor = styled.div`
  width: calc(2 * var(--ring-unit));
  height: calc(2 * var(--ring-unit));
  line-height: calc(2 * var(--ring-unit));
  font-size: var(--ring-font-size-smaller);
  margin: calc(var(--ring-unit)/2) 0;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  border-radius: 2px;
`;

function ColorPicker({label, selected, onSave, onCancel}) {
  const { t } = useTranslation();
  const [color, setColor] = useState(selected);
  return (
    <Dropdown anchor={(<ColorAnchor className={`ring-palette_tone-${COLORS[color].tone}-${COLORS[color].brightness}`}>{label ?? 'A'}</ColorAnchor>)}
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

import './palette.css';
import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MAPPING } from './mapping';
import { COLORS } from './colors';

const ColorInlineBlock = styled.div`
  display: inline-block;
  height: 26px;
  line-height: 25px;
  border-radius: 2px;
  width: 26px;
  margin: 1px 1px 2px 2px;
  box-shadow: 0 0 3px transparent, inset 0 0 0 1px transparent;
  text-align: center;
  cursor: pointer;
  ${props => props.active && 'box-shadow: inset 0 0 0 1px var(--ring-border-hover-color), 0 0 0 1px var(--ring-border-hover-color);'}
`;

const NoColorSample = styled.div`
  display: inline-block;
  height: 26px;
  line-height: 25px;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  width: 200px;
  margin-top: 1px;
  margin-left: 2px;
  border: 1px solid var(--ring-borders-color);
  ${props => props.active && 'box-shadow: inset 0 0 0 1px var(--ring-border-hover-color), 0 0 0 1px var(--ring-border-hover-color);'}
`;

function ColorPalette({selected, onSelect}) {
  const xrange = num => [...Array(num)].map((val, index) => index);
  const arr5 = xrange(5);
  const arr7 = xrange(7);

  const { t } = useTranslation();
  const [pickedColor, setPickedColor] = useState(selected);
  const selectColor = (colorId) => {
    setPickedColor(colorId);
    onSelect(colorId);
  };

  return (
    <div className="color-palette">
      {arr5.map(i => (<div key={i * 7}>{
        arr7.map(j => (<ColorInlineBlock active={COLORS[pickedColor].tone === j && COLORS[pickedColor].brightness === i}
                                         key={i * 7 + j + 1}
                                         className={`ring-palette_tone-${j}-${i}`}
                                         onClick={() => selectColor(MAPPING[j][i])}>
                         a
                       </ColorInlineBlock>))
      }</div>))}
      <NoColorSample active={pickedColor === '0'} onClick={() => selectColor('0')}>{t('No color')}</NoColorSample>
    </div>
  )
}

ColorPalette.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.func,
}

export default ColorPalette;

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../ColorPalette/colors';

const ColorAnchorContainer = styled.div`
  width: calc(2 * var(--ring-unit));
  height: calc(2 * var(--ring-unit));
  line-height: calc(2 * var(--ring-unit));
  font-size: var(--ring-font-size-smaller);
  margin: calc(var(--ring-unit)/2) 0;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  border-radius: 2px;
  ${props => props.background ? `background: ${props.background};` : ''};
  ${props => props.color ? `color: ${props.color};` : ''};
`;

function ColorAnchor({label, colorId, ...restProps}) {
  return <ColorAnchorContainer data-testid="color-anchor" background={COLORS[colorId]?.background} color={COLORS[colorId]?.text} {...restProps}>
    {label ?? 'A'}
  </ColorAnchorContainer>
}

ColorAnchor.propTypes = {
  label: PropTypes.string,
  colorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ColorAnchor;
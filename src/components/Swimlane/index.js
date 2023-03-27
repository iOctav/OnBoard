import '../ColorPalette/palette.css';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import caretDown10px from '@jetbrains/icons/caret-down-10px';
import caretRight10px from '@jetbrains/icons/caret-right-10px';
import drag from '@jetbrains/icons/drag';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Icon from '@jetbrains/ring-ui/dist/icon/icon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSwimlanesDepth } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import { COLORS } from '../ColorPalette/colors';

const DraggableIcon = styled(Icon)`
  cursor: move;
`;

const FloatLeftDiv = styled.div`
  ${props => `margin-left: calc(var(--ring-unit) * ${props.level});`}
  float: left;
`;

const FloatRightDiv = styled.div`
  float: right;
`;

const CardsCounterSpan = styled.span`
  font-size: 12px;
  color: var(--ring-secondary-color);
`;

const SwimlaneButton = styled(Button)`
  font-weight: bold;
  font-size: var(--ring-font-size-larger);
  font-family: var(--ring-font-family);
  color: var(--ring-text-color);
  &:hover {
    color: var(--ring-link-hover-color);
    text-decoration: none;
  };
`;

const SwimlaneContainer = styled.div`
  padding: var(--ring-unit);
`;

const LevelMarker = styled.span`
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 20px;
  padding: 0 8px;
  cursor: default;
  vertical-align: baseline;
  border: 1px var(--ring-line-color) solid;
  border-radius: var(--ring-border-radius);
  font-size: var(--ring-font-size-smaller);
  font-weight: normal;
  font-style: normal;
  line-height: 17px;
`;

function Swimlane({title, isOrphan, cardsNumber, columnsNumber, level, rollUp, onRollUp, backgroundId}) {
  const swimlanesDepth = useSelector(selectSwimlanesDepth);
  const { t } = useTranslation();
  const extraSpans = swimlanesDepth > 1 ? swimlanesDepth - 1 : 0;
  const bgId = parseInt(backgroundId);

  return (
    <tr>
      <td colSpan={columnsNumber + extraSpans}>
        {!!title && (
          <SwimlaneContainer>
            <FloatLeftDiv level={level}>
              <div>
                { !isOrphan && <DraggableIcon glyph={drag} /> }
                { level > 0 && <LevelMarker className={bgId && `ring-palette_tone-${COLORS[bgId].tone}-${COLORS[bgId].brightness}`}>L{level}</LevelMarker> }
                <SwimlaneButton icon={rollUp ? caretDown10px : caretRight10px} onClick={() => {
                  onRollUp(!rollUp);
                }}>
                  {title}
                </SwimlaneButton>
              </div>
            </FloatLeftDiv>
            <FloatRightDiv>
              { !!cardsNumber && (<CardsCounterSpan>{cardsNumber} {t(cardsNumber > 1 ? 'cards' : 'card')}</CardsCounterSpan>)}
            </FloatRightDiv>
          </SwimlaneContainer>
        )}
      </td>
    </tr>
  );
}

Swimlane.propTypes = {
  title: PropTypes.string,
  isOrphan: PropTypes.bool,
  cardsNumber: PropTypes.number,
  columnsNumber: PropTypes.number,
  level: PropTypes.number,
  rollUp: PropTypes.bool,
  onRollUp: PropTypes.func,
  backgroundId: PropTypes.string,
}

export default Swimlane

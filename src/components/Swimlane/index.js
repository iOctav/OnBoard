import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useState } from 'react';
import caretDown10px from '@jetbrains/icons/caret-down-10px';
import caretRight10px from '@jetbrains/icons/caret-right-10px';
import drag from '@jetbrains/icons/drag';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Icon from '@jetbrains/ring-ui/dist/icon/icon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSwimlanesDepth } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';

const DraggableIcon = styled(Icon)`
  cursor: move;
`;

const FloatLeftDiv = styled.div`
  ${props => `padding-left: calc(var(--ring-unit) * ${props.level});`}
  float: left;
`;

const FloatRightDiv = styled.div`
  float: right;
`;

const CardsCounterSpan = styled.span`
  font-size: 12px;
  color: var(--ring-secondary-color);
`;

const SwimlaneTitle = styled.span`
  font-weight: bold;
  font-size: var(--ring-font-size-larger);
`;

function Swimlane({title, isOrphan, cardsNumber, columnsNumber, level}) {
  const [rollUp, setRollUp] = useState(true);
  const swimlanesDepth = useSelector(selectSwimlanesDepth);
  const extraSpans = swimlanesDepth > 1 ? swimlanesDepth - 1 : 0;
  const { t } = useTranslation();
  return (
    <tr>
      <td colSpan={columnsNumber + extraSpans - 1}>
        {!!title && (
          <FloatLeftDiv level={level}>
              { !isOrphan && <DraggableIcon glyph={drag} /> }
            <Button icon={rollUp ? caretDown10px : caretRight10px} onClick={() => setRollUp(prevState => !prevState)}>
              <SwimlaneTitle>{title}</SwimlaneTitle>
            </Button>
          </FloatLeftDiv>
        )}
      </td>
      <td>
          <FloatRightDiv>
              { !!cardsNumber && (<CardsCounterSpan>{cardsNumber} {t(cardsNumber > 1 ? 'cards' : 'card')}</CardsCounterSpan>)}
          </FloatRightDiv>
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
}

export default Swimlane

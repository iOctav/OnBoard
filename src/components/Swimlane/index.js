import '../ColorPalette/palette.css';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import caretDown10px from '@jetbrains/icons/caret-down-10px';
import caretRight10px from '@jetbrains/icons/caret-right-10px';
import drag from '@jetbrains/icons/drag';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Icon from '@jetbrains/ring-ui/dist/icon/icon';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../ColorPalette/colors';
import Link from '@jetbrains/ring-ui/dist/link/link';
import { issueDetails } from '../../services/linkService';

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
  ${props => props.resolved ? 'text-decoration: line-through' : ''};
  &:hover {
    color: var(--ring-link-hover-color);
    text-decoration: none;
  };
`;

const SwimlaneContainer = styled.div`
  padding: var(--ring-unit);
`;

const IssueLink = styled(Link)`
  ${props => props.resolved ? 'text-decoration: line-through' : ''};  
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

const Span14px = styled.span`
  width: 14px;
  display: inline-block;
`;

function Swimlane({title, issueId, isOrphan, striked, cardsNumber, columnsNumber,
                    level, rollUp, onRollUp, backgroundId, isTag, swimlanesDepth}) {
  const { t } = useTranslation();
  const extraSpans = swimlanesDepth;
  const bgId = parseInt(backgroundId);
  const issueDetailsLink = issueDetails(issueId, title);

  return (
    <tr data-testid="swimlane-tr">
      <td colSpan={columnsNumber + extraSpans} data-testid="swimlane-td">
        {!!title && (
          <SwimlaneContainer>
            <FloatLeftDiv level={level}>
              <div>
                { !isOrphan ? <DraggableIcon glyph={drag} /> : <Span14px></Span14px>}
                { level >= 0 && <LevelMarker className={bgId && `ring-palette_tone-${COLORS[bgId].tone}-${COLORS[bgId].brightness}`}>L{level}</LevelMarker> }
                <SwimlaneButton icon={rollUp ? caretDown10px : caretRight10px} resolved={striked ? 1 : 0} onClick={() => {
                  onRollUp(!rollUp);
                }}>
                  {title}
                </SwimlaneButton>
                <IssueLink href={issueDetailsLink} resolved={striked ? 1 : 0} target="_blank">{issueId}</IssueLink>
              </div>
            </FloatLeftDiv>
            <FloatRightDiv>
              { cardsNumber > 0 && (<CardsCounterSpan>{t('1 card', { count: cardsNumber })}</CardsCounterSpan>)}
            </FloatRightDiv>
          </SwimlaneContainer>
        )}
      </td>
    </tr>
  );
}

Swimlane.propTypes = {
  title: PropTypes.string,
  issueId: PropTypes.string,
  striked: PropTypes.bool,
  isOrphan: PropTypes.bool,
  cardsNumber: PropTypes.number,
  columnsNumber: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  rollUp: PropTypes.bool,
  onRollUp: PropTypes.func,
  backgroundId: PropTypes.string,
  isTag: PropTypes.bool,
  swimlanesDepth: PropTypes.number.isRequired,
}

export default Swimlane

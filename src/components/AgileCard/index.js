import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileCardAssignee from '../AgileCardAssignee';
import AgileCardField from '../AgileCardField';
import { issueDetails } from '../../services/linkService';
import { ASSIGNEE_FIELD_TYPE } from '../../utils/cardFieldConstants';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/item-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  pickCard,
  selectCard,
  selectPickedCards,
  selectSelectedCard,
  softSelectCard
} from '../../features/card/cardSlice';
import AgileCardSubtask from '../AgileCardSubtask';
import { useMemo } from 'react';

export const AgileCardDiv = styled.div`
  box-sizing: border-box;
  width: calc(100% - calc(var(--ring-unit) + 1px)) !important;
  min-width: calc(100% - calc(var(--ring-unit) + 1px)) !important;
  height: auto;
  background: var(--ring-content-background-color);
  border: 1px solid #DFE5EB;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin: 0 calc(var(--ring-unit)/2) 6px;
  ${props => props.selected ? `border-color: var(--ring-main-color);` : ''};
  ${props => props.selected ? `box-shadow: 0px 0px 0px 2px var(--ring-main-color);` : ''};
  ${props => props.picked ? `background-color: var(--ring-selected-background-color);` : ''};

  &::before {
    display: block;
    content: "";
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${props => props.bgColor ? `background-color: ${props.bgColor};` : ''};
    border-right: solid 1px transparent;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
`;

const AgileCardSummaryDiv = styled.div`
  display: block;
  border-collapse: collapse;
  color: rgb(31, 35, 38);
  line-height: var(--ring-line-height);
  font-size: var(--ring-font-size);
  min-height: 36px;
  text-overflow: ellipsis;
  margin-bottom: var(--ring-unit);
  overflow: hidden;
`;

const IdLink = styled.a`
  margin-right: var(--ring-unit);
  font-family: "Inter", system-ui, Arial, sans-serif;
  border-collapse: collapse;
  cursor: pointer;
  font-size: var(--ring-font-size);
  color: var(--ring-secondary-color);
  font-variant: tabular-nums;
  text-decoration: none;
  ${props => props.resolved ? 'text-decoration: line-through;' : ''};

  &:hover {
    text-decoration: underline;
  }
`;

const SummarySpan = styled.span`
  color: #1f2326;
  font-size: 14px;
  font-family: "Inter", system-ui, Arial, sans-serif;
`;

const AgileCardFooter = styled.div`
  display: flex;
  position: static;
  height: auto;
  line-height: 20px;
  ${props => props.selected ? 'max-height: 96px;' : 'max-height: 24px;'};
  transition: max-height 0.3s ease-out;
  transition-delay: 0.5s;
  overflow: hidden;
`;

const AgileCardSubtasksFlexContainer = styled.span`
  flex-shrink: 0;
  flex-grow: 0;
`;

function compareCardField(a, b) {
    return a.projectCustomField.ordinal - b.projectCustomField.ordinal;
}

function AgileCard({ issueData, colorField, visibleFields }) {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.AgileCard,
      item: { id: issueData.id },
      collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
      })
  }));
  const selectedCard = useSelector(selectSelectedCard);
  const pickedCards = useSelector(selectPickedCards);

  const cardFooterFields = useMemo(() => [...issueData.fields].filter(issue => !visibleFields || visibleFields.includes(issue.name))
    .sort(compareCardField).map(field => {
          return (<AgileCardField issueId={issueData.id} field={field} key={field?.id}/>);
      }), [issueData.fields]);
  const issueDetailsLink = issueDetails(issueData.idReadable, issueData.summary);
  const assigneeField = issueData.fields.find(field => field.$type === ASSIGNEE_FIELD_TYPE);
  const bgColor = colorField && issueData.fields.find(field => field.name === colorField)?.value?.color?.background;
  const cardClickHandler = (event) => {
    event.stopPropagation();
    if (!event.ctrlKey) {
      if (!event.shiftKey) {
        dispatch(selectCard({cardId: issueData.id}));
      } else {
        dispatch(softSelectCard({cardId: issueData.id}));
      }
    } else {
      dispatch(pickCard({cardId: issueData.id}));
    }
  };

  return <AgileCardDiv data-testid="agile-card" ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }} bgColor={bgColor} className="ob-agile-card" onClick={cardClickHandler} selected={selectedCard?.id === issueData.id} picked={pickedCards?.length > 1 && pickedCards.findIndex(x => x.id === issueData.id) >= 0}>
      <AgileCardSummaryDiv>
          <IdLink href={issueDetailsLink} target="_blank" resolved={issueData.resolved ? 1 : 0}>{issueData.idReadable}</IdLink>
          <SummarySpan>{issueData.summary}</SummarySpan>
      </AgileCardSummaryDiv>

      <AgileCardFooter className="agile-card-footer" selected={selectedCard?.id === issueData.id}>
        <span className="agile-card-enumeration">
            <AgileCardAssignee field={assigneeField}/>
            {cardFooterFields}
        </span>
        <AgileCardSubtasksFlexContainer>
          <AgileCardSubtask  issueId={issueData.id} subtasks={issueData.subtasks}/>
        </AgileCardSubtasksFlexContainer>
      </AgileCardFooter>
  </AgileCardDiv>
}

AgileCard.propTypes = {
  issueData: PropTypes.object.isRequired,
  colorField: PropTypes.string,
  visibleFields: PropTypes.arrayOf(PropTypes.string),
}

export default AgileCard

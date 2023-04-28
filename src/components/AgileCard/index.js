import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileCardAssignee from '../AgileCardAssignee';
import AgileCardField from '../AgileCardField';
import { issueDetails } from '../../services/linkService';
import { ASSIGNEE_FIELDNAME } from '../../utils/cardFieldConstants';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/item-types';
import { useDispatch, useSelector } from 'react-redux';
import { pickCard, selectCard, selectPickedCards, selectSelectedCard } from '../../features/card/cardSlice';

const AgileCardDiv = styled.div`
  box-sizing: border-box;
  width: 97% !important;
  min-width: 97% !important;
  width: calc(100% - calc(var(--ring-unit) + 1px)) !important;
  min-width: calc(100% - calc(var(--ring-unit) + 1px)) !important;
  height: 84px;
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
  ${props => props.resolved ? 'text-decoration: line-through' : ''};

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
  max-height: 24px;
  transition: max-height 0.3s ease-out;
  transition-delay: 0.5s;
  overflow: hidden;
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

  const cardFooterFields = [...issueData.fields].filter(issue => !visibleFields || visibleFields.includes(issue.name))
    .sort(compareCardField).map(field => {
          return (<AgileCardField field={field} key={field?.id}/>);
      });
  const issueDetailsLink = issueDetails(issueData.idReadable, issueData.summary);
  const assigneeField = issueData.fields.find(field => field.name === ASSIGNEE_FIELDNAME);
  const bgColor = colorField && issueData.fields.find(field => field.name === colorField)?.value?.color?.background;
  const cardClickHandler = (event) => {
    event.stopPropagation();
    if (!event.ctrlKey) {
      dispatch(selectCard({cardId: issueData.id}));
    } else {
      dispatch(pickCard({cardId: issueData.id}));
    }
  };

  return <AgileCardDiv ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }} bgColor={bgColor} className="ob-agile-card" onClick={cardClickHandler} selected={selectedCard?.id === issueData.id} picked={pickedCards.findIndex(x => x.id === issueData.id) >= 0}>
      <AgileCardSummaryDiv>
          <IdLink href={issueDetailsLink} target="_blank" resolved={issueData.resolved ? 1 : 0}>{issueData.idReadable}</IdLink>
          <SummarySpan>{issueData.summary}</SummarySpan>
      </AgileCardSummaryDiv>

      <AgileCardFooter className="agile-card-footer">
          <span className="agile-card-enumeration">
              <AgileCardAssignee field={assigneeField}/>
              {cardFooterFields}
          </span>
      </AgileCardFooter>
  </AgileCardDiv>
}

AgileCard.propTypes = {
  issueData: PropTypes.object,
  colorField: PropTypes.string,
  visibleFields: PropTypes.arrayOf(PropTypes.string),
}

export default AgileCard

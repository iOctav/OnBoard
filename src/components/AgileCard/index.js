import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileCardAssignee from '../AgileCardAssignee';
import AgileCardField from '../AgileCardField';
import { issueDetails } from '../../services/linkService';
import { ASSIGNEE_FIELDNAME } from '../../utils/cardFieldConstants';

const AgileCardDiv = styled.div`
  box-sizing: border-box;
  max-width: 458.88px;
  height: 105px;
  background: #FFFFFF;
  border: 1px solid #DFE5EB;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  &::before {
    display: block;
    content: "";
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${props => props.bgColor ? `background-color: ${props.bgColor};` : ''}
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

function compareCardField(a, b) {
    return a.projectCustomField.ordinal - b.projectCustomField.ordinal;
}

function AgileCard({ issueData, colorField }) {
    const cardFooterFields = [...issueData.fields].sort(compareCardField).map(field => {
        return (<AgileCardField field={field} key={field?.id}/>);
    });
    const issueDetailsLink = issueDetails(issueData.idReadable, issueData.summary);
    const assigneeField = issueData.fields.find(field => field.name === ASSIGNEE_FIELDNAME);
    const bgColor = colorField && issueData.fields.find(field => field.name === colorField)?.value?.color?.background;

    return <AgileCardDiv bgColor={bgColor} className="ob-agile-card">
        <AgileCardSummaryDiv>
            <IdLink href={issueDetailsLink} target="_blank" resolved={issueData.resolved ? 1 : 0}>{issueData.idReadable}</IdLink>
            <SummarySpan>{issueData.summary}</SummarySpan>
        </AgileCardSummaryDiv>

        <div className="agile-card-footer">
            <span className="agile-card-enumeration">
                <AgileCardAssignee field={assigneeField}/>
                {cardFooterFields}
            </span>
        </div>
    </AgileCardDiv>
}

AgileCard.propTypes = {
  issueData: PropTypes.object,
  colorField: PropTypes.string,
}

export default AgileCard

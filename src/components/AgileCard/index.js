import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileCardAssignee from '../AgileCardAssignee';
import AgileCardField from '../AgileCardField';
import {issueDetails} from '../../services/linkService';

const AgileCardDiv = styled.div`
  box-sizing: border-box;
  width: 458.88px;
  height: 120px;
  background: #FFFFFF;
  border: 1px solid #DFE5EB;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

const AgileCardSummaryDiv = styled.div`
  display: block;
  border-collapse: collapse;
  color: rgb(31, 35, 38);
  line-height: ${props => props.theme.lineHeight};
  font-size: ${props => props.theme.primaryFontSize};
  min-height: 36px;
  text-overflow: ellipsis;
  margin-bottom: ${props => props.theme.unit};
  overflow: hidden;
`;

const IdLink = styled.a`
  margin-right: ${props => props.theme.unit};
  font-family: "Inter", system-ui, Arial, sans-serif;
  border-collapse: collapse;
  cursor: pointer;
  font-size: ${props => props.theme.primaryFontSize};
  color: ${props => props.theme.secondaryColor};
  font-variant: tabular-nums;
  text-decoration: none;

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

function AgileCard({ issueData }) {
    const cardFooterFields = [...issueData.fields].sort(compareCardField).map(field => {
        return (<AgileCardField field={field} key={field?.id}/>);
    });
    const issueDetailsLink = issueDetails(issueData.idReadable, issueData.summary);

    return <AgileCardDiv>
        <AgileCardSummaryDiv>
            <IdLink href={issueDetailsLink} target="_blank">{issueData.idReadable}</IdLink>
            <SummarySpan>{issueData.summary}</SummarySpan>
        </AgileCardSummaryDiv>

        <div className="agile-card-footer">
            <span className="agile-card-enumeration">
                <AgileCardAssignee/>
                {cardFooterFields}
            </span>
        </div>
    </AgileCardDiv>
}

AgileCard.propTypes = {
    issueData: PropTypes.object
}

export default AgileCard

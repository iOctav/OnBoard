import styled from 'styled-components';

import PropTypes from 'prop-types';

const AgileCardDiv = styled.div`
  box-sizing: border-box;
  width: 458.88px;
  height: 82px;
  background: #FFFFFF;
  border: 1px solid #DFE5EB;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
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

const SummarySpan = styled.span`
  color: #1f2326;
  font-size: 14px;
  font-family: "Inter", system-ui, Arial, sans-serif;
`;

function AgileCardPreview({ issueData }) {
  return <AgileCardDiv>
    <AgileCardSummaryDiv>
      <SummarySpan>{issueData.summary}</SummarySpan>
    </AgileCardSummaryDiv>
  </AgileCardDiv>
}

AgileCardPreview.propTypes = {
  issueData: PropTypes.object
}

export default AgileCardPreview

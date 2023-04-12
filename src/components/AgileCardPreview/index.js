import styled from 'styled-components';

import PropTypes from 'prop-types';

const AgileCardDiv = styled.div`
  height: auto;
  min-height: auto;
  width: 97% !important;
  min-width: 97% !important;
  width: calc(100% - calc(var(--ring-unit) + 1px)) !important;
  min-width: calc(100% - calc(var(--ring-unit) + 1px)) !important;
  display: inline-block;
  vertical-align: top;
  cursor: default;
  padding: calc(var(--ring-unit));
  box-sizing: border-box;
  margin: 0 calc(var(--ring-unit)/2) 6px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: var(--ring-border-radius);
  border: 1px solid var(--ring-line-color);
  transition: 0.3s linear height;
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

const EmptyLink = styled.a`
  margin-right: 6px;
`;

function AgileCardPreview({ issueData }) {
  return <AgileCardDiv>
    <AgileCardSummaryDiv>
      <EmptyLink/>
      <SummarySpan>{issueData.summary}</SummarySpan>
    </AgileCardSummaryDiv>
  </AgileCardDiv>
}

AgileCardPreview.propTypes = {
  issueData: PropTypes.object
}

export default AgileCardPreview

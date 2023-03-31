import styled from 'styled-components';

import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';
import AgileCardPreview from '../AgileCardPreview';
import NewCardButton from '../NewCardButton';
import { useSelector } from 'react-redux';
import { selectSwimlanesDepth, selectSwimlanesMetadata } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import AgileBoardRows from './index';
import FakeTableCells from '../FakeTableCells';
import { useState } from 'react';
import {
  getDateSwimlanePeriod,
  getPredefinedDateValue,
  getSwimlanePeriodLabel
} from '../../features/customFields/dateFieldUtils';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';

const BorderedTd = styled.td`
  border-bottom: 1px solid var(--ring-line-color);
  border-right: 1px solid var(--ring-line-color);
  border-collapse: collapse;
  vertical-align: top;
  &:hover .new-card-button-action-text {
    display: inline;
  };
`;

const CollapsedIssue = styled.div`
  background-color: white;
  display: inline-block;
  width: calc(var(--ring-unit));
  height: calc(var(--ring-unit));
  margin: 2px;
  outline: 1px solid rgba(0, 0, 0, 0.1);
  ${props => props.bgColor ? `background-color: ${props.bgColor};` : ''}
`;

const makeEmptyOrphanRow = (emptyCells) => {
  return {
    $type: 'OrphanRow',
    cells: [...emptyCells],
    collapsed: false,
    id: 'orphans',
    matchesQuery: true,
    name: 'orphans',
    timeTrackingData: null,
  };
};

const makeEmptyTrimmedSwimlanes = (swimlane, emptyCells) => {
  return swimlane.values.map((value, index) => ({
    cells: emptyCells.map(cell => ({...cell, issues: [], issuesCount: 0})),
    collapsed: false,
    id: `${swimlane.id}-${index}`,
    matchesQuery: true,
    name: value.key,
    timeTrackingData: null,
    value: {
      presentation: swimlane.field?.dateType ? getSwimlanePeriodLabel(value.key, swimlane.field.presentation) : value.label,
    },
    isTag: swimlane.field?.id === 'tag',
    dateType: swimlane.field?.dateType,
    backgroundId: swimlane.enableColor ? value.colorId : null,
  }));
};

const makeIssueTrimmedSwimlane = (issue, value, swimlane, emptyCells) => ({
  cells: [...emptyCells],
  collapsed: false,
  id: `${swimlane.id}-${issue.id}`,
  matchesQuery: true,
  name: issue.key,
  timeTrackingData: null,
  issue: {
    summary: issue.summary,
    id: issue.id,
    idReadable: issue.idReadable,
    resolved: issue.resolved,
  },
  dateType: swimlane.field?.dateType,
  backgroundId: swimlane.enableColor ? value.color?.id : null,
});

function BoardRow({row, issuesDict, swimlaneTitle, level, isOrphan, colorField, system, visibleCardFields}) {
  // TODO: Optimize gettings swimlane by level
  const swimlanes = useSelector(selectSwimlanesMetadata);
  const nestedSwimlane = swimlanes.find(sl => sl.order === level + 1);
  const swimlanesDepth = useSelector(selectSwimlanesDepth);
  const columns = useSelector(selectColumnsMetadata);
  const [rollUp, setRollUp] = useState(!row.collapsed);

  const issuesCount = row.cells.reduce((acc, cell) => acc + cell.issues.length, 0);
  let swimlaneContent;
  if (!swimlanesDepth || swimlanesDepth === level + 1) {
    swimlaneContent = (<tr>
      <FakeTableCells/>
      {
        row.cells.map((cell, index) =>
          (<BorderedTd key={'cell-' + cell.id}>
            { !columns[index].collapsed
              ? (<div>
                  { cell.issues.map((c) => issuesDict && issuesDict[c.id]
                      ? <AgileCard issueData={issuesDict[c.id]} colorField={colorField} visibleFields={visibleCardFields} key={'agile-card-' + c.id}/>
                      : <AgileCardPreview issueData={c} key={'agile-card-' + c.id}/> )}
                  <NewCardButton/>
                </div>)
              : cell.issues.map((c) => {
                const issueData = issuesDict && issuesDict[c.id];
                const issueColor = colorField && issueData?.fields?.find(field => field.name === colorField)?.value?.color?.background;
                return (<CollapsedIssue bgColor={issueColor} key={'agile-card-' + c.id}/>);
              })}
          </BorderedTd>)
        )
      }
    </tr>);
  } else {
    const orphanRow = makeEmptyOrphanRow(row.cells.map(cell => ({...cell, issues: [], issuesCount: 0})));
    const trimmedSwimlanes = nestedSwimlane?.field && nestedSwimlane.values.length > 0 && nestedSwimlane.type === SwimlaneType.Values
      ? makeEmptyTrimmedSwimlanes(nestedSwimlane, row.cells) : [];
    let swimlaneFieldIndex = -1;
    row.cells.forEach((cell, index) => {
      if (!issuesDict) return;
      cell.issues?.forEach(issue => {
        const issueData = issuesDict[issue.id];
        swimlaneFieldIndex > -1 || (swimlaneFieldIndex = issueData?.fields
          .findIndex(field => field.name.toLowerCase() === nestedSwimlane?.field?.name?.toLowerCase()));
        const swimlaneFieldValue = issueData?.fields[swimlaneFieldIndex]?.value ||
          getPredefinedDateValue(issueData, nestedSwimlane?.field?.name);
        const issueTags = issueData?.tags.map(tag => tag.name);
        if (swimlaneFieldValue || issueTags) {
          const trimmedSwimlane = trimmedSwimlanes.find(smln => {
            return !smln.dateType
              ? smln.name === swimlaneFieldValue?.name || issueTags.includes(smln.name)
              : smln.name === getDateSwimlanePeriod(swimlaneFieldValue);
          });
          if (trimmedSwimlane) {
            const trimmedSwimlaneCell = trimmedSwimlane.cells[index];
            trimmedSwimlaneCell.issues.push(issue);
            trimmedSwimlaneCell.issuesCount++;
            return;
          } else {
            if (nestedSwimlane.values.findIndex(value => value.key === swimlaneFieldValue?.name) >= 0) {
              trimmedSwimlanes.push(makeIssueTrimmedSwimlane(issueData, swimlaneFieldValue, nestedSwimlane,
                row.cells.map(cell => ({...cell, issues: [], issuesCount: 0}))));
              return;
            }
          }
        }
        const orphanCell = orphanRow.cells[index];
        orphanCell.issues.push(issue);
        orphanCell.issuesCount++;
      })
    });

    swimlaneContent =
      (<AgileBoardRows orphanRow={orphanRow} level={level+1} colorField={colorField}
                       orphansAtTheTop={true} hideOrphansSwimlane={nestedSwimlane?.hideOrphansSwimlane}
                       trimmedSwimlanes={trimmedSwimlanes}/>)
  }
  return (<>
    { (swimlaneTitle || level === 0) && <Swimlane title={swimlaneTitle} issueId={row.issue?.idReadable}
                                                  striked={row.issue?.resolved > 0} cardsNumber={issuesCount}
                                                  isOrphan={isOrphan} columnsNumber={row.cells.length} isTag={row.isTag}
                                                  level={system ? -1 : level} backgroundId={row.backgroundId}
                                                  rollUp={rollUp} onRollUp={setRollUp} /> }
    { rollUp && swimlaneContent }
  </>);
}

BoardRow.propTypes = {
  row: PropTypes.object,
  issuesDict: PropTypes.object,
  swimlaneTitle: PropTypes.string,
  level: PropTypes.number,
  isOrphan: PropTypes.bool,
  colorField: PropTypes.string,
  system: PropTypes.bool,
  visibleCardFields: PropTypes.arrayOf(PropTypes.string),
}

export default BoardRow;

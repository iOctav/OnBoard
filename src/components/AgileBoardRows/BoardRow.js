import styled from 'styled-components';

import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';
import AgileCardPreview from '../AgileCardPreview';
import NewCardButton from '../NewCardButton';
import { useSelector } from 'react-redux';
import AgileBoardRows from './index';
import FakeTableCells from '../FakeTableCells';
import { useMemo, useState } from 'react';
import {
  getDateSwimlanePeriod,
  getPredefinedDateValue,
  getSwimlanePeriodLabel
} from '../../features/customFields/dateFieldUtils';
import { selectColumnsMetadata } from '../../features/sprint/sprintSlice';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';
import { useStateParams } from '../../hooks/useStateParams';
import AgileBoardCell from '../AgileBoardCell';

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

function BoardRow({agileId, sprintId, row, issuesDict, swimlaneTitle, level, isOrphan, colorField, system, visibleCardFields, currentSwimlanes}) {
  const [swimlanes] = useStateParams({}, 'nested-swimlanes', (s) => JSON.stringify(s), (s) => JSON.parse(s));
  const sortedSwimlanes = useMemo(() => {
    return Object.keys(swimlanes).map(key => swimlanes[key]).sort((a, b) => a.order - b.order);
  }, [swimlanes]);
  const nestedSwimlane = sortedSwimlanes[level+1];
  const swimlanesDepth = Object.keys(swimlanes).length;
  const columns = useSelector(selectColumnsMetadata);
  const [rollUp, setRollUp] = useState(!row.collapsed);

  const issuesCount = row.cells.reduce((acc, cell) => acc + cell.issues.length, 0);
  const swimlaneContent = useMemo(() => {
    if (!swimlanesDepth || swimlanesDepth === (level + 1)) {
      return (<tr>
        <FakeTableCells swimlanesDepth={swimlanesDepth}/>
        {
          row.cells.map((cell, index) =>
            (<BorderedTd key={'cell-' + cell.id}>
              { !columns[index]?.collapsed
                ? (<AgileBoardCell key={ 'agile-cell-' + cell.id }
                                   agileId={agileId}
                                   sprintId={sprintId}
                                   columnFieldId={columns[index]?.agileColumn.parent.field.name}
                                   swimlanes={currentSwimlanes}
                                   columnName={ columns[index]?.agileColumn.fieldValues[0].name }
                                   issuesDict={issuesDict}>
                  { cell.issues.map((c) => issuesDict && issuesDict[c.id]
                    ? <AgileCard issueData={issuesDict[c.id]} colorField={colorField} visibleFields={visibleCardFields} key={'agile-card-' + c.id}/>
                    : <AgileCardPreview issueData={c} key={'agile-card-' + c.id}/> )}
                  <NewCardButton/>
                </AgileBoardCell>)
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
              if (nestedSwimlane?.values.findIndex(value => value.key === swimlaneFieldValue?.name) >= 0) {
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

      trimmedSwimlanes && trimmedSwimlanes.filter(ts => ts.issue).forEach(trimmedSwimlane => {
        const issueData = issuesDict[trimmedSwimlane.issue.id];
        if (issueData.subtasks?.issues?.length > 0) {
          issueData.subtasks.issues.forEach(subtask => {
            orphanRow.cells.forEach((cell, index) => {
              const subtaskIndex = cell.issues.findIndex(issue => issue.id === subtask.id);
              if (subtaskIndex >= 0) {
                cell.issues.splice(subtaskIndex, 1);
                cell.issuesCount--;
                trimmedSwimlane.cells[index].issues.push(subtask);
                trimmedSwimlane.cells[index].issuesCount++;
              }
            });
          });
        }
      });

      return (<AgileBoardRows agileId={agileId} sprintId={sprintId} orphanRow={orphanRow} level={level+1}
                         colorField={colorField} visibleCardFields={visibleCardFields} swimlaneFieldName={nestedSwimlane.field.name}
                         orphansAtTheTop={true} hideOrphansSwimlane={nestedSwimlane?.hideOrphansSwimlane} currentSwimlanes={currentSwimlanes}
                         trimmedSwimlanes={trimmedSwimlanes} issuesDict={issuesDict}/>);
    }    
  }, [swimlanesDepth, level, row.cells, agileId, sprintId, issuesDict, colorField, visibleCardFields, nestedSwimlane, columns])

  return (<>
    { (swimlaneTitle || level === 0) && <Swimlane title={swimlaneTitle} issueId={row.issue?.idReadable}
                                                  striked={row.issue?.resolved > 0} cardsNumber={issuesCount}
                                                  isOrphan={isOrphan} columnsNumber={row.cells.length} isTag={row.isTag}
                                                  level={system ? -1 : (currentSwimlanes.length - 1)} backgroundId={row.backgroundId}
                                                  rollUp={rollUp} onRollUp={setRollUp} swimlanesDepth={swimlanesDepth} /> }
    { rollUp && swimlaneContent }
  </>);
}

BoardRow.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  row: PropTypes.object,
  issuesDict: PropTypes.object,
  swimlaneTitle: PropTypes.string,
  level: PropTypes.number,
  isOrphan: PropTypes.bool,
  colorField: PropTypes.string,
  system: PropTypes.bool,
  visibleCardFields: PropTypes.arrayOf(PropTypes.string),
  customFieldName: PropTypes.string,
  currentSwimlanes: PropTypes.arrayOf(PropTypes.shape({
    swimlaneFieldlId: PropTypes.string,
    swimlaneName: PropTypes.string,
  })),
}

export default BoardRow;

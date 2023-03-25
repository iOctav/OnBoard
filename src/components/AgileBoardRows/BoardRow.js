import styled from 'styled-components';

import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';
import AgileCardPreview from '../AgileCardPreview';
import NewCardButton from '../NewCardButton';
import { useSelector } from 'react-redux';
import {
  selectSwimlaneMetadataById, selectSwimlanesDepth
} from '../../features/nestedSwimlanes/nestedSwimlanesSlice';
import AgileBoardRows from './index';
import FakeTableCells from '../FakeTableCells';

const BorderedTd = styled.td`
  border-bottom: 1px solid var(--ring-line-color);
  border-right: 1px solid var(--ring-line-color);
  border-collapse: collapse;
  vertical-align: top;
  &:hover .new-card-button-action-text {
    display: inline;
  };
`;

const makeEmptyOrphanRow = () => {
  return {
    $type: 'OrphanRow',
    cells: [],
    collapsed: false,
    id: 'orphans',
    matchesQuery: true,
    name: 'orphans',
    timeTrackingData: null,
  };
};

const makeEmptyTrimmedSwimlanes = (swimlane) => {
  return swimlane.values.map((value, index) => ({
    cells: [],
    collapsed: false,
    id: `${swimlane.id}-${index}`,
    matchesQuery: true,
    name: value.name,
    timeTrackingData: null,
    value: {
      presentation: value.name,
    },
  }));
};

function BoardRow({row, issuesDict, swimlaneTitle, level}) {
  const swimlane = useSelector((state) => selectSwimlaneMetadataById(state, level + 1));
  const swimlanesDepth = useSelector(selectSwimlanesDepth);

  const issuesCount = row.cells.reduce((acc, cell) => acc + cell.issues.length, 0);
  let swimlaneContent;
  if (!swimlanesDepth || swimlanesDepth === level + 1) {
    swimlaneContent = (<tr>
      <FakeTableCells/>
      {
        row.cells.map(cell =>
          <BorderedTd key={'cell-' + cell.id}>
            {
              cell.issues.map((c) => issuesDict && issuesDict[c.id]
                ? <AgileCard issueData={issuesDict[c.id]} key={'agile-card-' + c.id}/>
                : <AgileCardPreview issueData={c} key={'agile-card-' + c.id}/> )
            }
            <NewCardButton/>
          </BorderedTd>
        )
      }
    </tr>);
  } else {
    const orphanRow = makeEmptyOrphanRow();
    const trimmedSwimlanes = swimlane.field && swimlane.values.length > 0 ? makeEmptyTrimmedSwimlanes(swimlane) : [];
    let swimlaneFieldIndex = -1;
    row.cells.forEach(cell => {
      orphanRow.cells.push({...cell, issues: [], issuesCount: 0});
      trimmedSwimlanes.forEach(swimlane => swimlane.cells.push({...cell, issues: [], issuesCount: 0}));
      cell.issues?.forEach(issue => {
        const issueData = issuesDict[issue.id];
        swimlaneFieldIndex > -1 || (swimlaneFieldIndex = issueData?.fields
          .findIndex(field => field.name.toLowerCase() === swimlane?.field?.name?.toLowerCase()));
        const swimlaneFieldValue = issueData?.fields[swimlaneFieldIndex]?.value;
        if (swimlaneFieldValue) {
          const trimmedSwimlane = trimmedSwimlanes.find(nestedSwimlane => nestedSwimlane.name === swimlaneFieldValue.name);
          if (trimmedSwimlane) {
            const trimmedSwimlaneCell = trimmedSwimlane.cells.slice(-1)[0];
            trimmedSwimlaneCell.issues.push(issue);
            trimmedSwimlaneCell.issuesCount++;
            return;
          }
        }
        const orphanCell = orphanRow.cells.slice(-1)[0];
        orphanCell.issues.push(issue);
        orphanCell.issuesCount++;
      })
    });

    swimlaneContent =
      (<AgileBoardRows orphanRow={orphanRow} level={level+1} orphansAtTheTop={true} hideOrphansSwimlane={false} trimmedSwimlanes={trimmedSwimlanes}/>)
  }
  return (<>
    { (swimlaneTitle || level === 0) && <Swimlane title={swimlaneTitle} cardsNumber={issuesCount} columnsNumber={row.cells.length} level={level}/> }
    { swimlaneContent }
  </>);
}

BoardRow.propTypes = {
  row: PropTypes.object,
  issuesDict: PropTypes.object,
  swimlaneTitle: PropTypes.string,
  level: PropTypes.number,
}

export default BoardRow;

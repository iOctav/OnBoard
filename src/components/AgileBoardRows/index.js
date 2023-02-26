import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';
import { useGetIssuesQuery } from '../../store/youtrackApi';
import AgileCardPreview from '../AgileCardPreview';

function makeAgileRow(row, issuesDict, swimlaneTitle = undefined) {
  const issuesCount = row.cells.reduce((acc, cell) => acc + cell.issues.length, 0);
  return (
    <tbody key={'categorized-row-' + row.id}>
    { !!swimlaneTitle &&
      <Swimlane title={swimlaneTitle} cardsNumber={issuesCount} ></Swimlane> }
    <tr>
      {
        row.cells.map(cell =>
          <td key={'cell-' + cell.id}>
            {
              cell.issues.map((c) => issuesDict
                ? <AgileCard issueData={issuesDict[c.id]} key={'agile-card-' + c.id}/>
                : <AgileCardPreview issueData={c} key={'agile-card-' + c.id}/> )
            }
          </td>
        )
      }
    </tr>
    </tbody>
  );
}

function AgileBoardRows({orphanRow, trimmedSwimlanes, hideOrphansSwimlane, orphansAtTheTop}) {
  let content;
  let issuesDict;

  // TODO: refactor this calculation
  const issueIds = [orphanRow, ...trimmedSwimlanes]
    .reduce((acc1, row) =>
      [...acc1, ...(row.cells.reduce((acc1, cell) =>
        [...acc1, ...cell.issues.reduce((acc2, issue) => [...acc2, issue.id], [])], [])),[]],
      [])
    .filter(id => !(id instanceof Array));

  const { data: issues,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetIssuesQuery(issueIds);

  if (isLoading) {
  } else if (isSuccess) {
    issuesDict = Object.fromEntries(issues.map(issue => [issue.id, issue]));
  } else if (isError) {
  }

  const swimlanesAgileRow = trimmedSwimlanes.map(row => makeAgileRow(row, issuesDict, row.value.presentation))
  if (hideOrphansSwimlane) {
    content = swimlanesAgileRow
  } else {
    const orphanAgileRow = makeAgileRow(orphanRow, issuesDict, 'Uncategorized Cards')
    if (orphansAtTheTop) {
      content = [orphanAgileRow, ...swimlanesAgileRow];
    } else {
      content = [...swimlanesAgileRow, orphanAgileRow];
    }
  }
  return content;
}

AgileBoardRows.propTypes = {
  orphanRow: PropTypes.object,
  trimmedSwimlanes: PropTypes.arrayOf(PropTypes.object),
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool
}

export default AgileBoardRows



export const getChangedProperty = (propertiesUpdaties, propertyType) => {
  const propertyUpdate = propertiesUpdaties.find(property => property.type === propertyType);
  return { isChanged: !!propertyUpdate, value: propertyUpdate?.value?.name };
}

export const removeIssueFromTheSprintBoard = (board, issueId) => {
  let columnIndex = 0;
  let swimlaneIndex = -1;
  for (let swmIndex = 0; swmIndex < (board.trimmedSwimlanes.length || 1); swmIndex++) {
    let prevIndex = -1;
    for (let i = 0; i < board.orphanRow.cells.length; i++) {
      prevIndex = board.orphanRow.cells[i].issues.findIndex(issue => issue.id === issueId);
      if (prevIndex !== -1) {
        columnIndex = i;
        board.orphanRow.cells[i].issues.splice(prevIndex, 1);
        break;
      }
      if (board.trimmedSwimlanes.length > 0) {
        prevIndex = board.trimmedSwimlanes[swmIndex].cells[i].issues.findIndex(issue => issue.id === issueId);
        if (prevIndex !== -1) {
          columnIndex = i;
          swimlaneIndex = swmIndex;
          board.trimmedSwimlanes[swmIndex].cells[i].issues.splice(prevIndex, 1);
          break;
        }
      }
    }
    if (prevIndex !== -1) {
      break;
    }
  }
  return { columnIndex, swimlaneIndex };
};

export const insertIssueToTheSprintBoard = (board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex,
                                            swimlaneIndex, issueColumnName, issueSwimlaneName) => {
  if (isColumnChanged) {
    columnIndex = board.columns.findIndex(column => column.agileColumn.fieldValues[0].name.toLowerCase() === issueColumnName.toLowerCase());
    if (!isSwimlaneChanged) {
      if (swimlaneIndex === -1) {
        board.orphanRow.cells[columnIndex].issues.push({ id: issueId });
      } else {
        board.trimmedSwimlanes[swimlaneIndex].cells[columnIndex].issues.push({ id: issueId });
      }
      return;
    }
  }
  if (isSwimlaneChanged && board.trimmedSwimlanes.length) {
    if (!issueSwimlaneName) {
      board.orphanRow.cells[columnIndex].issues.push({ id: issueId });
      return;
    }
    for (const swimlane of board.trimmedSwimlanes) {
      if (swimlane.name === issueSwimlaneName) {
        swimlane.cells[columnIndex].issues.push({ id: issueId });
        return;
      }
    }
  }
}

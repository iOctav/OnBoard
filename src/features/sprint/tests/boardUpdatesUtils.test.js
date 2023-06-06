import {
  getChangedProperty,
  removeIssueFromTheSprintBoard,
  insertIssueToTheSprintBoard
} from '../boardUpdatesUtils';

describe('getChangedProperty', () => {
  it('should return isChanged as true and value when propertyType is found', () => {
    const propertiesUpdaties = [
      { type: 'type1', value: { name: 'value1' } },
      { type: 'type2', value: { name: 'value2' } },
      { type: 'type3', value: { name: 'value3' } },
    ];
    const propertyType = 'type2';

    const result = getChangedProperty(propertiesUpdaties, propertyType);
    expect(result).toEqual({ isChanged: true, value: 'value2' });
  });

  it('should return isChanged as false and value as undefined when propertyType is not found', () => {
    const propertiesUpdaties = [
      { type: 'type1', value: { name: 'value1' } },
      { type: 'type2', value: { name: 'value2' } },
      { type: 'type3', value: { name: 'value3' } },
    ];
    const propertyType = 'type4';

    const result = getChangedProperty(propertiesUpdaties, propertyType);
    expect(result).toEqual({ isChanged: false, value: undefined });
  });

  it('should return isChanged as false and value as undefined when propertiesUpdaties is empty', () => {
    const propertiesUpdaties = [];
    const propertyType = 'type1';

    const result = getChangedProperty(propertiesUpdaties, propertyType);
    expect(result).toEqual({ isChanged: false, value: undefined });
  });
});

describe('removeIssueFromTheSprintBoard', () => {
  it('should remove the issue from orphanRow and return columnIndex and swimlaneIndex', () => {
    const board = {
      trimmedSwimlanes: [],
      orphanRow: {
        cells: [
          { issues: [{ id: '1' }] },
          { issues: [{ id: '2' }] },
        ],
      },
    };
    const issueId = '1';

    const result = removeIssueFromTheSprintBoard(board, issueId);
    expect(result).toEqual({ columnIndex: 0, swimlaneIndex: -1 });
    expect(board.orphanRow.cells[0].issues).toEqual([]);
  });

  it('should remove the issue from trimmedSwimlanes and return columnIndex and swimlaneIndex', () => {
    const board = {
      trimmedSwimlanes: [
        {
          cells: [
            { issues: [{ id: '1' }] },
            { issues: [{ id: '2' }] },
          ],
        },
      ],
      orphanRow: { cells: [] },
    };
    const issueId = '2';

    const result = removeIssueFromTheSprintBoard(board, issueId);
    expect(result).toEqual({ columnIndex: 0, swimlaneIndex: -1 });
    expect(board.trimmedSwimlanes[0].cells[1].issues).toEqual([{
      id: '2',
    }]);
  });

  it('should return columnIndex as 0 and swimlaneIndex as -1 when the issue is not found', () => {
    const board = {
      trimmedSwimlanes: [],
      orphanRow: { cells: [] },
    };
    const issueId = '1';

    const result = removeIssueFromTheSprintBoard(board, issueId);
    expect(result).toEqual({ columnIndex: 0, swimlaneIndex: -1 });
  });

  it('should return columnIndex as 0 and swimlaneIndex as -1 when orphanRow is empty', () => {
    const board = {
      trimmedSwimlanes: [
        {
          cells: [
            { issues: [{ id: '1' }] },
            { issues: [{ id: '2' }] },
          ],
        },
      ],
      orphanRow: { cells: [] },
    };
    const issueId = '3';

    const result = removeIssueFromTheSprintBoard(board, issueId);
    expect(result).toEqual({ columnIndex: 0, swimlaneIndex: -1 });
  });

  it('should return columnIndex as 0 and swimlaneIndex as -1 when trimmedSwimlanes is empty', () => {
    const board = {
      trimmedSwimlanes: [],
      orphanRow: {
        cells: [
          { issues: [{ id: '1' }] },
          { issues: [{ id: '2' }] },
        ],
      },
    };
    const issueId = '3';

    const result = removeIssueFromTheSprintBoard(board, issueId);
    expect(result).toEqual({ columnIndex: 0, swimlaneIndex: -1 });
  });

  it('should not remove any issue when orphanRow and trimmedSwimlanes do not contain the issueId', () => {
    const board = {
      trimmedSwimlanes: [
        {
          cells: [
            { issues: [{ id: '1' }] },
            { issues: [{ id: '2' }] },
          ],
        },
      ],
      orphanRow: {
        cells: [
          { issues: [{ id: '4' }] },
          { issues: [{ id: '5' }] },
        ],
      },
    };
    const issueId = '3';

    const result = removeIssueFromTheSprintBoard(board, issueId);
    expect(result).toEqual({ columnIndex: 0, swimlaneIndex: -1 });
    // Check that issues were not removed
    expect(board.orphanRow.cells[0].issues).toEqual([{ id: '4' }]);
    expect(board.orphanRow.cells[1].issues).toEqual([{ id: '5' }]);
    expect(board.trimmedSwimlanes[0].cells[0].issues).toEqual([{ id: '1' }]);
    expect(board.trimmedSwimlanes[0].cells[1].issues).toEqual([{ id: '2' }]);
  });
});

describe('insertIssueToTheSprintBoard', () => {
  it('should insert the issue into the column in orphanRow when isColumnChanged is true and swimlaneIndex is -1', () => {
    const board = {
      columns: [
        { agileColumn: { fieldValues: [{ name: 'ColumnName' }] } },
        { agileColumn: { fieldValues: [{ name: 'AnotherColumnName' }] } },
      ],
      trimmedSwimlanes: [],
      orphanRow: { cells: [{ issues: [] }, { issues: [] }] },
    };
    const issueId = '1';
    const isColumnChanged = true;
    const isSwimlaneChanged = false;
    const columnIndex = 0;
    const swimlaneIndex = -1;
    const issueColumnName = 'ColumnName';
    const issueSwimlaneName = null;

    insertIssueToTheSprintBoard(board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex,
      swimlaneIndex, issueColumnName, issueSwimlaneName);
    expect(board.orphanRow.cells[0].issues).toEqual([{ id: '1' }]);
  });

  it('should insert the issue into the swimlane in trimmedSwimlanes when isColumnChanged is true and swimlaneIndex is not -1', () => {
    const board = {
      columns: [
        { agileColumn: { fieldValues: [{ name: 'ColumnName' }] } },
        { agileColumn: { fieldValues: [{ name: 'AnotherColumnName' }] } },
      ],
      trimmedSwimlanes: [
        { name: 'SwimlaneName', cells: [{ issues: [] }, { issues: [] }] },
        { name: 'AnotherSwimlaneName', cells: [{ issues: [] }, { issues: [] }] },
      ],
      orphanRow: { cells: [{ issues: [] }, { issues: [] }] },
    };
    const issueId = '1';
    const isColumnChanged = true;
    const isSwimlaneChanged = false;
    const columnIndex = 0;
    const swimlaneIndex = 0;
    const issueColumnName = 'ColumnName';
    const issueSwimlaneName = 'SwimlaneName';

    insertIssueToTheSprintBoard(board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex,
      swimlaneIndex, issueColumnName, issueSwimlaneName);
    expect(board.trimmedSwimlanes[0].cells[0].issues).toEqual([{ id: '1' }]);
  });

  it('should insert the issue into orphanRow when isSwimlaneChanged is true and issueSwimlaneName is null or trimmedSwimlanes is empty', () => {
    const board = {
      columns: [
        { agileColumn: { fieldValues: [{ name: 'ColumnName' }] } },
        { agileColumn: { fieldValues: [{ name: 'AnotherColumnName' }] } },
      ],
      trimmedSwimlanes: [],
      orphanRow: { cells: [{ issues: [] }, { issues: [] }] },
    };
    const issueId = '1';
    const isColumnChanged = false;
    const isSwimlaneChanged = true;
    const columnIndex = 0;
    const swimlaneIndex = -1;
    const issueColumnName = 'ColumnName';
    const issueSwimlaneName = null;

    insertIssueToTheSprintBoard(board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex,
      swimlaneIndex, issueColumnName, issueSwimlaneName);
    expect(board.orphanRow.cells[0].issues).toEqual([{ id: '1' }]);
  });

  it('should insert the issue into the matching swimlane when isSwimlaneChanged is true and the swimlane exists', () => {
    const board = {
      columns: [
        { agileColumn: { fieldValues: [{ name: 'ColumnName' }] } },
        { agileColumn: { fieldValues: [{ name: 'AnotherColumnName' }] } },
      ],
      trimmedSwimlanes: [
        { name: 'SwimlaneName', cells: [{ issues: [] }, { issues: [] }] },
        { name: 'AnotherSwimlaneName', cells: [{ issues: [] }, { issues: [] }] },
      ],
      orphanRow: { cells: [{ issues: [] }, { issues: [] }] },
    };
    const issueId = '1';
    const isColumnChanged = false;
    const isSwimlaneChanged = true;
    const columnIndex = 0;
    const swimlaneIndex = -1;
    const issueColumnName = 'ColumnName';
    const issueSwimlaneName = 'SwimlaneName';

    insertIssueToTheSprintBoard(board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex,
      swimlaneIndex, issueColumnName, issueSwimlaneName);
    expect(board.trimmedSwimlanes[0].cells[0].issues).toEqual([{ id: '1' }]);
  });

  it('should not insert the issue when isSwimlaneChanged is true but the swimlane name does not match', () => {
    const board = {
      columns: [],
      trimmedSwimlanes: [
        { name: 'AnotherSwimlaneName', cells: [{ issues: [] }, { issues: [] }] },
        { name: 'DifferentSwimlaneName', cells: [{ issues: [] }, { issues: [] }] },
      ],
      orphanRow: { cells: [{ issues: [] }, { issues: [] }] },
    };
    const issueId = '1';
    const isColumnChanged = false;
    const isSwimlaneChanged = true;
    const columnIndex = 0;
    const swimlaneIndex = -1;
    const issueColumnName = 'ColumnName';
    const issueSwimlaneName = 'SwimlaneName';

    insertIssueToTheSprintBoard(board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex,
      swimlaneIndex, issueColumnName, issueSwimlaneName);
    expect(board.orphanRow.cells[0].issues).toEqual([]);
    expect(board.orphanRow.cells[1].issues).toEqual([]);
    expect(board.trimmedSwimlanes[0].cells[0].issues).toEqual([]);
    expect(board.trimmedSwimlanes[0].cells[1].issues).toEqual([]);
    expect(board.trimmedSwimlanes[1].cells[0].issues).toEqual([]);
    expect(board.trimmedSwimlanes[1].cells[1].issues).toEqual([]);
  });
});

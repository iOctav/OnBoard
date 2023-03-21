import {
  createSelector
} from '@reduxjs/toolkit'
import { youtrackApi } from '../../app/services/youtrackApi';

export const selectSprintResult = youtrackApi.endpoints.getSpecificSprintForSpecificAgile.select({agileId: '131-2', sprintId: '132-4'});

const emptyBoard = {};

export const selectBoardData = createSelector(
  selectSprintResult,
  sprintResult => sprintResult?.data.board ?? emptyBoard
)

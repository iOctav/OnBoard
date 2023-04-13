import { youtrackApi } from '../../app/services/youtrackApi';
import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { PropertyUpdateType } from './propertyUpdateType';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    getSpecificSprintForSpecificAgile: builder.query({
      query: ({ agileId, sprintId }) => ({
        url: `agiles/${agileId}/sprints/${sprintId}`,
        params: {
          fields: 'id,$type,board(columns(agileColumn(collapsed,color($type,id),fieldValues(canUpdate,column(id),id,isResolved,name,ordinal,presentation),presentation,id,isResolved,isVisible,ordinal,parent($type,id,field(name)),wipLimit($type,max,min)),collapsed,id,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime)),id,name,notOnBoardCount,notOnBoardIssues(idReadable),orphanRow($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id))),sortByQuery,sprint,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),tooManyIssues,trimmedSwimlanes($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id))))',
        },
      }),
      providesTags: ['Sprint'],

    }),
    // MUTATIONS
    updateIssueField: builder.mutation({
      async queryFn(cardMove, _queryApi, _extraOptions, baseQuery) {
        for (const propertyUpdate of cardMove.propertiesUpdates) {
          await baseQuery({
            url: `issues/${cardMove.issueId}/fields/${propertyUpdate.fieldId}`,
            method: 'POST',
            body: { value: propertyUpdate.value },
            params: {
              fields: '$type, id',
              muteUpdateNotifications: true,
            }
          });
        }
        return { data: cardMove.issueId };
      },
      async onQueryStarted({ agileId, sprintId, issueId, propertiesUpdates }, { dispatch, queryFulfilled }) {
        dispatch(
          extendedYoutrackApi.util.updateQueryData('getSpecificSprintForSpecificAgile', { agileId, sprintId }, (draft) => {
            let columnIndex = 0;
            let swimlaneIndex = -1;
            const issueSwimlaneName = propertiesUpdates.find(update => update.type === PropertyUpdateType.Swimlane)?.value.name;
            const issueColumnName = propertiesUpdates.find(update => update.type === PropertyUpdateType.Column)?.value.name;
            for (let swmIndex = 0; swmIndex < (draft.board.trimmedSwimlanes.length || 1); swmIndex++) {
              let prevIndex = -1;
              for (let i = 0; i < draft.board.orphanRow.cells.length; i++) {
                prevIndex = draft.board.orphanRow.cells[i].issues.findIndex(issue => issue.id === issueId);
                if (prevIndex !== -1) {
                  columnIndex = i;
                  draft.board.orphanRow.cells[i].issues.splice(prevIndex, 1);
                  break;
                }
                if (draft.board.trimmedSwimlanes.length > 0) {
                  prevIndex = draft.board.trimmedSwimlanes[swmIndex].cells[i].issues.findIndex(issue => issue.id === issueId);
                  if (prevIndex !== -1) {
                    columnIndex = i;
                    swimlaneIndex = swmIndex;
                    draft.board.trimmedSwimlanes[swmIndex].cells[i].issues.splice(prevIndex, 1);
                    break;
                  }
                }
              }
              if (prevIndex !== -1) {
                break;
              }
            }
            if (issueColumnName) {
              columnIndex = draft.board.columns.findIndex(column => column.agileColumn.fieldValues[0].name.toLowerCase() === issueColumnName.toLowerCase());
              if (!issueSwimlaneName) {
                if (swimlaneIndex === -1) {
                  draft.board.orphanRow.cells[columnIndex].issues.push({ id: issueId });
                } else {
                  draft.board.trimmedSwimlanes[swimlaneIndex].cells[columnIndex].issues.push({ id: issueId });
                }
                return;
              }
            }
            if (issueSwimlaneName && draft.board.trimmedSwimlanes.length) {
              for (const swimlane of draft.board.trimmedSwimlanes) {
                if (swimlane.name === issueSwimlaneName) {
                  swimlane.cells[columnIndex].issues.push({ id: issueId });
                }
              }
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          dispatch(extendedYoutrackApi.util.invalidateTags(['Sprint']))
        }
      },
      invalidatesTags: ['Sprint'],
    }),
  })
})

export const { useGetSpecificSprintForSpecificAgileQuery, useUpdateIssueFieldMutation } = extendedYoutrackApi;

const columnsAdapter = createEntityAdapter();

const matchASprintUpdated = isAnyOf(
  extendedYoutrackApi.endpoints.getSpecificSprintForSpecificAgile.matchFulfilled
)

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    updateColumn: columnsAdapter.updateOne,
  },
  extraReducers(builder) {
    builder.addMatcher(matchASprintUpdated, (state, action) => {
      columnsAdapter.removeAll(state);
      if (action.payload.board?.columns) {
        columnsAdapter.upsertMany(state, action.payload.board.columns.map((col, index) => ({...col, id: index})));
      }
    });
  },
});

export const { updateColumn } = columnsSlice.actions

export default columnsSlice.reducer;

export const {
  selectAll: selectColumnsMetadata,
} = columnsAdapter.getSelectors((state) => state.columns);

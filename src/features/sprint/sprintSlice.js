import { youtrackApi } from '../../app/services/youtrackApi';
import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { PropertyUpdateType } from './propertyUpdateType';
import { getChangedProperty, insertIssueToTheSprintBoard, removeIssueFromTheSprintBoard } from './boardUpdatesUtils';

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
        return { data: cardMove.propertiesUpdates.length > 0 ? cardMove.issueId : null };
      },
      async onQueryStarted({ agileId, sprintId, issueId, propertiesUpdates }, { dispatch, queryFulfilled }) {
        dispatch(
          extendedYoutrackApi.util.updateQueryData('getSpecificSprintForSpecificAgile', { agileId, sprintId }, (draft) => {
            const { isChanged: isColumnChanged, value: issueColumnName } = getChangedProperty(propertiesUpdates, PropertyUpdateType.Column);
            const { isChanged: isSwimlaneChanged, value: issueSwimlaneName } = getChangedProperty(propertiesUpdates, PropertyUpdateType.Swimlane);
            if (!isColumnChanged && !isSwimlaneChanged) {
              return;
            }
            let { columnIndex, swimlaneIndex } = removeIssueFromTheSprintBoard(draft.board, issueId);
            insertIssueToTheSprintBoard(draft.board, issueId, isColumnChanged, isSwimlaneChanged, columnIndex, swimlaneIndex, issueColumnName, issueSwimlaneName);
          })
        )
        try {
          await queryFulfilled
        } catch {
          dispatch(extendedYoutrackApi.util.invalidateTags(['Sprint']))
        }
      },
      // invalidatesTags: ['Sprint']
      invalidatesTags: (result, error, arg) => result ? ['Sprint'] : [],
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

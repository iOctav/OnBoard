import { youtrackApi } from '../../app/services/youtrackApi';
import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { PropertyUpdateType } from './propertyUpdateType';
import { getChangedProperty, insertIssueToTheSprintBoard, removeIssueFromTheSprintBoard } from './boardUpdatesUtils';

import alertService from '@jetbrains/ring-ui/dist/alert-service/alert-service';

const issuesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.idReadable.localeCompare(b.idReadable),
})

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
    getSubtasksIssues: builder.query({
      query: ({issueId, linkId}) => ({
        url: `issues/${issueId}/links/${linkId}/issues`,
        params: {
          fields: '$type,id,idReadable,isDraft,numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),resolved,summary',
        },
      })
    }),
    getIssues: builder.query({
      query: (ids) => ({
        url: `issuesGetter`,
        method: 'POST',
        body: ids.map(id => ({ id: id })),
        params: {
          fields: 'attachments(id),fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,summary,isDraft,numberInProject,project($type,archived,id,name,plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId,shortName),reporter($type,id,login,ringId),created,updated,resolved,subtasks(id,issuesSize,issues(id,summary),unresolvedIssuesSize),tags(id,name,color(id))',
          top: -1,
          topLinks: 3,
        },
      }),
      transformResponse(response) {
        return issuesAdapter.addMany(issuesAdapter.getInitialState(), response)
      },
      providesTags: ['Sprint']
    }),
    getIssuesByAgileSprint: builder.query({
      async queryFn(issueIds, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `issuesGetter`,
          method: 'POST',
          body: issueIds.map(id => ({ id: id })),
          params: {
            fields: 'attachments(id),fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,summary,isDraft,numberInProject,project($type,archived,id,name,plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId,shortName),reporter($type,id,login,ringId),created,updated,resolved,subtasks(id,issuesSize,issues(id,summary),unresolvedIssuesSize),tags(id,name,color(id))',
            top: -1,
            topLinks: 3,
          },
        });
        return { ...result, data: issuesAdapter.addMany(issuesAdapter.getInitialState(), result.data) };
      },
      providesTags: ['Sprint'],
    }),
    // MUTATIONS
    updateIssueField: builder.mutation({
      async queryFn(cardMove, _queryApi, _extraOptions, baseQuery) {
        for (const propertyUpdate of cardMove.propertiesUpdates) {
          const result = await baseQuery({
            url: `issues/${cardMove.issueId}/fields/${propertyUpdate.fieldId}`,
            method: 'POST',
            body: { value: propertyUpdate.value },
            params: {
              fields: '$type, id',
              muteUpdateNotifications: false,
            }
          });
          if (result.error) {
            let errorMessage;
            if (!propertyUpdate.value) {
              errorMessage = `The board settings do not let you add issues to the swimlane for uncategorized cards. 
              All of the available values that are stored in the State field are used as swimlanes on the board.
               Add the card to a swimlane or modify the swimlane settings for the board.`;
            } else {
              errorMessage = `Failed to update ${propertyUpdate.fieldId} field to ${propertyUpdate.value.name} for issue ${cardMove.issueId}`;
            }
            alertService.error(errorMessage, 5000);
          }
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
        dispatch(
          extendedYoutrackApi.util.updateQueryData('getIssuesByAgileSprint', { agileId, sprintId }, (draft) => {
            for (const propertyUpdate of propertiesUpdates) {
              const issue = draft.entities[issueId];
              const issueProperty = issue.fields.find(field => field.name.toLowerCase() === propertyUpdate.fieldId.toLowerCase());
              if (issueProperty) {
                if (propertyUpdate.value === null) {
                  issueProperty.value = null;
                } else {
                  issueProperty.value = {...issueProperty.value, name: propertyUpdate.value?.name, color: undefined};
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

export const { useGetSpecificSprintForSpecificAgileQuery, useGetIssuesQuery, useUpdateIssueFieldMutation,
  useGetIssuesByAgileSprintQuery, useLazyGetSubtasksIssuesQuery } = extendedYoutrackApi;

export const selectCurrentSprint = (state, args) => extendedYoutrackApi.endpoints.getSpecificSprintForSpecificAgile.select(args)(state);


export const {
  selectAll: selectAllIssues,
  selectById: selectIssueById,
} = issuesAdapter.getSelectors()

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

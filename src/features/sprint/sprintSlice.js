import { youtrackApi } from '../../app/services/youtrackApi';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    getSpecificSprintForSpecificAgile: builder.query({
      query: ({agileId, sprintId}) => ({
        url: `agiles/${agileId}/sprints/${sprintId}`,
        params: {
          fields: 'id,$type,board(columns(agileColumn(collapsed,color($type,id),fieldValues(canUpdate,column(id),id,isResolved,name,ordinal,presentation),presentation,id,isResolved,isVisible,ordinal,parent($type,id),wipLimit($type,max,min)),collapsed,id,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime)),id,name,notOnBoardCount,notOnBoardIssues(idReadable),orphanRow($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id))),sortByQuery,sprint,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),tooManyIssues,trimmedSwimlanes($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id))))',
        },
      }),
      providesTags: ['Board'],
    }),
  })
})

export const { useGetSpecificSprintForSpecificAgileQuery } = extendedYoutrackApi


// export const selectSprintResult = (state, agileId, sprintId) => {
//   return extendedYoutrackApi.endpoints.getSpecificSprintForSpecificAgile.select({agileId: agileId, sprintId: sprintId});
// }


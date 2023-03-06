import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { trimLastSlash } from '../utils/uriUtils';

export const youtrackApi = createApi({
  reducerPath: 'youtrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: trimLastSlash(process.env.REACT_APP_YOUTRACK_BASE_URL)  + '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getAgilesById: builder.query({
      query: (id) => ({
        url: `agiles/${id}`,
        params: {
          fields: 'id,name,owner(id,name,login),projects(id,name),sprints(id,name),visibleFor(name,id),visibleForProjectBased,updateableBy(id,name),updateableByProjectBased,hideOrphansSwimlane,orphansAtTheTop,currentSprint(id,name,issues(id,idReadable,visibility,summary,externalIssue(name),customFields(id,name,value(id,name)))),columnSettings(field(id,name),columns(presentation,isResolved,fieldValues(id,name))),cardSettings(fields(field(fieldDefaults(bundle(id,isUpdateable,values(id,name))),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,presentation(id))),swimlaneSettings($type,defaultCardType(id,name),enabled,field(customField(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,instant,multiValue,name,presentation),id,values(id,isResolved,name,presentation,value))',
        },
      })
    }),
    getCurrentSprintForSpecificAgile: builder.query({
      query: (id) => ({
        url: `agiles/${id}/sprints/current`,
        params: {
          fields: 'agile(hideOrphansSwimlane,id,name,orphansAtTheTop,status(errors,valid,warnings)),archived,board(columns(agileColumn(collapsed,color($type,id),fieldValues(canUpdate,column(id),id,isResolved,name,ordinal,presentation),presentation,id,isResolved,isVisible,ordinal,parent($type,id),wipLimit($type,max,min)),collapsed,id,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime)),id,name,notOnBoardCount,notOnBoardIssues(idReadable),orphanRow($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,row(id),tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id))),sortByQuery,sprint,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),tooManyIssues,trimmedSwimlanes($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,row(id),tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id)))),finish,goal,id,isDefault,isStarted,name,report(id),start',
        },
      })
    }),
    getIssues: builder.query({
      query: (ids) => ({
        url: `issuesGetter`,
        method: 'POST',
        body: ids.map(id => ({ id: id })),
        params: {
          fields: 'attachments(id),fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,numberInProject,project($type,archived,id,name,plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId,shortName),reporter($type,id,login,ringId),resolved,subtasks(id,issuesSize,unresolvedIssuesSize)',
          top: -1,
          topLinks: 3,
        },
      }),
    }),
    getCustomFieldValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/ownedField/${id}/values`,
        params: {
          fields: '$type,archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
  }),
});

export const { useGetAgilesByIdQuery, useGetCustomFieldValuesQuery, useGetCurrentSprintForSpecificAgileQuery, useGetIssuesQuery } = youtrackApi;

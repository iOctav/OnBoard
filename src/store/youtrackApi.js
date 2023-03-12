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
          fields: 'backlog(availableRules(id),folderId,id,isUpdatable,name,query,updateableBy(id,name),visibleFor(id,name)),cardOnSeveralSprints,cardSettings(fields(field(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,presentation(id))),colorCoding(id,projectColors(color(id),id,project(id,name)),prototype(id,localizedName,name)),colorizeCustomFields,columnSettings(columns(collapsed,color($type,id),fieldValues(canUpdate,column(id),id,isResolved,name,ordinal,presentation),id,isResolved,isVisible,ordinal,parent($type,id),wipLimit($type,max,min)),field(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,showBundleWarning),currentSprint(id),estimationField($type,fieldType(id,valueType),id,name),extensions(reportSettings(doNotUseBurndown,estimationBurndownField,filterType(id),id,subQuery,yaxis(id))),flatBacklog,hideOrphansSwimlane,id,isDemo,isUpdatable,name,originalEstimationField($type,fieldType(id,valueType),id,name),orphansAtTheTop,owner(fullName,id,login,ringId),projects($type,archived,id,name,plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId,shortName),readSharingSettings(permittedGroups(id,name),permittedUsers(id,login,name),projectBased),sprints(archived,finish,id,isDefault,isStarted,name,start),sprintsSettings(addNewIssueToKanban,cardOnSeveralSprints,defaultSprint($type,id,name),disableSprints,explicitQuery,hideSubtasksOfCards,isExplicit,sprintSyncField(fieldType(isMultiValue),id,localizedName,name)),status(errors,hasJobs,valid,warnings),swimlaneSettings($type,defaultCardType(id,name),enabled,field(customField(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,instant,multiValue,name,presentation),id,values(id,isResolved,name,presentation,value)),updateSharingSettings(permittedGroups(id,name,teamForProject(id)),permittedUsers(id,login,name),projectBased)',
        },
      })
    }),
    getAgiles: builder.query({
      query: () => ({
        url: `agiles`,
        params: {
          fields: 'id,name,favorite,sprints(id,name),owner(id,fullName)',
        },
      })
    }),
    getSpecificSprintForSpecificAgile: builder.query({
      query: ({agileId, sprintId}) => ({
        url: `agiles/${agileId}/sprints/${sprintId}`,
        params: {
          fields: 'agile(hideOrphansSwimlane,id,name,orphansAtTheTop,status(errors,valid,warnings)),archived,board(columns(agileColumn(collapsed,color($type,id),fieldValues(canUpdate,column(id),id,isResolved,name,ordinal,presentation),presentation,id,isResolved,isVisible,ordinal,parent($type,id),wipLimit($type,max,min)),collapsed,id,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime)),id,name,notOnBoardCount,notOnBoardIssues(idReadable),orphanRow($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,row(id),tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id))),sortByQuery,sprint,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),tooManyIssues,trimmedSwimlanes($type,cells(column(collapsed,id),id,issues($type,id,summary),issuesCount,row(id),tooManyIssues),collapsed,id,issue($type,created,description,fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,isDraft,mentionedArticles(idReadable,summary),mentionedIssues(idReadable,resolved,summary),mentionedUsers($type,avatarUrl,banBadge,banned,canReadProfile,fullName,id,isLocked,login,name,ringId),numberInProject,project($type,id,isDemo,leader(id),name,plugins(helpDeskSettings(enabled),timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id)),vcsIntegrationSettings(processors(enabled,migrationFailed,server(enabled,url),upsourceHubResourceKey,url))),ringId,shortName,team($type,allUsersGroup,icon,id,name,ringId)),reporter($type,avatarUrl,banBadge,banned,email,fullName,id,isLocked,issueRelatedGroup(icon),login,name,online,profiles(general(trackOnlineStatus)),ringId),resolved,summary,updated,watchers(hasStar)),matchesQuery,name,timeTrackingData(effectiveEstimation,estimation,hasExplicitSpentTime,originalEstimation,spentTime),value(presentation,relatedTag(color%2Fid,id)))),finish,goal,id,isDefault,isStarted,name,report(id),start',
        },
      })
    }),
    getSprintsForAgile: builder.query({
      query: (agileId) => ({
        url: `agiles/${agileId}/sprints`,
        params: {
          fields: 'archived,finish,goal,id,isDefault,isStarted,name,report(id),start',
        },
      })
    }),
    getIssues: builder.query({
      query: (ids) => ({
        url: `issuesGetter`,
        method: 'POST',
        body: ids.map(id => ({ id: id })),
        params: {
          fields: 'attachments(id),fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,summary,isDraft,numberInProject,project($type,archived,id,name,plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId,shortName),reporter($type,id,login,ringId),resolved,subtasks(id,issuesSize,unresolvedIssuesSize)',
          top: -1,
          topLinks: 3,
        },
      }),
    }),
    getCustomFieldValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/ownedField/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getCurrentUserInfo: builder.query({
      query: () => ({
        url: `users/me`,
        params: {
          fields: 'id,login,name,email,savedQueries(name,id),tags(name,id)',
        },
      })
    }),
    getAgileUserProfile: builder.query({
      query: () => ({
        url: `agileUserProfile`,
        params: {
          fields: 'cardDetailLevel,defaultAgile(createdWithOriginal,currentSprint(id),id,isUpdatable,name,sprints(archived,finish,goal,id,isDefault,isStarted,name,report(id),start),status(errors,valid)),visitedSprints(agile(id),id)',
        },
      })
    }),
    getEnumBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/enum/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getOwnedBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/ownedField/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getStateBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/state/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getVersionBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/version/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getUserBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/user/${id}/aggregatedUsers`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getBuildBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/build/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getAvailableColumnFields: builder.query({
      query: (id) => ({
        url: `agiles/${id}/availableColumnFields`,
        params: {
          fields: 'fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type',
        },
      })
    }),
    getColumnSettingsAvailableColumnFields: builder.query({
      query: (id) => ({
        url: `agiles/${id}/columnSettings/availableColumnFields`,
        params: {
          fields: 'id,name,presentation',
        },
      })
    }),
  }),
});

export const { useGetAgilesByIdQuery, useGetCustomFieldValuesQuery,
  useGetSpecificSprintForSpecificAgileQuery, useLazyGetSprintsForAgileQuery, useGetIssuesQuery,
  useGetCurrentUserInfoQuery, useLazyGetAgilesQuery, useGetAgileUserProfileQuery,
  useLazyGetEnumBundleValuesQuery, useLazyGetOwnedBundleValuesQuery, useLazyGetStateBundleValuesQuery,
  useLazyGetVersionBundleValuesQuery, useLazyGetUserBundleValuesQuery, useLazyGetBuildBundleValuesQuery,
  useLazyGetAvailableColumnFieldsQuery, useLazyGetColumnSettingsAvailableColumnFieldsQuery } = youtrackApi;

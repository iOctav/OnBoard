import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { trimLastSlash } from '../../utils/uriUtils';

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
    getValuesFilterFields: builder.query({
      query: (shortNames) => ({
        url: `filterFields?${shortNames.map(name => `fld=${name}&`).join('')}fieldTypes=version%5B1%5D&fieldTypes=ownedField%5B1%5D&fieldTypes=state%5B1%5D&fieldTypes=user%5B1%5D&fieldTypes=enum%5B1%5D&fieldTypes=build%5B1%5D&fieldTypes=version%5B*%5D&fieldTypes=ownedField%5B*%5D&fieldTypes=user%5B*%5D&fieldTypes=enum%5B*%5D&fieldTypes=build%5B*%5D&fieldTypes=project&fieldTypes=tag&fieldTypes=date&fieldTypes=date+and+time&fieldTypes=instant`,
        params: {
          fields: '$type,aggregateable,customField(fieldType(id,isBundleType,presentation,valueType),id,localizedName,name,ordinal),id,instant,name,presentation,projects(id,name),sortable',
          filteringType: 'contains',
          getUnusedVisibleFields: true
        },
      })
    }),
    getIssuesFilterFields: builder.query({
      query: (shortNames) => ({
        url: `filterFields?${shortNames.map(name => `fld=${name}&`).join('')}fieldTypes=version%5B1%5D&fieldTypes=version%5B*%5D&fieldTypes=ownedField%5B1%5D&fieldTypes=ownedField%5B*%5D&fieldTypes=state%5B1%5D&fieldTypes=enum%5B1%5D&fieldTypes=enum%5B*%5D&fieldTypes=build%5B1%5D&fieldTypes=build%5B*%5D`,
        params: {
          fields: '$type,aggregateable,customField(fieldType(id,isBundleType,presentation,valueType),id,localizedName,name,ordinal),id,instant,name,presentation,projects(id,name),sortable',
          filteringType: 'contains',
          getUnusedVisibleFields: true
        },
      })
    }),
    getColorSchemeFilterFields: builder.query({
      query: (shortNames) => ({
        url: `filterFields?${shortNames.map(name => `fld=${name}&`).join('')}fieldTypes=build%5B*%5D&fieldTypes=version%5B1%5D&fieldTypes=version%5B*%5D&fieldTypes=enum%5B1%5D&fieldTypes=enum%5B*%5D&fieldTypes=state%5B1%5D&fieldTypes=ownedField%5B1%5D&fieldTypes=ownedField%5B*%5D`,
        params: {
          fields: '$type,aggregateable,customField(fieldType(id,isBundleType,presentation,valueType),id,localizedName,name,ordinal),id,instant,name,presentation,projects(id,name),sortable',
          filteringType: 'contains',
          getUnusedVisibleFields: true,
        },
      })
    }),
    getEstimationFilterFields: builder.query({
      query: (shortNames) => ({
        url: `filterFields?${shortNames.map(name => `fld=${name}&`).join('')}fieldTypes=period&fieldTypes=integer&fieldTypes=float`,
        params: {
          fields: '$type,aggregateable,customField(fieldType(id,isBundleType,presentation,valueType),id,localizedName,name,ordinal),id,instant,name,presentation,projects(id,name),sortable',
          filteringType: 'contains',
          getUnusedVisibleFields: true,
        },
      })
    }),
    getAvailableSwimlaneFields: builder.query({
      query: (agileId) => ({
        url: `agiles/${agileId}/swimlaneSettings/availableSwimlaneFields`,
        params: {
          fields: 'id,name,presentation',

        },
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: `users`,
        params: {
          fields: 'avatarUrl,banBadge,banned,email,fullName,id,login,ringId',

        },
      })
    }),
    getProjects: builder.query({
      query: () => ({
        url: `admin/projects`,
        params: {
          fields: 'archived,id,isDemo,name,pinned,ringId,shortName,template',
          sorting: 'natural',
        },
      })
    }),
    getVisibilityGroups: builder.query({
      query: () => ({
        url: `groups`,
        params: {
          fields: 'allUsersGroup,icon,id,name,ringId',

        },
      })
    }),
    getCustomFilterFields: builder.query({
      query: (shortNames) => ({
        url: `filterFields?${shortNames.map(name => `fld=${name}&`).join('')}fieldTypes=custom`,
        params: {
          fields: '$type,aggregateable,customField(fieldType(id,isBundleType,presentation,valueType),id,localizedName,name,ordinal),id,instant,name,presentation,projects(id,name),sortable',
          filteringType: 'contains',
          getUnusedVisibleFields: true,
        },
      })
    }),
  }),
});

export const { useGetAgilesByIdQuery, useGetCustomFieldValuesQuery,
  useLazyGetSprintsForAgileQuery, useGetIssuesQuery,
  useGetCurrentUserInfoQuery, useLazyGetAgilesQuery, useGetAgileUserProfileQuery,
  useLazyGetEnumBundleValuesQuery, useLazyGetOwnedBundleValuesQuery, useLazyGetStateBundleValuesQuery,
  useLazyGetVersionBundleValuesQuery, useLazyGetUserBundleValuesQuery, useLazyGetBuildBundleValuesQuery,
  useLazyGetAvailableColumnFieldsQuery, useLazyGetColorSchemeFilterFieldsQuery, useLazyGetEstimationFilterFieldsQuery,
  useLazyGetColumnSettingsAvailableColumnFieldsQuery, useLazyGetCustomFilterFieldsQuery,
  useLazyGetValuesFilterFieldsQuery, useLazyGetIssuesFilterFieldsQuery, useLazyGetAvailableSwimlaneFieldsQuery,
  useLazyGetUsersQuery, useLazyGetProjectsQuery, useLazyGetVisibilityGroupsQuery } = youtrackApi;

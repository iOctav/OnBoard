import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getLocalTokenInfo } from '../../features/auth/oauthUtils';

export const youtrackApi = createApi({
  reducerPath: 'youtrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = getLocalTokenInfo()?.access_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Sprint', 'Board'],
  endpoints: (builder) => ({
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
          fields: 'attachments(id),fields($type,hasStateMachine,id,isUpdatable,name,projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,avatarUrl,buildIntegration,buildLink,color(background,id),description,fullName,id,isResolved,localizedName,login,markdownText,minutes,name,presentation,ringId,text)),id,idReadable,summary,isDraft,numberInProject,project($type,archived,id,name,plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId,shortName),reporter($type,id,login,ringId),created,updated,resolved,subtasks(id,issuesSize,issues(id,summary),unresolvedIssuesSize),tags(id,name,color(id))',
          top: -1,
          topLinks: 3,
        },
      }),
      providesTags: ['Sprint'],
    }),
    getCustomFieldValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/ownedField/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
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
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getOwnedBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/ownedField/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getStateBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/state/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getVersionBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/version/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getUserBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/user/${id}/aggregatedUsers`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
        },
      })
    }),
    getBuildBundleValues: builder.query({
      query: (id) => ({
        url: `admin/customFieldSettings/bundles/build/${id}/values`,
        params: {
          fields: 'archived,assembleDate,avatarUrl,color(id,background),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,showLocalizedNameInAdmin,teamForProject(ringId),usersCount',
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
    getIssueTags: builder.query({
      query: () => ({
        url: `issueTags`,
        params: {
          fields: '$type,color(id),id,isDeletable,isShareable,isUpdatable,isUsable,issuesUrl,name,owner($type,id,isLocked,login,name,ringId),pinned,pinnedByDefault,query,readSharingSettings(permissionBasedTagAccess,permittedGroups($type,id,name,ringId),permittedUsers($type,id,isLocked,login,name,ringId)),shortName,tagSharingSettings(permissionBasedTagAccess,permittedGroups($type,id,name,ringId),permittedUsers($type,id,isLocked,login,name,ringId)),untagOnResolve,updateSharingSettings(permissionBasedTagAccess,permittedGroups($type,id,name,ringId),permittedUsers($type,id,isLocked,login,name,ringId))',
        },
      })
    }),
  }),
});

export const { useGetCustomFieldValuesQuery,
  useLazyGetSprintsForAgileQuery, useGetIssuesQuery,
  useGetCurrentUserInfoQuery, useLazyGetAgilesQuery, useGetAgileUserProfileQuery,
  useLazyGetEnumBundleValuesQuery, useLazyGetOwnedBundleValuesQuery, useLazyGetStateBundleValuesQuery,
  useLazyGetVersionBundleValuesQuery, useLazyGetUserBundleValuesQuery, useLazyGetBuildBundleValuesQuery,
  useLazyGetAvailableColumnFieldsQuery, useLazyGetColorSchemeFilterFieldsQuery, useLazyGetEstimationFilterFieldsQuery,
  useLazyGetColumnSettingsAvailableColumnFieldsQuery, useLazyGetCustomFilterFieldsQuery,
  useLazyGetValuesFilterFieldsQuery, useLazyGetIssuesFilterFieldsQuery, useLazyGetAvailableSwimlaneFieldsQuery,
  useLazyGetUsersQuery, useLazyGetProjectsQuery, useLazyGetVisibilityGroupsQuery, useLazyGetIssueTagsQuery } = youtrackApi;

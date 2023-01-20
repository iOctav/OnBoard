import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const youtrackApi = createApi({
  reducerPath: 'youtrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_YOUTRACK_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_YOUTRACK_TOKEN}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAgilesById: builder.query({
      query: (id) => ({
        url: `agiles/${id}`,
        params: {
          fields: 'id,name,owner(id,name,login),projects(id,name),sprints(id,name),visibleFor(name,id),visibleForProjectBased,updateableBy(id,name),updateableByProjectBased,hideOrphansSwimlane,orphansAtTheTop,currentSprint(id,name,issues(id,idReadable,visibility,summary,externalIssue(name),customFields(id,name,value(id,name)))),columnSettings(field(id,name),columns(presentation,isResolved,fieldValues(id,name))),cardSettings(fields(field(fieldDefaults(bundle(id,isUpdateable,values(id,name))),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,presentation(id)))',
        },
      })
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

export const { useGetAgilesByIdQuery, useGetCustomFieldValuesQuery } = youtrackApi;

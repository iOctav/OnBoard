import { youtrackApi } from '../../app/services/youtrackApi';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    updateGeneralSwimlaneSettings: builder.mutation({
      query: ({ agileId, ...patch }) => ({
        url: `agiles/${agileId}`,
        method: 'POST',
        body: patch,
        params: {
          fields: '$type, id',
          muteUpdateNotifications: true,
        }
      }),
      invalidatesTags: ['Board'],
    }),
  })
})

export const { useUpdateGeneralSwimlaneSettingsMutation } = extendedYoutrackApi

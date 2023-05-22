import { youtrackApi } from '../../app/services/youtrackApi';
import { extractNestedSwimlanesFromSearch } from '../../utils/hashUtils';

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

export const selectNestedSwimlanes = (state) => extractNestedSwimlanesFromSearch(state.router.location.search)

import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { calculateSwimlaneType } from '../../utils/swimlanesUtils';
import { SwimlaneType } from './swimlane-type';
import { v4 as uuidv4 } from 'uuid';

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

const swimlanesAdapter = createEntityAdapter();

const matchAgileUpdated = isAnyOf(
  youtrackApi.endpoints.getAgilesById.matchFulfilled
)

const nestedSwimlanesSlice = createSlice({
  name: 'nestedSwimlanes',
  initialState: swimlanesAdapter.getInitialState(),
  reducers: {
    createNestedSwimlane(state, action) {
      swimlanesAdapter.addOne(state, {
        id: uuidv4(),
        order: action.payload.order,
        type: SwimlaneType.None,
        field: {},
        values: [],
      });
    },
    updateNestedSwimlane: swimlanesAdapter.updateOne,
    removeNestedSwimlane: swimlanesAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addMatcher(matchAgileUpdated, (state, action) => {
      if (action.payload.swimlaneSettings?.enabled) {
        const generalSwimlane = action.payload.swimlaneSettings;
        generalSwimlane && swimlanesAdapter.upsertOne(state, {
          id: uuidv4(),
          order: 0,
          type: calculateSwimlaneType(true, generalSwimlane?.$type),
          field: {
            id: generalSwimlane.field.id,
            name: generalSwimlane.field.name,
            presentation: generalSwimlane.field.presentation,
            aggregateable: generalSwimlane.values?.length > 0 || generalSwimlane.field.multiValue,
          },
          values: [...generalSwimlane.values].map(val => ({key: val.name, id: val.id, label: val.presentation}))
        });
      }
    });
  },
});

export const { createNestedSwimlane, updateNestedSwimlane, removeNestedSwimlane } = nestedSwimlanesSlice.actions

export default nestedSwimlanesSlice.reducer;

export const {
  selectAll: selectSwimlanesMetadata,
  selectEntities: selectSwimlanesMetadataEntities,
  selectById: selectSwimlaneMetadataById,
  selectTotal: selectSwimlanesDepth,
} = swimlanesAdapter.getSelectors((state) => state.nestedSwimlanes);

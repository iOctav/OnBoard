import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { calculateSwimlaneType } from '../../utils/swimlanesUtils';
import { SwimlaneType } from './swimlane-type';

const notificationsAdapter = createEntityAdapter();

const matchAgileUpdated = isAnyOf(
  youtrackApi.endpoints.getAgilesById.matchFulfilled
)

const nestedSwimlanesSlice = createSlice({
  name: "nestedSwimlanes",
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    createNestedSwimlane(state, action) {
      notificationsAdapter.addOne(state, {
        id: action.payload.id,
        type: SwimlaneType.None,
        field: {},
        values: [],
      });
    },
    updateNestedSwimlane: notificationsAdapter.updateOne,
    removeNestedSwimlane: notificationsAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addMatcher(matchAgileUpdated, (state, action) => {
      if (action.payload.swimlaneSettings?.enabled) {
        const generalSwimlane = action.payload.swimlaneSettings;
        generalSwimlane && notificationsAdapter.upsertOne(state, {
          id: 0,
          type: calculateSwimlaneType(true, generalSwimlane?.$type),
          field: {
            id: generalSwimlane.field.id,
            name: generalSwimlane.field.name,
            presentation: generalSwimlane.field.presentation,
            aggregateable: generalSwimlane.values?.length > 0 || generalSwimlane.field.multiValue,
          },
          values: [...generalSwimlane.values].map(val => ({id: val.id, name: val.name, presentation: val.presentation}))
        });
      }
    });
  },
});

export const { createNestedSwimlane, updateNestedSwimlane, removeNestedSwimlane } = nestedSwimlanesSlice.actions

export default nestedSwimlanesSlice.reducer;

export const {
  selectAll: selectSwimlanesMetadata,
  selectEntities: selectMetadataEntities,
  selectById: selectSwimlaneMetadataById,
  selectTotal: selectSwimlanesDepth,
} = notificationsAdapter.getSelectors((state) => state.nestedSwimlanes);


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
    addNestedSwimlane(state, action) {
      notificationsAdapter.addOne(state, {
        id: action.payload.order,
        order: action.payload.order,
        type: SwimlaneType.None,
        field: {},
        values: [],
      });
    },
    removeNestedSwimlane: notificationsAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addMatcher(matchAgileUpdated, (state, action) => {
      if (action.payload.swimlaneSettings?.enabled) {
        const generalSwimlane = action.payload.swimlaneSettings;
        generalSwimlane && notificationsAdapter.upsertOne(state, {
          id: generalSwimlane.id,
          order: 0,
          type: calculateSwimlaneType(true, generalSwimlane?.$type),
          field: {
            id: generalSwimlane.field.id,
            presentation: generalSwimlane.field.presentation,
            aggregateable: generalSwimlane.values?.length > 0 || generalSwimlane.field.multiValue,
          },
          values: [...generalSwimlane.values].map(val => ({id: val.id, name: val.name, presentation: val.presentation}))
        });
      }
    });
  },
});

export const { addNestedSwimlane, removeNestedSwimlane } = nestedSwimlanesSlice.actions

export default nestedSwimlanesSlice.reducer;

export const {
  selectAll: selectSwimlanesMetadata,
  selectEntities: selectMetadataEntities,
} = notificationsAdapter.getSelectors((state) => state.nestedSwimlanes);

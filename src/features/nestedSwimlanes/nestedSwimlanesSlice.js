import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { calculateSwimlaneType } from '../../utils/swimlanesUtils';
import { SwimlaneType } from './swimlane-type';

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
        id: action.payload.id,
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
          id: 0,
          type: calculateSwimlaneType(true, generalSwimlane?.$type),
          field: {
            id: generalSwimlane.field.id,
            name: generalSwimlane.field.name,
            presentation: generalSwimlane.field.presentation,
            aggregateable: generalSwimlane.values?.length > 0 || generalSwimlane.field.multiValue,
          },
          values: [...generalSwimlane.values].map(val => ({key: val.id, name: val.name, label: val.presentation}))
        });
      }
    });
  },
});

export const { createNestedSwimlane, updateNestedSwimlane, removeNestedSwimlane } = nestedSwimlanesSlice.actions

export default nestedSwimlanesSlice.reducer;

export const {
  selectAll: selectSwimlanesMetadata,
  selectById: selectSwimlaneMetadataById,
  selectTotal: selectSwimlanesDepth,
} = swimlanesAdapter.getSelectors((state) => state.nestedSwimlanes);


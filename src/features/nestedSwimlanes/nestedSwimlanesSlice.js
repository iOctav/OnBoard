import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { calculateSwimlaneType } from '../../utils/swimlanesUtils';
import { SwimlaneType } from './swimlane-type';
import { v4 as uuidv4 } from 'uuid';
import { DateSwimlanePastPeriods, DateSwimlanePeriods, getDateFieldType } from '../customFields/dateFieldUtils';
import { DatePeriodType } from '../customFields/date-period-type';

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
        system: false,
        field: {},
        values: [],
        hideOrphansSwimlane: false,
        enableColor: false,
        dateType: undefined,
      });
    },
    updateNestedSwimlane: swimlanesAdapter.updateOne,
    removeNestedSwimlane: swimlanesAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addMatcher(matchAgileUpdated, (state, action) => {
      swimlanesAdapter.removeAll(state);
      if (action.payload.swimlaneSettings?.enabled) {
        const generalSwimlane = action.payload.swimlaneSettings;
        const dateType = getDateFieldType(generalSwimlane?.field?.customField?.fieldType?.id, generalSwimlane?.field?.id);
        generalSwimlane && swimlanesAdapter.upsertOne(state, {
          id: uuidv4(),
          order: 0,
          type: calculateSwimlaneType(true, generalSwimlane?.$type),
          system: true,
          field: {
            id: generalSwimlane.field.id,
            name: generalSwimlane.field.name,
            presentation: generalSwimlane.field.presentation,
            aggregateable: generalSwimlane.values?.length > 0 || generalSwimlane.field.multiValue,
            dateType: dateType,
          },
          values:  !dateType ? [...generalSwimlane.values].map(val => ({key: val.name, id: val.id, label: val.presentation, color: null}))
            : dateType === DatePeriodType.Both ? DateSwimlanePeriods : DateSwimlanePastPeriods,
          hideOrphansSwimlane: action.payload.hideOrphansSwimlane,
          enableColor: false,
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

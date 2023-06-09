import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { mapCustomFields } from './fieldUtils';

const customFieldsAdapter = createEntityAdapter();

const matchAgileReceived = isAnyOf(
  youtrackApi.endpoints.getAgilesById.matchFulfilled
)

const customFieldsSlice = createSlice({
  name: 'customFields',
  initialState: customFieldsAdapter.getInitialState(),
  reducers: {
  },
  extraReducers(builder) {
    builder.addMatcher(matchAgileReceived, (state, action) => {
      if (action.payload.projects?.length > 0) {
        const customFields = action.payload.projects.reduce((acc, project) => acc.concat(project.customFields), [])
          .map(customField => mapCustomFields(customField, action.payload.cardSettings));
        customFieldsAdapter.upsertMany(state, customFields);
      }
    });
  },
});

export default customFieldsSlice.reducer;

export const {
  selectById: selectCustomFieldMetadataById,
  selectIds: selectCustomFieldIds,
} = customFieldsAdapter.getSelectors((state) => state.customFields);

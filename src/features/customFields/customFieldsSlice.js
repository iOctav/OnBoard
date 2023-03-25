import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';

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
          .map(customField => ({
            id: customField.field.id,
            name: customField.field.name,
            type: customField.field.fieldType.id,
            valueType: customField.field.fieldType.valueType,
            isMultiValue: customField.field.fieldType.isMultiValue,
            emptyFieldText: customField.emptyFieldText,
            bundle: {
              type: customField.bundle?.$type,
              id: customField.bundle?.id,
            },
          }));
        customFieldsAdapter.upsertMany(state, customFields);
      }
    });
  },
});

export default customFieldsSlice.reducer;

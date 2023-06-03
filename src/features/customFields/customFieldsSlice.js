import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { CustomFieldPresentationType } from './custom-field-presentation-type';

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
            canBeEmpty: customField.canBeEmpty,
            bundle: {
              type: customField.bundle?.$type,
              id: customField.bundle?.id,
            },
            presentationType: action.payload.cardSettings?.fields.find(field => field.field.name === customField.field.name)?.presentation?.id ?? CustomFieldPresentationType.FullName,
          }));
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

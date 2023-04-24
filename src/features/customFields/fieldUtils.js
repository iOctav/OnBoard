import {
  useLazyGetBuildBundleValuesQuery,
  useLazyGetEnumBundleValuesQuery,
  useLazyGetGroupValuesQuery,
  useLazyGetIssueTagsQuery,
  useLazyGetOwnedBundleValuesQuery,
  useLazyGetStateBundleValuesQuery,
  useLazyGetUserBundleValuesQuery,
  useLazyGetVersionBundleValuesQuery
} from '../../app/services/youtrackApi';
import { CustomFieldType } from './custom-field-type';

export const mapTypeDataRequest = (fieldType) => {
  switch (fieldType.toLowerCase()) {
    case 'enum': return useLazyGetEnumBundleValuesQuery;
    case 'state': return useLazyGetStateBundleValuesQuery;
    case 'user': return useLazyGetUserBundleValuesQuery;
    case 'ownedField': return useLazyGetOwnedBundleValuesQuery;
    case 'version': return useLazyGetVersionBundleValuesQuery;
    case 'build': return useLazyGetBuildBundleValuesQuery;
    case 'group': return useLazyGetGroupValuesQuery;
    default: return null;
  }
}

export const getDataPattern = (fieldType) => {
  switch (fieldType.toLowerCase()) {
    case 'integer': return /[+-]?\b[0-9]+\b/;
    case 'float': return /^[-+]?[0-9]+\.?[0-9]*[eE]?[-+]?[0-9]*$/;
    default: return undefined;
  }
}

export const getDataPlaceholder = (fieldType) => {
  switch (fieldType.toLowerCase()) {
    case 'integer': return '-12 or 34';
    case 'float': return '12.34 or 1.23e4';
    default: return undefined;
  }
}

export const mapIdDataRequest = (fieldId) => {
  switch (fieldId.toLowerCase()) {
    case 'tag': return useLazyGetIssueTagsQuery;
    default: return null;
  }
}

export const isDateField = (fieldType) => {
  return fieldType?.toLowerCase() === CustomFieldType.Date || fieldType?.toLowerCase() === CustomFieldType.DateTime;
}

export const isDateTimeField = (fieldType) => {
  return fieldType?.toLowerCase() === CustomFieldType.DateTime;
}

export const isPeriodField = (fieldType) => {
  return fieldType?.toLowerCase() === CustomFieldType.Period;
}

export const isSelectField = (fieldType) => {
  const lcFieldType = fieldType?.toLowerCase();
  return lcFieldType === CustomFieldType.Enum
    || lcFieldType === CustomFieldType.State
    || lcFieldType === CustomFieldType.User
    || lcFieldType === CustomFieldType.OwnedField
    || lcFieldType === CustomFieldType.Version
    || lcFieldType === CustomFieldType.Build
    || lcFieldType === CustomFieldType.Group;
};

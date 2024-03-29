import {
  getDataPattern, getDataPlaceholder,
  isDateField,
  isDateTimeField,
  isPeriodField,
  isSelectField, mapCustomFields, mapIdDataRequest,
  mapTypeDataRequest
} from '../fieldUtils';
import {
  useLazyGetBuildBundleValuesQuery,
  useLazyGetEnumBundleValuesQuery,
  useLazyGetGroupValuesQuery,
  useLazyGetIssueTagsQuery,
  useLazyGetOwnedBundleValuesQuery,
  useLazyGetStateBundleValuesQuery,
  useLazyGetUserBundleValuesQuery,
  useLazyGetVersionBundleValuesQuery
} from '../../../app/services/youtrackApi';
import { CustomFieldPresentationType } from '../custom-field-presentation-type';

describe('mapTypeDataRequest', () => {
  it('should return correct function based on fieldType', () => {
    expect(mapTypeDataRequest('enum')).toBe(useLazyGetEnumBundleValuesQuery);
    expect(mapTypeDataRequest('state')).toBe(useLazyGetStateBundleValuesQuery);
    expect(mapTypeDataRequest('user')).toBe(useLazyGetUserBundleValuesQuery);
    expect(mapTypeDataRequest('ownedfield')).toBe(useLazyGetOwnedBundleValuesQuery);
    expect(mapTypeDataRequest('version')).toBe(useLazyGetVersionBundleValuesQuery);
    expect(mapTypeDataRequest('build')).toBe(useLazyGetBuildBundleValuesQuery);
    expect(mapTypeDataRequest('group')).toBe(useLazyGetGroupValuesQuery);
    expect(mapTypeDataRequest('unknown')).toBeNull();
  });
});

describe('getDataPattern', () => {
  it('should return correct pattern based on fieldType', () => {
    expect(getDataPattern('integer')).toEqual(/[+-]?\b[0-9]+\b/);
    expect(getDataPattern('float')).toEqual(/^[-+]?[0-9]+\.?[0-9]*[eE]?[-+]?[0-9]*$/);
    expect(getDataPattern('unknown')).toBeUndefined();
  });
});

describe('getDataPlaceholder', () => {
  it('should return correct placeholder based on fieldType', () => {
    expect(getDataPlaceholder('integer')).toBe('-12 or 34');
    expect(getDataPlaceholder('float')).toBe('12.34 or 1.23e4');
    expect(getDataPlaceholder('unknown')).toBeUndefined();
  });
});

describe('mapIdDataRequest', () => {
  it('should return correct function based on fieldId', () => {
    expect(mapIdDataRequest('tag')).toBe(useLazyGetIssueTagsQuery);
    expect(mapIdDataRequest('unknown')).toBeNull();
  });
});

describe('isDateField', () => {
  it('should return true if fieldType is Date or DateTime', () => {
    expect(isDateField('Date')).toBe(true);
    expect(isDateField('Date and Time')).toBe(true);
    expect(isDateField('unknown')).toBe(false);
  });
});

describe('isDateTimeField', () => {
  it('should return true if fieldType is DateTime', () => {
    expect(isDateTimeField('Date and Time')).toBe(true);
    expect(isDateTimeField('unknown')).toBe(false);
  });
});

describe('isPeriodField', () => {
  it('should return true if fieldType is Period', () => {
    expect(isPeriodField('Period')).toBe(true);
    expect(isPeriodField('unknown')).toBe(false);
  });
});

describe('isSelectField', () => {
  it('should return true if fieldType is Enum, State, User, OwnedField, Version, Build, or Group', () => {
    expect(isSelectField('Enum')).toBe(true);
    expect(isSelectField('State')).toBe(true);
    expect(isSelectField('User')).toBe(true);
    expect(isSelectField('OwnedField')).toBe(true);
    expect(isSelectField('Version')).toBe(true);
    expect(isSelectField('Build')).toBe(true);
    expect(isSelectField('Group')).toBe(true);
    expect(isSelectField('unknown')).toBe(false);
    expect(isSelectField('')).toBe(false);
    expect(isSelectField(undefined)).toBe(false);
  });
});

describe('mapCustomFields', () => {
  it('maps project custom fields correctly without optional values', () => {
    const projectCustomField = {
      field: {
        id: '1',
        name: 'Field1',
        fieldType: {
          id: 'Type1',
          valueType: 'ValueType1',
          isMultiValue: true,
        },
      },
      emptyFieldText: 'Empty1',
      canBeEmpty: true,
    };

    const expected = {
      id: '1',
      name: 'Field1',
      type: 'Type1',
      valueType: 'ValueType1',
      isMultiValue: true,
      emptyFieldText: 'Empty1',
      canBeEmpty: true,
      bundle: undefined,
      presentationType: CustomFieldPresentationType.FullName,
    };

    expect(mapCustomFields(projectCustomField)).toEqual(expected);
  });

  it('maps project custom fields correctly with all values', () => {
    const projectCustomField = {
      field: {
        id: '1',
        name: 'Field1',
        fieldType: {
          id: 'Type1',
          valueType: 'ValueType1',
          isMultiValue: true,
        },
      },
      emptyFieldText: 'Empty1',
      canBeEmpty: true,
      bundle: {
        $type: 'Bundle1',
        id: 'BundleId1'
      }
    };

    const cardSettings = {
      fields: [
        {
          field: {
            name: 'Field1',
          },
          presentation: {
            id: 'Presentation1'
          }
        }
      ]
    };

    const expected = {
      id: '1',
      name: 'Field1',
      type: 'Type1',
      valueType: 'ValueType1',
      isMultiValue: true,
      emptyFieldText: 'Empty1',
      canBeEmpty: true,
      bundle: {
        type: 'Bundle1',
        id: 'BundleId1'
      },
      presentationType: 'Presentation1',
    };

    expect(mapCustomFields(projectCustomField, cardSettings)).toEqual(expected);
  });
});
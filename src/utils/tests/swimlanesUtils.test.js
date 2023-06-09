import { calculateSwimlaneType } from '../swimlanesUtils';
import { SwimlaneType } from '../../features/nestedSwimlanes/swimlane-type';

describe('calculateSwimlaneType', () => {
  it('returns SwimlaneType.Values if enabled is true and type is "AttributeBasedSwimlaneSettings"', () => {
    const result = calculateSwimlaneType(true, 'AttributeBasedSwimlaneSettings');
    expect(result).toBe(SwimlaneType.Values);
  });

  it('returns SwimlaneType.Issues if enabled is true and type is "IssueBasedSwimlaneSettings"', () => {
    const result = calculateSwimlaneType(true, 'IssueBasedSwimlaneSettings');
    expect(result).toBe(SwimlaneType.Issues);
  });

  it('returns SwimlaneType.None if enabled is false regardless of type', () => {
    const result1 = calculateSwimlaneType(false, 'AttributeBasedSwimlaneSettings');
    const result2 = calculateSwimlaneType(false, 'IssueBasedSwimlaneSettings');
    expect(result1).toBe(SwimlaneType.None);
    expect(result2).toBe(SwimlaneType.None);
  });

  it('returns SwimlaneType.None if type does not match predefined types', () => {
    const result = calculateSwimlaneType(true, 'InvalidType');
    expect(result).toBe(SwimlaneType.None);
  });
});

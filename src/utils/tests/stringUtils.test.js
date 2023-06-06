import { capitalizeFirstLetter } from '../stringUtils';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    const result = capitalizeFirstLetter('test');
    expect(result).toBe('Test');
  });

  it('returns an empty string if the input is an empty string', () => {
    const result = capitalizeFirstLetter('');
    expect(result).toBe('');
  });

  it('returns undefined if the input is undefined', () => {
    const result = capitalizeFirstLetter(undefined);
    expect(result).toBe(undefined);
  });

  it('returns null if the input is null', () => {
    const result = capitalizeFirstLetter(null);
    expect(result).toBe(null);
  });

  it('handles strings with the first letter already capitalized', () => {
    const result = capitalizeFirstLetter('Test');
    expect(result).toBe('Test');
  });

  it('handles single letter strings', () => {
    const result = capitalizeFirstLetter('t');
    expect(result).toBe('T');
  });
});

import { trimLastSlash } from '../uriUtils';

describe('trimLastSlash', () => {
  it('removes the last slash from a URI', () => {
    const result = trimLastSlash('https://example.com/');
    expect(result).toBe('https://example.com');
  });

  it('does nothing if the URI does not end with a slash', () => {
    const result = trimLastSlash('https://example.com');
    expect(result).toBe('https://example.com');
  });

  it('removes only the last slash', () => {
    const result = trimLastSlash('https://example.com/path/');
    expect(result).toBe('https://example.com/path');
  });

  it('returns an empty string if the input is an empty string', () => {
    const result = trimLastSlash('');
    expect(result).toBe('');
  });
});

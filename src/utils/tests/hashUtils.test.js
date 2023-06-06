import {
  getHashParams,
  extractHashParamsFromRedirectUrl,
  extractQueryFromSearch,
  extractNestedSwimlanesFromSearch,
  removeHashParamsFromUrl
} from '../hashUtils';

describe('getHashParams', () => {
  it('extracts hash params from window location', () => {
    delete window.location;
    window.location = { hash: '#key1=value1&key2=value2' };
    const result = getHashParams();
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });
});

describe('extractHashParamsFromRedirectUrl', () => {
  it('extracts hash params from redirect url', () => {
    const redirectUrl = 'http://example.com#key1=value1&key2=value2';
    const result = extractHashParamsFromRedirectUrl(redirectUrl);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });
});

describe('extractQueryFromSearch', () => {
  it('extracts query from search params', () => {
    const search = '?query=test';
    const result = extractQueryFromSearch(search);
    expect(result).toBe('test');
  });
});

describe('extractNestedSwimlanesFromSearch', () => {
  it('extracts nested swimlanes from search params', () => {
    const search = '?nested-swimlanes=%7B%22swimlane1%22%3A%22value1%22%2C%22swimlane2%22%3A%22value2%22%7D';
    const result = extractNestedSwimlanesFromSearch(search);
    expect(result).toEqual({ swimlane1: 'value1', swimlane2: 'value2' });
  });
});

describe('removeHashParamsFromUrl', () => {
  it('removes hash params from url', () => {
    const pushStateMock = jest.fn();
    delete window.location;
    window.location = { hash: '#key1=value1&key2=value2', pathname: '/test', search: '?query=test' };
    delete window.history;
    window.history = { pushState: pushStateMock, replaceState: pushStateMock };
    document.title = 'Test';
    removeHashParamsFromUrl();
    expect(pushStateMock).toHaveBeenCalledWith("", 'Test', '/test?query=test');
  });
});

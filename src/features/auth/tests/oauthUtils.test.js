import {
  setLocalTokenInfo,
  getLocalTokenInfo,
  isTokenExpired
} from '../oauthUtils';

describe('OAuth2 related functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockToken = { access_token: 'abcd1234', expires_at: null };


  it('getLocalTokenInfo', () => {
    setLocalTokenInfo(mockToken);
    const result = getLocalTokenInfo();
    expect(result).toEqual(mockToken);
  });

  it('isTokenExpired with expired token', () => {
    mockToken.expires_at = Date.now() / 1000 - 3600; // expired 1 hour ago
    setLocalTokenInfo(mockToken);
    expect(isTokenExpired(getLocalTokenInfo())).toBe(true);
  });
});

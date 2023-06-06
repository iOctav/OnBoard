import { renderHook } from '@testing-library/react'
import { useAuth } from '../useAuth';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('useAuth', () => {
  it('returns the authInfo from redux store', () => {
    const mockAuthInfo = { token: 'abcd1234' };
    useSelector.mockImplementation(callback => {
      const state = {
        auth: { authInfo: mockAuthInfo },
      };
      return callback(state);
    });

    const { result } = renderHook(() => useAuth());
    expect(result.current.authInfo).toEqual({ authInfo: mockAuthInfo });
  });

  it('returns an empty object if authInfo does not exist in redux store', () => {
    useSelector.mockImplementation(callback => {
      const state = {};
      return callback(state);
    });

    const { result } = renderHook(() => useAuth());
    expect(result.current.authInfo).toEqual(undefined);
  });
});

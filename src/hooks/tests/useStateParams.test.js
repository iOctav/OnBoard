import { renderHook, act } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStateParams } from '../useStateParams';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useStateParams hook', () => {
  const mockDispatch = jest.fn();
  const mockLocation = {
    search: '?param=value',
    pathname: '/path',
  };

  const mockSerialize = jest.fn((state) => JSON.stringify(state));
  const mockDeserialize = jest.fn((param) => JSON.parse(param));

  beforeEach(() => {
    jest.clearAllMocks();
    useLocation.mockReturnValue(mockLocation);
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('should call dispatch on state change', () => {
    const { result } = renderHook(() =>
      useStateParams({ test: 'test' }, 'param', mockSerialize, mockDeserialize)
    );

    act(() => {
      result.current[1]({ test: 'new value' });
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockSerialize).toHaveBeenCalledWith({ test: 'new value' });
  });
});

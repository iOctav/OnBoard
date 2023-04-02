import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { replace } from 'redux-first-history';

export const useStateParams = (initialState, paramsName, serialize, deserialize) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = new URLSearchParams(location.search);

  const existingValue = search.get(paramsName);
  const [state, setState] = useState(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue));
    }
  }, [existingValue]);

  const onChange = (s) => {
    setState(s);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramsName, serialize(s));
    const pathname = location.pathname;
    dispatch(replace({ pathname, search: searchParams.toString() }));
  };

  return [state, onChange];
}
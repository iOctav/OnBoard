import { Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import { setCredentials } from './authSlice';
import { useDispatch } from 'react-redux';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';

const hashParams = getHashParams();
removeHashParamsFromUrl();

export function OAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (hashParams.access_token) {
      const expires_in = hashParams.expires_in;
      const now = new Date();
      let expirationTime = now.getTime() + (1000 * expires_in);
      dispatch(setCredentials({
        user: { login: 'root' },
        token: hashParams.access_token,
        expires_at: expires_in ? expirationTime : null}));
    }
  }, [dispatch]);

  const initialRoute = hashParams.state;
  return (<Navigate to={(initialRoute && initialRoute !== 'undefined') ? initialRoute : '/'}/>);
}

export default OAuth;

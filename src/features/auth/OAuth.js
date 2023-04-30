import { Navigate } from 'react-router-dom';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';
import { getLocalLocation, isTokenExpired, popLocalLocation, setLocalTokenInfo } from './oauthUtils';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useEffect } from 'react';

const hashParams = getHashParams();
removeHashParamsFromUrl();

export function OAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    popLocalLocation(hashParams.state);
  }, [hashParams.state])

  if (hashParams && hashParams.access_token) {
    const tokenInfo = setLocalTokenInfo(hashParams);
    dispatch(setCredentials({
      isGuest: false,
      authorized: !isTokenExpired(tokenInfo),
      expires_at: tokenInfo.expires_at
    }));
    const initialRoute = getLocalLocation(hashParams.state);
    return (<Navigate to={ (initialRoute && initialRoute !== 'undefined') ? initialRoute : '/' }/>);
  }

  return (<Navigate to="/error"/>);
}

export default OAuth;

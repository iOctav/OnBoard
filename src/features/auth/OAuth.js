import { Navigate } from 'react-router-dom';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';
import { isTokenExpired, popLocalLocation, setLocalTokenInfo } from './oauthUtils';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

const hashParams = getHashParams();
removeHashParamsFromUrl();

export function OAuth() {
  const dispatch = useDispatch();

  if (hashParams && hashParams.access_token) {
    const tokenInfo = setLocalTokenInfo(hashParams);
    dispatch(setCredentials({
      isGuest: false,
      authorized: !isTokenExpired(tokenInfo),
      expires_at: tokenInfo.expires_at
    }));
    const initialRoute = popLocalLocation(hashParams.state);
    return (<Navigate to={ (initialRoute && initialRoute !== 'undefined') ? initialRoute : '/' }/>);
  }

  return (<Navigate to="/error"/>);
}

export default OAuth;

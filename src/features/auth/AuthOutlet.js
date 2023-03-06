import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react';
import { setCredentials } from './authSlice';
import { useDispatch } from 'react-redux';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';
import { getAuthorizeHref } from './oauthConfig';

const hashParams = getHashParams();
removeHashParamsFromUrl();

export function AuthOutlet() {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (hashParams.access_token) {
      const expires_in = hashParams.expires_in;
      const now = new Date();
      let expirationDate = new Date(now.getTime() + (1000 * expires_in));
      dispatch(setCredentials({
        user: {login: 'root'},
        token: hashParams.access_token,
        expires_at: expires_in ? expirationDate : null}));
    }
  }, [dispatch]);

  if (!auth.user) {
    return (<button
      aria-label="Log in using Youtrack HUB OAuth 2.0"
      onClick={() => window.open(getAuthorizeHref(), '_self')}
    >Log in</button>)
  }

  return (<Outlet />);
}

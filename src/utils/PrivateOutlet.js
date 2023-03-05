import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react';
import { setCredentials } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const access_token = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {})?.access_token;

export function PrivateOutlet() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    if (access_token) {
      dispatch(setCredentials({ user: {login: 'root'}, token: access_token }));
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth.user) {
    return (<button
      aria-label="Log in using OAuth 2.0"
      onClick={() => window.open( process.env.REACT_APP_YOUTRACK_FULL_AUTH_URI_TEMP, '_self')}
    >Log in</button>)
  }

  return (<Outlet />);
}

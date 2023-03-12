import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react';
import { getAuthorizeHref } from './oauthConfig';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';

function AuthOutlet() {
  const auth = useAuth();
  const location = useLocation()

  useEffect(() => {
    if (!auth.user) {
      window.open(getAuthorizeHref(location.pathname), '_self')
    }
  }, [auth, location.pathname]);

  if (!auth.user) {
    return (<LoaderScreen/>)
  }
  return (<Outlet />);
}

export default AuthOutlet;

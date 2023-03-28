import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react';
import { getAuthorizeHref } from './oauthConfig';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';

function AuthOutlet() {
  const auth = useAuth();
  const location = useLocation()
  const currentPath = location.pathname;

  useEffect(() => {
    if (!auth.user) {
      window.open(getAuthorizeHref(currentPath), '_self')
    }
  }, [auth, currentPath]);

  if (!auth.user) {
    return (<LoaderScreen/>)
  }
  return (<Outlet />);
}

export default AuthOutlet;

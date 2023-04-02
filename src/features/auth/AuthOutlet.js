import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react';
import { getAuthorizeHref, setLocalState } from './oauthConfig';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';

function AuthOutlet() {
  const auth = useAuth();
  const location = useLocation()
  const currentUrl = location.pathname + location.search;

  useEffect(() => {
    if (!auth.user) {
      const stateKey = setLocalState(currentUrl);
      window.open(getAuthorizeHref(stateKey), '_self')
    }
  }, [auth, currentUrl]);

  if (!auth.user) {
    return (<LoaderScreen/>)
  }
  return (<Outlet />);
}

export default AuthOutlet;

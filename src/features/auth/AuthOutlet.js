import { Outlet, useLocation } from 'react-router-dom'
import { getAuthorizeHref, setLocalState } from './oauthUtils';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const redirectToAuth = (currentUrl) => {
  const stateKey = setLocalState(currentUrl);
  window.open(getAuthorizeHref(stateKey), '_self')
}

function AuthOutlet() {
  const { authInfo } = useAuth();
  const location = useLocation()
  const currentUrl = location.pathname + location.search;

  useEffect(() => {
    if ((!authInfo.authorized)) {
      redirectToAuth(currentUrl);
    }
  }, [authInfo]);

  if (!authInfo.authorized) {
    return <LoaderScreen/>;
  }

  return (<Outlet/>);
}

export default AuthOutlet;

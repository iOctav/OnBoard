import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as smallObLogo } from '../PageYTHeader/ob-logo-small.svg';
import ErrorMessage from '@jetbrains/ring-ui/dist/error-message/error-message';
import { homePageUri } from '../../services/linkService';


function RedirectPage() {
  const location = useLocation();
  const [seconds, setSeconds] = useState(3);
  const redirectUrl = process.env.REACT_APP_YOUTRACK_BASE_URL + location.pathname;
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (seconds === 1) {
          window.location.replace(redirectUrl);
        }
        seconds && setSeconds(seconds - 1);
      }, 1000,
    );
    return () => clearInterval(interval);
  }, [seconds, redirectUrl]);
  return (
    <ErrorMessage icon={smallObLogo}
                  message={`Will redirect to YouTrack in ${seconds} seconds...`}
                  description={`${redirectUrl}`}>
      <Link to={homePageUri()}>Go to the home page</Link>
    </ErrorMessage>);
}

export default RedirectPage

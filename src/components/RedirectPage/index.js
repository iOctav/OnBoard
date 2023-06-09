import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as smallObLogo } from '../PageYTHeader/logos/ob-logo-small.svg';
import ErrorMessage from '@jetbrains/ring-ui/dist/error-message/error-message';
import { homePageUri } from '../../services/linkService';

function RedirectPage({redirectTimeout}) {
  const location = useLocation();
  const [seconds, setSeconds] = useState(redirectTimeout > 0 ? Math.ceil(redirectTimeout) : 1);
  const redirectUrl = process.env.REACT_APP_YOUTRACK_BASE_URL + location.pathname + location.search;
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

RedirectPage.propTypes = {
  redirectTimeout: PropTypes.number,
};

export default RedirectPage;

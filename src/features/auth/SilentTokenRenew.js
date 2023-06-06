import { useEffect, useState } from 'react';
import {
  getAuthorizeHref,
  getLocalTokenInfo,
  getOAuthRedirectUrl,
  isTokenExpired,
  popOAuthRedirectUrl,
  setLocalTokenInfo
} from './oauthUtils';
import { extractHashParamsFromRedirectUrl } from '../../utils/hashUtils';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

function SilentTokenRenew() {
  const dispatch = useDispatch();
  const [ renewing, setRenewing ] = useState(false);
  useEffect(() => {
    const timeInterval = setInterval(handleCheckToken, 20000);
    return () => clearInterval(timeInterval);
  });

  let currentAttempt = 0;
  const maxNumberOfAttempts = 20;
  let stateId = null;
  let checkTimeInterval = undefined;

  const willTokenExpire = () => {
    const token = getLocalTokenInfo();

    return isTokenExpired(token);
  };

  const handleCheckToken = () => {
    if (willTokenExpire()) {
      setRenewing(true);
      clearInterval(checkTimeInterval);
    }
  };

  const silentRenew = () => {
    return new Promise((resolve, reject) => {
      const checkRedirect = () => {
        const redirectUrl = getOAuthRedirectUrl(stateId);
        if (!redirectUrl) {
          currentAttempt += 1;
          if (currentAttempt > maxNumberOfAttempts) {
            reject({
              message: 'Silent renew failed after maximum number of attempts.',
              short: 'max_number_of_attempts_reached',
            });
            return;
          }
          setTimeout(() => checkRedirect(), 500);
          return;
        }

        popOAuthRedirectUrl(stateId);

        // Put some more error handlers here

        // Silent renew worked as expected, lets update the access token
        const hashParams = extractHashParamsFromRedirectUrl(redirectUrl);
        const tokenInfo = setLocalTokenInfo(hashParams);
        dispatch(setCredentials({
          isGuest: false,
          authorized: !isTokenExpired(tokenInfo),
          expires_at: tokenInfo.expires_at
        }));
        resolve(tokenInfo);
      }

      checkRedirect();
    });
  };

  const handleOnLoad = () => {
    silentRenew()
      .then(() => {
        setRenewing(false);
        currentAttempt = 0
        checkTimeInterval = setInterval(handleCheckToken, 60000)
      })
      .catch(error => {
        setRenewing(false);
      });
  }

  const renderIframe = () => {
    stateId = uuidv4();
    const url = getAuthorizeHref(stateId, true);

    return (
      <iframe data-testid='silent-token-renew'
        style={{ width: 0, height: 0, position: 'absolute', left: 0, top: 0, display: 'none', visibility: 'hidden' }}
        width={0}
        height={0}
        title="silent-token-renew"
        src={url}
        onLoad={handleOnLoad}
      />
    );
  }

  return renewing ? renderIframe() : null;
}

export default SilentTokenRenew;

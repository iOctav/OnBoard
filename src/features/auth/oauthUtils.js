import { trimLastSlash } from '../../utils/uriUtils';
import { v4 as uuidv4 } from 'uuid';

const restoreLocationStorageKey = (state) => `oauth2_${process.env.REACT_APP_YOUTRACK_CLIENT_ID}_state_${state}`;
const tokensStorageKey = `${process.env.REACT_APP_YOUTRACK_CLIENT_ID}_token_info`;

export const getAuthorizeHref = (state) => {
  const authEndpoint = trimLastSlash(process.env.REACT_APP_AUTHORIZATION_ENDPOINT);
  const clientId = process.env.REACT_APP_YOUTRACK_CLIENT_ID;
  const redirectUri = trimLastSlash(process.env.REACT_APP_REDIRECT_URI);
  const scopes = process.env.REACT_APP_YOUTRACK_SCOPES.split(' ') ?? [ clientId ];
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&request_credentials=default&state=${state}`;
}

export const setLocalState = (restoreLocation) => {
  const stateKey = uuidv4();
  const localStorageKey = restoreLocationStorageKey(stateKey);
  localStorage.setItem(localStorageKey, restoreLocation);
  return stateKey;
}

export const popLocalLocation = (state) => {
  const localStorageKey = restoreLocationStorageKey(state);
  const restoreLocation = localStorage.getItem(localStorageKey);
  localStorage.removeItem(localStorageKey);
  return restoreLocation;
}

export const setLocalTokenInfo = (hashParams) => {
  const expires_in = hashParams.expires_in;
  const now = new Date();
  let expirationTime = now.getTime() + (1000 * expires_in);
  const tokenInfo = {
    access_token: hashParams.access_token,
    expires_at: expires_in ? expirationTime : null
  };
  localStorage.setItem(tokensStorageKey, JSON.stringify(tokenInfo));
  return tokenInfo;
}

export const getLocalTokenInfo = () => {
  return JSON.parse(localStorage.getItem(tokensStorageKey) || '{}');
}

import { trimLastSlash } from '../../utils/uriUtils';
import { v4 as uuidv4 } from 'uuid';

const restoreLocationStorageKey = (state) => `oauth2_${process.env.REACT_APP_YOUTRACK_CLIENT_ID}_state_${state}`;

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

export const getLocalLocation = (state) => {
  const localStorageKey = restoreLocationStorageKey(state);
  return localStorage.getItem(localStorageKey);
}

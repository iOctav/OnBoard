import { trimLastSlash } from '../../utils/uriUtils';

export const getAuthorizeHref = () => {
  const authEndpoint = trimLastSlash(process.env.REACT_APP_AUTHORIZATION_ENDPOINT);
  const clientId = process.env.REACT_APP_YOUTRACK_CLIENT_ID;
  const redirectUri = trimLastSlash(process.env.REACT_APP_REDIRECT_URI);
  const scopes = process.env.REACT_APP_YOUTRACK_SCOPES.split(' ') ?? [ clientId ];
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&request_credentials=default`;
}
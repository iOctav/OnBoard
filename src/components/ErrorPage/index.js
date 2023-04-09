import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as smallObLogo } from '../PageYTHeader/ob-logo-small.svg';
import ErrorMessage from '@jetbrains/ring-ui/dist/error-message/error-message';
import { homePageUri } from '../../services/linkService';


function ErrorPage({message, description}) {
  return (
    <ErrorMessage icon={smallObLogo}
                  message={message || 'Something went wrong'}
                  description={description || 'Contact with administrator'}>
      <Link to={homePageUri()}>Go to the home page</Link>
    </ErrorMessage>);
}

ErrorPage.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string
}

export default ErrorPage

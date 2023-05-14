import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as smallObLogo } from '../PageYTHeader/logos/ob-logo-small.svg';
import ErrorMessage from '@jetbrains/ring-ui/dist/error-message/error-message';
import { homePageUri } from '../../services/linkService';
import Button from '@jetbrains/ring-ui/dist/button/button';


function ErrorPage({message, description, buttonTitle, onClick}) {
  return (
    <ErrorMessage icon={smallObLogo}
                  message={message || 'Something went wrong'}
                  description={description || 'Contact with administrator'}>
      {buttonTitle
        ? <Button text onClick={onClick}>{buttonTitle}</Button>
        : <Link to={homePageUri()}>Go to the home page</Link>}
    </ErrorMessage>);
}

ErrorPage.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string
}

export default ErrorPage

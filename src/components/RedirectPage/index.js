import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RedirectPage() {
  const location = useLocation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace(process.env.REACT_APP_YOUTRACK_BASE_URL + location.pathname);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
}

export default RedirectPage

import i18n from 'i18next';

export const ytErrorHandler = (error) => {
  let errorMessage = '';
  let errorDescription = '';
  let errorTitle = '';
  switch (error.error) {
    case 'invalid_query':
      errorMessage = i18n.t('Incorrect query syntax') + `: ${error?.error_children[0]?.error}`;
      errorTitle = i18n.t('Oops! Something went wrong with your search request');
      errorDescription = error?.error_children[0]?.error;
      break;
    default:
      errorTitle = i18n.t('Oops! Something went wrong while loading the sprint');
      errorMessage = error?.error;
  }

  return {errorTitle, errorMessage, errorDescription};
};

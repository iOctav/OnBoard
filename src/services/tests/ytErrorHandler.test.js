import { ytErrorHandler } from '../ytErrorHandler';

jest.mock('i18next', () => ({
  t: (str) => str,
}));

describe('ytErrorHandler', () => {
  it('handles "invalid_query" error', () => {
    const error = {
      error: 'invalid_query',
      error_children: [
        {
          error: 'invalid_query_child_error',
        },
      ],
    };

    const { errorTitle, errorMessage, errorDescription } = ytErrorHandler(error);
    expect(errorTitle).toBe('Oops! Something went wrong with your search request');
    expect(errorMessage).toBe('Incorrect query syntax: invalid_query_child_error');
    expect(errorDescription).toBe('invalid_query_child_error');
  });

  it('handles other errors', () => {
    const error = {
      error: 'other_error',
    };

    const { errorTitle, errorMessage, errorDescription } = ytErrorHandler(error);
    expect(errorTitle).toBe('Oops! Something went wrong while loading the sprint');
    expect(errorMessage).toBe('other_error');
    expect(errorDescription).toBe('');
  });

  it('handles error with no message', () => {
    const error = {};

    const { errorTitle, errorMessage, errorDescription } = ytErrorHandler(error);
    expect(errorTitle).toBe('Oops! Something went wrong while loading the sprint');
    expect(errorMessage).toBeUndefined();
    expect(errorDescription).toBe('');
  });
});

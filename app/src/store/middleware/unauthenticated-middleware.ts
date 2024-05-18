import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { resetStateAction } from '@store/actions/reset-state';

/**
 * Middleware for handling unauthenticated responses from API requests.
 * If an action is rejected with a value and the status code is 401 (unauthenticated),
 * it dispatches the resetStateAction to clear the application state.
 */

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action?.payload?.status === 401) {
      dispatch(resetStateAction());
    }

    return next(action);
  };

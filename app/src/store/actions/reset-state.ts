import { createAction } from '@reduxjs/toolkit';

/**
 * Action type constant for resetting the application state.
 */
export const RESET_STATE_ACTION_TYPE = 'resetState';

/**
 * Action creator function for creating a reset state action.
 * This action is dispatched to reset the application state.
 */
export const resetStateAction = createAction(RESET_STATE_ACTION_TYPE, () => {
  return { payload: null };
});

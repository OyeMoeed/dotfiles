import { SLICE_NAMES } from '@app/store/constants.store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

/**
 * Interface representing the initial state shape for localization settings.
 */
interface RatingStateProps {
  shouldShowRate?: boolean;
  savedDate?: string;
  isFirstLogin?: boolean;
}

/**
 * Initial state for the localization slice.
 */
const initialState: RatingStateProps = {
  shouldShowRate: false,
  savedDate: moment().toString(),
  isFirstLogin: true,
};

const returnStateIfUndefined = <T extends keyof RatingStateProps>(
  key: T,
  action: PayloadAction<RatingStateProps>,
  state: RatingStateProps,
): RatingStateProps[T] => {
  if (action?.payload?.[key] === undefined) {
    return state?.[key];
  }
  return action?.payload?.[key];
};

/**
 * Slice for managing localization settings in the Redux store.
 */
export const ratingSlice = createSlice({
  name: SLICE_NAMES.RATING_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the localization flag in the state.
     * @param state - The current state of the localization slice.
     * @param action - The action containing the localization flag payload.
     */
    setRatingData(state, action: PayloadAction<RatingStateProps>) {
      state.shouldShowRate = returnStateIfUndefined('shouldShowRate', action, state);
      state.savedDate = returnStateIfUndefined('savedDate', action, state);
      state.isFirstLogin = returnStateIfUndefined('isFirstLogin', action, state);
    },
  },
});

/**
 * Action creator for setting the localization flag.
 */
export const { setRatingData } = ratingSlice.actions;

/**
 * Reducer function for the localization slice.
 */
export default ratingSlice.reducer;

import { SLICE_NAMES } from '@app/store/constants.store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * Interface representing the initial state shape for localization settings.
 */
interface RatingStateProps {
  didUserRateApp?: boolean;
  shouldShowRate?: boolean;
}

/**
 * Initial state for the localization slice.
 */
const initialState: RatingStateProps = {
  didUserRateApp: false,
  shouldShowRate: false,
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
      state.didUserRateApp = action.payload?.didUserRateApp || state.didUserRateApp;
      state.shouldShowRate = action.payload?.shouldShowRate || state.shouldShowRate;
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

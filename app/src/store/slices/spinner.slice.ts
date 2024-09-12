import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaySpinnerProps } from '@app/components/atoms/ipay-spinner/ipay-spinner-interface';
import { spinnerVariant } from '@app/utilities/enums.util';
import { SLICE_NAMES } from '../constants.store';

interface SpinnerState {
  visible: boolean;
  spinnerProps: IPaySpinnerProps;
}

const initialState: SpinnerState = {
  visible: false,
  spinnerProps: {
    variant: spinnerVariant.DEFAULT,
    hasBackgroundColor: true,
  },
};

const spinnerSlice = createSlice({
  name: SLICE_NAMES.ALERT_SLICE,
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.visible = true;
    },
    hideSpinner: (state) => {
      state.visible = false;
    },
    setSpinnerProps: (state, action: PayloadAction<IPaySpinnerProps>) => {
      state.spinnerProps = action.payload;
    },
  },
});

export const { showSpinner, hideSpinner, setSpinnerProps } = spinnerSlice.actions;

export default spinnerSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing the initial state shape for user information.
 */
interface UserInformationProps {
  userInfo: {
    walletNumber?: string;
    mobileNumber?: string;
    firstName?: string;
    fatherName?: string;
    grandFatherName?: string;
    nickName?: string;
    familyName?: string;
    fullName?: string;
    availableBalance?: string;
    poiNumber?: string;
    walletTier?: string;
    walletStatus?: string;
    idExpired?: boolean;
    dormant?: boolean;
    passwordMigrated?: boolean;
    nationalAddressComplete?: boolean;
    basicTier?: boolean;
    accountBasicInfoCompleted?: boolean;
    bioRecognition?: boolean;
    pep?: boolean;
    walletRisk?: string;
    userUnderReview?: boolean;
    correctDeviceId?: boolean;
    newMember?: boolean;
    hasInmaAccount?: boolean;
    hasErsalAccount?: boolean;
    viban?: string;
  };
}

/**
 * Initial state for the user info slice.
 */
const initialState: UserInformationProps = {
  userInfo: {},
};

/**
 * Slice for managing user info in the Redux store.
 */
const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    /**
     * Reducer function for setting the user info.
     * @param state - The current state of the user info slice.
     * @param action - The action containing the user info payload.
     */
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
  },
});

/**
 * Action creators for setting the user info and login data.
 */
export const { setUserInfo } = userInfoSlice.actions;

/**
 * Reducer function for the user info slice.
 */
export default userInfoSlice.reducer;

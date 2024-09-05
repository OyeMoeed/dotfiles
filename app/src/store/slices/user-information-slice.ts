import { WALLET_TIERS } from '@app/constants/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
    profileImage?: string;
    myBeneficiaryId: string;
    otpTimeout: string;
  };
}

/**
 * Initial state for the user info slice.
 */
const initialState: UserInformationProps = {
  userInfo: {
    myBeneficiaryId: '2342342344',
    otpTimeout: '60',
  },
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
      state.userInfo = { ...state.userInfo, ...action.payload };
    },

    resetUserInfo(state) {
      state.userInfo = initialState.userInfo;
    },
  },
});

/**
 * Action creators for setting the user info and login data.
 */
export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;

/**
 * Selectors for setting the user info and login data.
 */
export const isBasicTierSelector = (state: RootState) => {
  const { basicTier, walletTier } = state.userInfoReducer.userInfo;
  return walletTier === WALLET_TIERS.BASIC && basicTier;
};

/**
 * Reducer function for the user info slice.
 */
export default userInfoSlice.reducer;

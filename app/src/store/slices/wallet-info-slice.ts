import { WALLET_TIERS } from '@app/constants/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
import { RootState } from '../store';
import { WalletInformationProps } from './wallet-information.interface';

/**
 * Initial state for the wallet info slice.
 */
const initialState: WalletInformationProps = {
  walletInfo: {
    currentBalance: '',
    walletNumber: '',
    walletType: '',
    walletStatus: '',
    createdAt: '',
    walletTier: '',
    availableBalance: '',
    qrBeforeLogin: false,
    bioRecognised: false,
    limitsDetails: {
      monthlyIncomingLimit: '',
      monthlyOutgoingLimit: '',
      dailyIncomingLimit: '',
      dailyOutgoingLimit: '',
      monthlyRemainingIncomingAmount: '',
      monthlyRemainingOutgoingAmount: '',
      dailyRemainingIncomingAmount: '',
      dailyRemainingOutgoingAmount: '',
    },
    dormant: false,
    idExpired: false,
    aboutToExpire: false,
    remainingNumberOfDaysToExpire: '',
    expiryDate: '',
    passwordMigrated: false,
    nationalAddressComplete: false,
    basicTier: false,
    accountBasicInfoCompleted: false,
    bioRecognition: false,
    addressDetails: {
      district: '',
      street: '',
      buildingNumber: '',
      unitNumber: '',
      poBox: '',
      additionalNumber: '',
    },
    userContactInfo: {
      preferedLanguage: '',
      address: '',
      postalCode: '',
      city: '',
      townCountry: '',
      mobileNumber: '',
      owner: '',
      realUser: null,
      moiRegistred: null,
      email: '',
      cityDesc: '',
    },
    workDetails: {
      occupation: '',
      occupationDesc: '',
      industry: '',
      industryDesc: '',
      jobTitle: null,
    },
    accountBasicInfo: {
      incomeSource: '',
      incomeAmount: null,
      jobTitle: null,
      monthlyIncomeAmount: '',
      industry: '',
      occupation: '',
      industryDesc: '',
      occupationDesc: '',
      nationality: '',
    },
    hasVat: false,
    firstName: '',
    fatherName: '',
    grandFatherName: '',
    familyName: '',
    fullName: '',
    pep: false,
    walletRisk: '',
    userUnderReview: false,
    userPreferences: {
      hasGifts: false,
      hasMoneyRequests: false,
    },
    viban: '',
    mobileNumber: '',
    nickName: '',
    poiNumber: '',
    correctDeviceId: false,
    newMember: false,
    hasInmaAccount: false,
    hasErsalAccount: false,
    profileImage: '',
    myBeneficiaryId: '',
    otpTimeout: '',
  },
  cashWithdrawalCardsList: [],
};

/**
 * Slice for managing wallet info in the Redux store.
 */
const walletInfoSlice = createSlice({
  name: SLICE_NAMES.WALLET_INFO_SLICE,
  initialState,
  reducers: {
    /**
     * Reducer function for setting the wallet info.
     * @param state - The current state of the wallet info slice.
     * @param action - The action containing the wallet info payload.
     */
    // setWalletInfo(state, action: PayloadAction<any>) {
    //   state.walletInfo = action.payload;
    // },
    setWalletInfo(state, action: PayloadAction<any>) {
      state.walletInfo = {
        ...state.walletInfo,
        ...action.payload, // Merge the new data with the existing walletInfo
      };
    },

    resetWalletInfo(state) {
      state.walletInfo = initialState.walletInfo;
    },

    setCashWithdrawalCardsList(state, action: PayloadAction<string[]>) {
      state.cashWithdrawalCardsList = action.payload;
    },

    resetCashWithdrawalCardsList(state) {
      state.cashWithdrawalCardsList = initialState.cashWithdrawalCardsList;
    },
  },
});

/**
 * Action creators for setting the wallet info and login data.
 */
export const { setWalletInfo, resetWalletInfo, setCashWithdrawalCardsList } = walletInfoSlice.actions;

/**
 * Selectors for setting the user info and login data.
 */
export const isBasicTierSelector = (state: RootState) => {
  const { basicTier, walletTier } = state.walletInfoReducer.walletInfo;
  return walletTier === WALLET_TIERS.BASIC && basicTier;
};

/**
 * Reducer function for the wallet info slice.
 */
export default walletInfoSlice.reducer;

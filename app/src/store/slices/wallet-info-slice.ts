import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

/**
 * Initial state for the wallet info slice.
 */
const initialState = {
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
      townCountry: null,
      mobileNumber: '',
      owner: '',
      realUser: null,
      moiRegistred: null,
      email: null,
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
      nationality: null,
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
  },
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
  },
});

/**
 * Action creators for setting the wallet info and login data.
 */
export const { setWalletInfo } = walletInfoSlice.actions;

/**
 * Reducer function for the wallet info slice.
 */
export default walletInfoSlice.reducer;

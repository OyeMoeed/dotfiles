import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';
import { WalletInformationProps } from './wallet-information.interface';

/**
 * Initial state for the wallet info slice.
 */
const initialState: WalletInformationProps = {
  walletInfo: {
    fatherName: '',
    qrBeforeLogin: false,
    accountBasicInfoCompleted: false,
    userUnderReview: false,
    walletType: '',
    grandFatherName: '',
    basicTier: false,
    addressDetails: {
      poBox: '',
      street: '',
      district: '',
      additionalNumber: '',
      buildingNumber: '',
      unitNumber: '',
    },
    viban: '',
    availableBalance: '',
    createdAt: '',
    limitsDetails: {
      dailyIncomingLimit: '',
      dailyRemainingIncomingAmount: '',
      monthlyRemainingOutgoingAmount: '',
      monthlyIncomingLimit: '',
      dailyRemainingOutgoingAmount: '',
      dailyOutgoingLimit: '',
      monthlyOutgoingLimit: '',
      monthlyRemainingIncomingAmount: '',
    },
    familyName: '',
    userPreferences: {
      hasGifts: false,
      hasMoneyRequests: false,
    },
    accountBasicInfo: {
      occupationDesc: '',
      occupation: '',
      nationality: '',
      jobTitle: null,
      monthlyIncomeAmount: '',
      incomeAmount: null,
      industry: '',
      incomeSource: '',
      industryDesc: '',
    },
    pep: false,
    bioRecognition: false,
    walletNumber: '',
    nationalAddressComplete: false,
    currentBalance: '',
    bioRecognised: false,
    userContactInfo: {
      owner: null,
      realUser: null,
      cityDesc: '',
      address: '',
      city: '',
      mobileNumber: '',
      postalCode: '',
      preferedLanguage: '',
      moiRegistred: null,
      townCountry: '',
      email: '',
    },
    fullName: '',
    passwordMigrated: false,
    hasVat: false,
    walletTier: '',
    firstName: '',
    dormant: false,
    walletStatus: '',
    idExpired: false,
    walletRisk: '',
    workDetails: {
      occupationDesc: '',
      occupation: '',
      jobTitle: null,
      industry: '',
      industryDesc: '',
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

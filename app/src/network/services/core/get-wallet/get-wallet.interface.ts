import { MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface WalletNumberProp {
  walletNumber: string;
  hideSpinner?: boolean;
  hideError?: boolean;
}

// Define the AddressDetails interface
interface AddressDetails {
  poBox: string;
  street: string;
  district: string;
  additionalNumber: string;
  buildingNumber: string;
  unitNumber: string;
}

// Define the LimitsDetails interface
interface LimitsDetails {
  dailyIncomingLimit: string;
  dailyRemainingIncomingAmount: string;
  monthlyRemainingOutgoingAmount: string;
  monthlyIncomingLimit: string;
  dailyRemainingOutgoingAmount: string;
  dailyOutgoingLimit: string;
  monthlyOutgoingLimit: string;
  monthlyRemainingIncomingAmount: string;
}

// Define the UserPreferences interface
interface UserPreferences {
  hasGifts: boolean;
  hasMoneyRequests: boolean;
}

// Define the AccountBasicInfo interface
interface AccountBasicInfo {
  occupationDesc: string;
  occupation: string;
  nationality: string;
  jobTitle: string | null;
  monthlyIncomeAmount: string;
  incomeAmount: string | null;
  industry: string;
  incomeSource: string;
  industryDesc: string;
}

// Define the UserContactInfo interface
interface UserContactInfo {
  owner: string | null;
  realUser: string | null;
  cityDesc: string;
  address: string;
  city: string;
  mobileNumber: string;
  postalCode: string;
  preferedLanguage: string;
  moiRegistred: string | null;
  townCountry: string;
  email: string;
}

// Define the WorkDetails interface
interface WorkDetails {
  occupationDesc: string;
  occupation: string;
  jobTitle: string | null;
  industry: string;
  industryDesc: string;
}

// Define the Response interface
interface GetWalletResponse {
  fatherName: string;
  qrBeforeLogin: boolean;
  accountBasicInfoCompleted: boolean;
  userUnderReview: boolean;
  walletType: string;
  grandFatherName: string;
  basicTier: boolean;
  addressDetails: AddressDetails;
  viban: string;
  availableBalance: string;
  createdAt: string;
  limitsDetails: LimitsDetails;
  familyName: string;
  userPreferences: UserPreferences;
  accountBasicInfo: AccountBasicInfo;
  pep: boolean;
  bioRecognition: boolean;
  walletNumber: string;
  nationalAddressComplete: boolean;
  currentBalance: string;
  bioRecognised: boolean;
  userContactInfo: UserContactInfo;
  fullName: string;
  passwordMigrated: boolean;
  hasVat: boolean;
  walletTier: string;
  firstName: string;
  dormant: boolean;
  walletStatus: string;
  idExpired: boolean;
  aboutToExpire: boolean;
  expiryDate: string;
  remainingNumberOfDaysToExpire: string;
  walletRisk: string;
  workDetails: WorkDetails;
  isIdRenewalSheetVisible: boolean;
  mobileNumber?: string;
  nickName?: string;
  poiNumber?: string;
  correctDeviceId?: boolean;
  newMember?: boolean;
  hasInmaAccount?: boolean;
  hasErsalAccount?: boolean;
  profileImage?: string;
  myBeneficiaryId: string;
  otpTimeout: string;
}

// Define the Data interface
interface GetWalletDataProps extends MockAPIDataProps {
  response: GetWalletResponse;
}

// Extend the GetWalletMockProps interface from the two other interfaces
interface GetWalletMockProps extends MockAPIOkProp {
  data: GetWalletDataProps;
}

export { GetWalletMockProps, GetWalletResponse, WalletNumberProp, GetWalletDataProps };

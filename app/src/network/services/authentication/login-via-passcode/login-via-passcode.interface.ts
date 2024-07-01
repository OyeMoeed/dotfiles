import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface LoginViaPasscodeProps {
  password: string;
  userName: string;
  transactionId: string;
  deviceInfo: DeviceInfoProps;
}

// Define the LoginViaPasscodeResponseDetails interface
interface LoginViaPasscodeResponseDetails {
  walletNumber: string;
  mobileNumber: string;
  availableBalance: string;
  poiNumber: string;
  walletTier: string;
  walletStatus: string;
  idExpired: boolean;
  dormant: boolean;
  passwordMigrated: boolean;
  nationalAddressComplete: boolean;
  basicTier: boolean;
  accountBasicInfoCompleted: boolean;
  bioRecognition: boolean;
  otpTimeout: string;
  correctDeviceId: boolean;
  newMember: boolean;
  hasInmaAccount: boolean;
  hasErsalAccount: boolean;
  pep: boolean;
  walletRisk: string;
  userUnderReview: boolean;
  viban: string;
}

// Define the LoginViaPasscodeDataProps interface that extends MockAPIDataProps with a specific response
interface LoginViaPasscodeDataProps extends MockAPIDataProps {
  response: LoginViaPasscodeResponseDetails;
}

// Extend the LoginViaPasscodeResponse interface from LoginViaPasscodeDataProps and MockAPIOkProp
interface LoginViaPasscodeResponseProps extends MockAPIOkProp {
  data: LoginViaPasscodeDataProps;
}

export { LoginViaPasscodeProps, LoginViaPasscodeResponseProps };

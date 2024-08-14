import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface AuthApiResponse {
  statusCode?: string;
  data?: object;
}
interface LoginUserPayloadProps {
  username: string;
  poi: string;
  transactionId?: string;
  authentication: { transactionId: any };
  deviceInfo: DeviceInfoProps;
}

// Define the LoginResponseDetails interface
interface LoginResponseDetails {
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
  otpRef?: string;
}

// Define the LoginDataProps interface that extends MockAPIDataProps with a specific response
interface LoginDataProps extends MockAPIDataProps {
  response: LoginResponseDetails;
}

// Extend the LoginApiResponse interface from LoginDataProps and MockAPIOkProp
interface LoginApiMockResponseProps extends MockAPIOkProp {
  data: LoginDataProps;
}

export { AuthApiResponse, DeviceInfoProps, LoginApiMockResponseProps, LoginUserPayloadProps ,LoginResponseDetails };

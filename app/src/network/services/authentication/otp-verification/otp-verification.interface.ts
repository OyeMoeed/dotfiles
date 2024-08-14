import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface OtpVerificationProps {
  username?: string;
  password?: string;
  poi?: string;
  otp?: string;
  otpRef?: string;
  transactionId?: string;
  authentication?: { transactionId?: string };
  deviceInfo?: DeviceInfoProps;
}

// Define the ValidateOtpResponseDetails interface
interface ValidateOtpResponseDetails {
  walletNumber: string;
  mobileNumber: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  nickName: string;
  familyName: string;
  fullName: string;
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
  pep: boolean;
  walletRisk: string;
  userUnderReview: boolean;
  correctDeviceId: boolean;
  newMember: boolean;
  hasInmaAccount: boolean;
  hasErsalAccount: boolean;
  viban: string;
}

// Define the ValidateOtpDataProps interface that extends MockAPIDataProps with a specific response
interface ValidateOtpDataProps extends MockAPIDataProps {
  response: ValidateOtpResponseDetails;
}

// Extend the ValidateOtpMockProps interface from ValidateOtpDataProps and MockAPIOkProp
interface ValidateOtpMockProps extends MockAPIOkProp {
  data: ValidateOtpDataProps;
}

export { OtpVerificationProps, ValidateOtpMockProps };

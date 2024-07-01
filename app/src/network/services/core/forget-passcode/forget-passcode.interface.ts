import { MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface ForgetPasscodeProps {
  poiNumber: string;
  mobileNumber: string;
  walletNumber: string;
  passCode: string;
  otp: string;
  otpRef: string;
  migratePassword: false;
  authentication: string;
  deviceInfo: string;
}

// Define the ForgetPasscodeResponseDetails interface
interface ForgetPasscodeResponseDetails {
  redirectToLogin: boolean;
}

// Define the ForgetPasscodeDataProps interface that extends MockAPIDataProps with a specific response
interface ForgetPasscodeDataProps extends MockAPIDataProps {
  response: ForgetPasscodeResponseDetails;
}

// Extend the ForgetPasscodeResponse interface from ForgetPasscodeDataProps and MockAPIOkProp
interface ForgetPasscodeResponseProps extends MockAPIOkProp {
  data: ForgetPasscodeDataProps;
}

export { ForgetPasscodeProps, ForgetPasscodeResponseProps };

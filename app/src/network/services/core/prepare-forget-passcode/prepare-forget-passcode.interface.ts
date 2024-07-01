import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface PrepareForgetPasscodeProps {
  poiNumber: string;
  mobileNumber: string;
  transactionId: string;
  deviceInfo: DeviceInfoProps;
}

// Define the PrepareForgetPasscodeResponseDetails interface
interface PrepareForgetPasscodeResponseDetails {
  walletNumber: string;
  otpRef: string;
}

// Define the PrepareForgetPasscodeDataProps interface that extends MockAPIDataProps with a specific response
interface PrepareForgetPasscodeDataProps extends MockAPIDataProps {
  response: PrepareForgetPasscodeResponseDetails;
}

// Extend the PrepareForgetPasscodeMockProps interface from PrepareForgetPasscodeDataProps and MockAPIOkProp
interface PrepareForgetPasscodeMockProps extends MockAPIOkProp {
  data: PrepareForgetPasscodeDataProps;
}

export { PrepareForgetPasscodeMockProps, PrepareForgetPasscodeProps };

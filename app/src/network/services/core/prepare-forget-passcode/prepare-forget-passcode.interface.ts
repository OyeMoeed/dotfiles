import { DeviceInfoProps, MockAPIDataProps, MockAPIOkProp } from '@network/services/services.interface';

interface PrepareForgetPasscodeProps {
  poiNumber: string;
  authentication: { transactionId: string };
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

interface prepareForgetPasscodeOtpRes {
  walletNumber: string;
  otpRef: string;
}
interface validateForgetPasscodeOtpReq {
  poiNumber: string;
  otpRef: string;
  otp: string;
  authentication: { transactionId: string };
  deviceInfo: DeviceInfoProps;
}

interface validateForgetPasscodeOtpRes {
  walletNumber: string;
  otpRef: string;
}

export {
  PrepareForgetPasscodeDataProps, PrepareForgetPasscodeMockProps,
  PrepareForgetPasscodeProps, prepareForgetPasscodeOtpRes, validateForgetPasscodeOtpReq,
  validateForgetPasscodeOtpRes
};


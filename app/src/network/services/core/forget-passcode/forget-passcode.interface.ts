import { DeviceInfoProps } from '../../services.interface';

interface IconfirmForgetPasscodeOtpReq {
  poiNumber: string;
  otpRef: string;
  otp: string;
  walletNumber: string;
  passCode: string;
  authentication: { transactionId: string };
  deviceInfo: DeviceInfoProps;
}

interface IconfirmForgetPasscodeOtpRes {
  redirectToLogin: boolean;
}

export { IconfirmForgetPasscodeOtpReq, IconfirmForgetPasscodeOtpRes };

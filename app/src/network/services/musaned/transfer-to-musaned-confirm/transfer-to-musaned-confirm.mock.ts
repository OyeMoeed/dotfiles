import { TransferToMusanedConfirmMockProps } from './transfer-to-musaned-confirm.interface';

const musanedInquiryMock: TransferToMusanedConfirmMockProps = {
  otpRef: 'OTP24189P6GYR',
  otp: '8104',
  deviceInfo: {
    platformVersion: '10',
    deviceName: 'Apple',
    deviceId: '3EF4A506-B5FF-4956-99ED-51A64B7E4827,Apple,iPhone14,2',
    platform: 'IOS',
  },
  authentication: {
    transactionId: 'TRPAYCbceed9f57e474714aa926eb519501a09',
  },
};

export default musanedInquiryMock;

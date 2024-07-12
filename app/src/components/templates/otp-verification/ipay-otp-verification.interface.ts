export interface IPayOtpVerificationProps {
  testID?: string;
  phoneNumber?: string;
  onPressConfirm?: () => void;
  mobileNumber: string;
  iqamaId: string;
  otpRef: string;
  transactionId: string;
}

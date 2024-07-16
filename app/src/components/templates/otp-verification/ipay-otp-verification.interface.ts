export interface IPayOtpVerificationProps {
  testID?: string;
  phoneNumber?: string;
  onPressConfirm?: (isNewUser: boolean) => void;
  mobileNumber: string;
  iqamaId: string;
  otpRef: string;
  transactionId: string;
}

interface IPayOtpVerificationProps {
  testID?: string;
  mobileNumber?: string;
  setOtp: (otp: string) => void;
  setOtpError: (error: boolean) => void;
  otpError: boolean;
  isLoading?: boolean;
  onPressConfirm?: () => void;
  ref: string;
  isBottomSheet?: boolean;
  handleOnPressHelp?: () => void;
  showHelp?: boolean;
  title?: string;
  timeout?: number;
  onResendCodePress: () => void;
  otp: string;
}
export default IPayOtpVerificationProps;

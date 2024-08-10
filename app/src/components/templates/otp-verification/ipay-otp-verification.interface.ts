interface IPayOtpVerificationProps {
  testID?: string;
  mobileNumber: string;
  setOtp: (otp: string) => void;
  setOtpError: (error: boolean) => void;
  otpError: boolean;
  isLoading?: boolean;
  onPressConfirm?: () => void;
  ref: string;
  apiError: string;
  isBottomSheet?: boolean;
  handleOnPressHelp?: () => void;
  showHelp?: boolean;
  tittle?:string
}
export default IPayOtpVerificationProps;

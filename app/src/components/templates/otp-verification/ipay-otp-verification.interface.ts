import { StyleProp, ViewStyle } from 'react-native';

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
  toastContainerStyle?: StyleProp<ViewStyle>;
  headingContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
  otp: string;
}
export default IPayOtpVerificationProps;

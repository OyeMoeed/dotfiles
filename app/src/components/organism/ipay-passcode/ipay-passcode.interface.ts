import { ViewStyle } from 'react-native';

export interface IPayPasscodeProps {
  testID?: string;
  style?: ViewStyle;
  data: string[];
  onEnterPassCode?: (arg0: string) => void;
  passcodeError?: boolean;
  loginViaPasscode?: boolean;
  forgetPasswordBtn?: boolean;
  onPressForgetPassword?: () => void;
  onPressFaceID?: () => void;
  clearPin?: boolean;
}

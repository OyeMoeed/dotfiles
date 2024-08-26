import { StyleProp, ViewStyle } from 'react-native';

export interface IPayPasscodeProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  data: string[];
  onEnterPassCode?: (arg0: string) => void;
  passcodeError?: boolean;
  loginViaPasscode?: boolean;
  forgetPasswordBtn?: boolean;
  onPressForgetPassword?: () => void;
  onPressFaceID?: () => void;
  btnStyle?: StyleProp<ViewStyle>;
  clearPin?: boolean;
}

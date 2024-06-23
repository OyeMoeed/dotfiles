

import { StyleProp, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native-size-matters';

export interface IPayLinkButtonProps {
  disabled?: boolean;
  testID?: string;
  onPress: () => void;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  width?: number | string;
  buttonColor?: string;
  arrowIconColor?: string;
  btnText: string;
  style?: ViewStyle;
  btnIconsDisabled?: boolean;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  textColor?: string;
  textStyle?:StyleProp<TextStyle>
}

export default IPayLinkButtonProps;

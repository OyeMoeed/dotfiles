import { JSX } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native-size-matters';

export interface IPayPrimaryButtonProps {
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
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  shouldTranslateBtnText?: boolean;
  withAlinmaLogo?: boolean;
}

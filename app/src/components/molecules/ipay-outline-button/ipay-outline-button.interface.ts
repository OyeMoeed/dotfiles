import { JSX } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyle } from 'react-native-size-matters';

export interface IPayOutlineButtonProps {
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
  textStyle?: TextStyle;
  textColor?: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}

import React from 'react';
import { ViewStyle } from 'react-native';

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
  leftIcon?: React.JSX.Element | boolean;
  rightIcon?: React.JSX.Element | boolean;
}

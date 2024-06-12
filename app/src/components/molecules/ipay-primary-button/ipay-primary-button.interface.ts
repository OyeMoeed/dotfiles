import { TextStyle, ViewStyle } from 'react-native';

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
  textStyle?: TextStyle
}

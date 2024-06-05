import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNButton component.
 */
export interface IPayButtonProps {
  /**
   * testID for the flatlist to test the element.
   */
  testID?: string;
  /**
   * Callback function to be executed when the button is pressed.
   */
  onPress: () => void;
  /**
   * Text to be displayed on the button.
   */
  btnText: string;
  /**
   * Style for the button container.
   */
  btnStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the text inside the button.
   */
  textStyle?: TextStyle;
  /**
   * Different variants of button.
   */
  btnType?: 'primary' | 'outline' | 'link-button';
  btnColor?: string;

  btnIconsDisabled?: boolean;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  disabled?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  width?: number | string;
  children?: JSX.Element;
  textColor?: string;
}

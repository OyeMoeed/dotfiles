import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for configuring a Content Not Found component.
 */
export interface ContentNotFoundProps {
  testID?: string;
  /**
   * The title text to be displayed at the top.
   */
  title: string;

  /**
   * Message text to be displayed below the title.
   */
  message?: string;

  /**
   * Callback function to be called when the button is pressed.
   */
  onBtnPress?: () => void;

  /**
   * Icon element to be displayed.
   */
  icon?: React.JSX.Element;

  /**
   * Text to be displayed on the button.
   */
  btnText?: string;

  /**
   * Style for the button
   */
  btnStyle?: StyleProp<ViewStyle>;

  /**
   * Controls button visibility
   */
  isShowButton?: boolean;
}

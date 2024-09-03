// actionSheetProps.ts

import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IPayActionSheetProps {
  testID?: string;
  /**
   * Color used for tinting certain elements of the action sheet, such as buttons or icons.
   */
  tintColor?: string;

  /**
   * Callback function invoked when a button in the action sheet is pressed.
   * @param index The index of the pressed button.
   */
  onPress?: (index: number) => void;

  /**
   * Title of the action sheet. Can be a string or a JSX element for more customization.
   */
  title?: string | JSX.Element;

  /**
   * Additional message or description associated with the action sheet.
   * Can be a string or a JSX element.
   */
  message?: string | JSX.Element;

  /**
   * Array of strings representing the options or buttons displayed in the action sheet.
   */
  options: string[];

  /**
   * Index of the cancel button within the `options` array.
   * Pressing this button triggers the cancel behavior.
   */
  cancelButtonIndex?: number;

  /**
   * Index of the destructive button within the `options` array.
   * This button typically performs a destructive action, such as deleting or removing something.
   */
  destructiveButtonIndex?: number;

  /**
   * Indicates whether to show an icon, such as a checkmark, next to selected options.
   * Defaults to `false`.
   */
  showIcon?: boolean;

  /**
   * Indicates whether to show a cancel button at the bottom of the action sheet.
   */
  showCancel?: boolean;

  customImage?: React.JSX.Element;
  /**
   * Custom style for body view
   */
  bodyStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  /**
   * Custom style for cancel button
   */
  cancelButtonStyle?: StyleProp<ViewStyle>;

  messageStyle?: StyleProp<TextStyle>;
}

export interface ActionSheetStyles {
  titleBox: any[];
  messageBox: any[];
  messageFrame: any[];
  body: any[];
  rightSvg: any[];
  cancelBody: any[];
  cancelButtonBox: any[];
  buttonBox: any[];
  [key: string]: any[]; // for any additional dynamic keys
}

export interface CalculateHeightProps {
  options: string[];
  title?: string | React.JSX.Element;
  message?: string | React.JSX.Element;
  cancelButtonIndex?: number;
  colors: any;
  sheetStyles: ActionSheetStyles;
  showIcon: boolean;
  showCancel: boolean;
  scrollEnabledRef: React.MutableRefObject<boolean>;
}

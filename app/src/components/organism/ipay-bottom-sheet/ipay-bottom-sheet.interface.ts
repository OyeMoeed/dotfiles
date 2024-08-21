import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type CommonPros = {
  isVisible?:boolean;
  heading?: string;
  simpleBar?: boolean;
  gradientBar?: boolean;
  cancelBnt?: boolean;
  doneBtn?: boolean;
  disabled: boolean;
  backBtn?: boolean;
  doneText?: string;
  doneButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  bottomSheetBgStyles?: StyleProp<ViewStyle>; // Optional Bottom Sheet background styles
  bgGradientColors?: (string | number)[]; // Optional background gradient colors
  headerContainerStyles?: StyleProp<ViewStyle>; // Optional header container styles
};

export interface IPayBottomSheetProps extends CommonPros {
  children?: React.JSX.Element | React.JSX.Element[];
  customSnapPoint?: string[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  simpleHeader?: boolean;
  onCloseBottomSheet: () => void;
  onDone?: () => void;
  bold?: boolean;
  animate?: boolean;
  /**
   * enable scroll for sheet expand while scroll on smaller content.
   */
  isPanningGesture?: boolean;
  doneText?: string;
  closeBottomSheetOnDone?: boolean;
  noGradient?: boolean;
  testID?: string;
}

export interface IPayBottomSheetHandleProps extends CommonPros {
  disabled: boolean;
  onPressCancel: () => void;
  onPressDone: () => void;
  simpleHeader?: boolean;
  bold?: boolean;
}

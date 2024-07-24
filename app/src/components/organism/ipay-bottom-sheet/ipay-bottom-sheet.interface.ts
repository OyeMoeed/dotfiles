import { SNAP_POINTS } from '@app/constants/constants';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type SizeType = keyof typeof SNAP_POINTS;
type CommonPros = {
  heading?: string;
  simpleBar?: boolean;
  gradientBar?: boolean;
  cancelBnt?: boolean;
  doneBtn?: boolean;
  backBtn?: boolean;
  doneText?: string;
  doneButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
};

export interface IPayBottomSheetProps extends CommonPros {
  children?: React.JSX.Element | React.JSX.Element[];
  customSnapPoint?: string[] | SizeType;
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  simpleHeader?: boolean;
  onCloseBottomSheet?: () => void;
  onDone?: () => void;
  bold?: boolean;
  /**
   * enable scroll for sheet expand while scroll on smaller content.
   */
  isPanningGesture?: boolean;
  doneText?: string;
  closeBottomSheetOnDone?: boolean;
}

export interface IPayBottomSheetHandleProps extends CommonPros {
  onPressCancel: () => void;
  onPressDone: () => void;
  simpleHeader?: boolean;
  bold?: boolean;
}

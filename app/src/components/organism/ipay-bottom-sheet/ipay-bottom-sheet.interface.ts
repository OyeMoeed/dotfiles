import React from 'react';

type CommonPros = {
  heading?: string;
  simpleBar?: boolean;
  gradientBar?: boolean;
  cancelBnt?: boolean;
  doneBtn?: boolean;
  backBtn?: boolean;
};

export interface IPayBottomSheetProps extends CommonPros {
  children?: React.JSX.Element | React.JSX.Element[];
  customSnapPoint?: string[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  simpleHeader?: boolean;
  onCloseBottomSheet?: () => void;
  bold?: boolean;
  /**
   * enable scroll for sheet expand while scroll on smaller content. 
   */
  isPanningGesture?: boolean;
}

export interface IPayBottomSheetHandleProps extends CommonPros {
  onPressCancel: () => void;
  onPressDone: () => void;
  simpleHeader?: boolean;
  bold?: boolean;
}

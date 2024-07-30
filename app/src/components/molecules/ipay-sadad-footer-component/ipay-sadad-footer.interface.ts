import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface SadadFooterComponentProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  totalAmount?: string | number;
  selectedItemsCount?: number;
  btnText: string;
  btnDisbaled?: boolean;
  btnLeftIcon?: React.ReactElement;
  btnRightIcon?: React.ReactElement;
  disableBtnIcons?: boolean;
  onPressBtn?: () => void;
  warning?: string;
  partialPay?: boolean;
  onPressPartialPay?: () => void;
  backgroundGradient?: string[];
  /**
   * To display button only without gradient background
   */
  showButtonOnly?: boolean;
}

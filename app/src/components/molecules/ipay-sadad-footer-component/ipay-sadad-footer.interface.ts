import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface SadadFooterComponentProps {
  textColor?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  gradientViewStyle?: StyleProp<ViewStyle>;
  totalAmount?: string | number;
  totalAmountText?: string;
  selectedItemsCount?: number;
  btnText: string;
  btnDisabled?: boolean;
  btnLeftIcon?: React.ReactElement;
  btnRightIcon?: React.ReactElement;
  disableBtnIcons?: boolean;
  onPressBtn?: () => void;
  btnStyle?: StyleProp<ViewStyle>;
  warning?: string;
  partialPay?: boolean;
  onPressPartialPay?: () => void;
  backgroundGradient?: string[];
  /**
   * To display button only without gradient background
   */
  showButtonOnly?: boolean;
  shouldTranslateBtnText?: boolean;
  amount?: string | number;
  showTopMessage?: boolean;
  totalAmountStyle?: StyleProp<ViewStyle>;
  totalAmountLeftIcon?: {
    icon: string;
    color?: string;
  };
}

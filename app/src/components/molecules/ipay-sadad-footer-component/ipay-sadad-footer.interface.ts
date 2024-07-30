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
  btnStyle?: StyleProp<ViewStyle>;
  backgroundGradient?: string[];
}

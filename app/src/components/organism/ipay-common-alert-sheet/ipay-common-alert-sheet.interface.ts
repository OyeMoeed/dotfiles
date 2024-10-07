import React, { ReactElement } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface IPayCommonAlertSheetProps {
  btnTitle?: string;
  onBtnPress?: () => void;
  btnStyles?: ViewStyle;
  headerTitle: string;
  isForceAlert?: boolean;
  title: string;
  titleStyle?: TextStyle;
  subtitle: string;
  icon: string;
  withCancelBtn?: boolean;
  onCloseBottomSheet?: () => void;
  buttonRightIcon?: React.JSX.Element;
  iconColor?: string;
  extraComponent?: ReactElement<any> | undefined | null;
}

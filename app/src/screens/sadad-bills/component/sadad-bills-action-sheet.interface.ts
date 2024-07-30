import { IPayActionSheetProps } from '@app/components/organism/ipay-actionsheet/ipay-actionsheet-interface';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface StyleProps {
  styles?: StyleProp<ViewStyle>;
}

// Extend IPayActionSheetProps with StyleProps
interface ExtendedIPayActionSheetProps extends IPayActionSheetProps, StyleProps {}

interface SadadBillsActionSheetProps {
  actionSheetOptions: ExtendedIPayActionSheetProps;
}

interface ActionSheetProps {
  title?: string;
  showIcon?: boolean;
  customImage?: React.ReactElement;
  message?: string;
  options?: string[];
  cancelButtonIndex?: number;
  showCancel?: boolean;
  destructiveButtonIndex?: number;
  onPress?: (index: number) => void;
  styles?: StyleProp<ViewStyle>;
}
export { ActionSheetProps, ExtendedIPayActionSheetProps, SadadBillsActionSheetProps };

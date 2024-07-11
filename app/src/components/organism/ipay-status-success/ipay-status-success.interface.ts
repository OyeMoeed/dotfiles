import React from 'react';
import { ViewStyle } from 'react-native';

// Define the interface for individual items
interface SuccessItem {
  id: number;
  title: string;
  subTitle: string;
  icon: string;
}

interface ItemProps {
  item: SuccessItem;
}

interface IPayStatusSuccessProps {
  testID?: string;
  style?: ViewStyle;
  headingText: string;
  transactionAmount?: string | number;
  data?: SuccessItem;
  linkButton?: boolean;
  linkBottonText?: string;
  linkButtonIcon?: React.ReactNode;
  primaryButton?: boolean;
  primaryButtonText?: string;
  primaryButtonIcon?: React.ReactNode;
  onPressLinkButton?: () => void;
  onPressPrimaryButton?: () => void;
}

export { IPayStatusSuccessProps, ItemProps };

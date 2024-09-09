import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface FlipCardProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  frontViewComponent: React.ReactNode;
  backViewComponent: React.ReactNode;
  returnFilpedIndex?: (index: number) => void;
  isExpired?: boolean;
}

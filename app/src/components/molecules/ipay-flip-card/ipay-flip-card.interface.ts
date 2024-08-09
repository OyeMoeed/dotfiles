import React from 'react';
import { ViewStyle } from 'react-native';

export interface FlipCardProps {
  testID?: string;
  style?: ViewStyle;
  frontViewComponent: React.ReactNode;
  backViewComponent: React.ReactNode;
  returnFilpedIndex?: (index: number) => void;
}

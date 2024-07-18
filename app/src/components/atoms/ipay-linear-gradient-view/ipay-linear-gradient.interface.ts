import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IPayLinearGradientViewProps {
  testID?: string;
  gradientColors?: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: StyleProp<ViewStyle>;
  children?: React.JSX.Element | React.JSX.Element[];
  useAngle?: boolean;
  angleCenter?: { x: number; y: number };
  angle?: number;
}

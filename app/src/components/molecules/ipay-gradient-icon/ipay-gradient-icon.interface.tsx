import { StyleProp, ViewStyle } from 'react-native';

// types.ts
export interface IPayGradientIconProps {
  icon: string;
  size?: number;
  disableFill?: boolean;
  removeInlineStyle?: boolean;
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  gradientLocations?: number[];
  style?: StyleProp<ViewStyle>;
  angle?: number;
  useAngle?: boolean;
}

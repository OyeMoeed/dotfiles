import { ViewStyle } from 'react-native';

export interface IPayLinearGradientViewProps {
  testID?: string;
  gradientColors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: ViewStyle[];
  children?: JSX.Element | JSX.Element[];
}

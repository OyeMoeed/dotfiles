import { StyleProp, ViewStyle } from 'react-native';

export interface IPaySafeAreaViewProps {
  linearGradientColors?: string[];
  children: JSX.Element | JSX.Element[];
  style: StyleProp<ViewStyle>;
}

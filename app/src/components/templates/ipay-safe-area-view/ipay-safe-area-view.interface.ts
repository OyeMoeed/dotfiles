import { StyleProp, ViewStyle } from 'react-native';

export interface IPaySafeAreaViewProps {
  testID?: string;
  linearGradientColors?: string[];
  children: JSX.Element | JSX.Element[];
  style: StyleProp<ViewStyle>;
}

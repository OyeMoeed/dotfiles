import { ViewStyle } from 'react-native';

export interface IPayAccountBalanceProps {
  style?: ViewStyle;
  balance: string;
  onPressTopup: () => void;
}

import { ViewStyle } from 'react-native';

export interface IPayAccountBalanceProps {
  style?: ViewStyle;
  balance: string | number;
  availableBalance?: string;
  hideBalance?: boolean;
  showRemainingAmount?: boolean;
  onPressTopup?: () => void;
}

import { ViewStyle } from 'react-native';

export interface IPayAccountBalanceProps {
  style?: ViewStyle;
  balance: string;
  availableBalance?: string;
  hideBalance?: boolean;
  showRemainingAmount?: boolean;
  onPressTopup: () => void;
}

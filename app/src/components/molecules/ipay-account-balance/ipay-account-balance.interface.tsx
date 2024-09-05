import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IPayAccountBalanceProps {
  style?: StyleProp<ViewStyle>;
  balance: string | number;
  availableBalance?: string;
  hideBalance?: boolean;
  showRemainingAmount?: boolean;
  onPressTopup?: () => void;
  /**
   * Style for the account balance text.
   */
  accountBalanceTextStyle?: StyleProp<TextStyle>;

  /**
   * Style for the current balance text.
   */
  currentBalanceTextStyle?: StyleProp<TextStyle>;

  /**
   * Style for the currency text.
   */
  currencyTextStyle?: StyleProp<TextStyle>;

  /**
   * Style for the remaining amount text.
   */
  remainingAmountTextStyle?: StyleProp<TextStyle>;

  /**
   * Syle for the current available text.
   */
  currentAvailableTextStyle?: StyleProp<TextStyle>;
  /**
   * Style for the total available text.
   */
  totalAvailableTextStyle?: StyleProp<TextStyle>;
  /**
   * Width of the gradient applied to the account balance component.
   */
  gradientWidth?: string;
  /**
   * array of colors for gradient
   */
  gradientColors?: string[];
  /**
   * Style for the gradient bg.
   */
  gradientBgStyle?: StyleProp<ViewStyle>;

  dailyRemainingOutgoingAmount?: string;
  monthlyIncomingLimit: string;

  topUpBtnStyle?: StyleProp<ViewStyle>;
}

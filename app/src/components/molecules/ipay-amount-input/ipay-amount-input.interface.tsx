import { ViewStyle } from 'react-native-size-matters';

export interface IPayAmountInputProps {
  amount: number;
  /**
   * This is the text that would be updated when the user enters Amount for the topup
   */

  onAmountChange: (text: string) => void;

  /**
   * This would be updated when the user adds the amount
   */
  testID: string;
  /**
   * Used to write the unit tests
   */
  style: ViewStyle;

  currencyStyle: ViewStyle;

  showIcon: boolean;
  /**
   * shows the edit icon to manually add the amount
   */
  defaultValue: number;

  iconStyle: ViewStyle;

  maxLength: number;
}

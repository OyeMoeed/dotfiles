import { TopUpStates } from '@app/utilities/enums.util';
import { StyleProp, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native-size-matters';

export interface IPayAmountInputProps {
  amount: number | string;
  /**
   * This is the text that would be updated when the user enters Amount for the topup
   */

  onAmountChange: (text: string | number) => void;

  /**
   * This would be updated when the user adds the amount
   */
  testID?: string;
  /**
   * Used to write the unit tests
   */
  style?: StyleProp<ViewStyle>;

  currencyStyle?: StyleProp<TextStyle>;

  showIcon?: boolean;
  /**
   * shows the edit icon to manually add the amount
   */
  defaultValue?: string;

  iconStyle?: StyleProp<ViewStyle>;

  maxLength?: number;
  disabled?: boolean;
  inputStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  currentState?: TopUpStates;
  isEditable?: boolean;
  handleBlur?: () => void;
  handleIconPress?: () => void;
  carretHidden?: boolean;
}

import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { StyleProp, TextStyle } from 'react-native';

export interface IPayMoneyRequestListProps {
  date: string;
  titleText: string;
  status: typeof MoneyRequestStatus;
  headingStyle: StyleProp<TextStyle>;
  titleStyle: StyleProp<TextStyle>;
  amount: number;
  onPress?: () => void;
  testID?: string;
  shouldTranslateTitle?: boolean;
}

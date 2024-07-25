import giftStatus from '@app/enums/gift-status.enum';
import { StyleProp, TextStyle } from 'react-native';

export interface IPayGiftTransactionListProps {
  date: string;
  titleText: string;
  footText: string;
  status: typeof giftStatus;
  headingStyle: StyleProp<TextStyle>;
  titleStyle: StyleProp<TextStyle>;
  footTextStyle: StyleProp<TextStyle>;
  amount: number;
  onPress?: () => void;
  testID?: string;
}

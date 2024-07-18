import { giftStatus } from '@app/enums/gift-status.enum';
import { TextStyle } from 'react-native-size-matters';

export interface IPayGiftTransactionListProps {
  date: string;
  titleText: string;
  footText: string;
  status: typeof giftStatus;
  headingStyle: TextStyle;
  titleStyle: TextStyle;
  footTextStyle: TextStyle;
  amount: number;
  onPress?: () => void;
  testID?: string;
}

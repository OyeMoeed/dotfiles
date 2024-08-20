import GiftStatus from '@app/enums/gift-status';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IPayGiftTransactionListProps {
  date: string;
  titleText: string;
  footText: string;
  status: typeof GiftStatus;
  headingStyle: StyleProp<TextStyle>;
  titleStyle: StyleProp<TextStyle>;
  footTextStyle: StyleProp<TextStyle>;
  amount: number;
  onPress?: () => void;
  testID?: string;
  titleWrapper?: StyleProp<ViewStyle>;
  tab?: string;
}

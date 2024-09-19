import { GiftStatus } from '@app/enums/gift-status.enum';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IPayGiftTransactionListProps {
  date: Date;
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

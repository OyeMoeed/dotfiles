import { TransactionMockData } from '@app/screens/international-transfer-history/components/transction-details-component.interface';
import { CombinedTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface ItemValueProps {
  key: string;
  value: any;
}
interface ItemProps {
  item: ItemValueProps;
  index?: number;
}

interface IPayTransactionHistoryDetailsProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  transactionData: CombinedTransactionItemProps | TransactionMockData | null;
}

export { IPayTransactionHistoryDetailsProps, ItemProps };

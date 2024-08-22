import { TransactionMockData } from '@app/screens/international-transfer-history/components/transction-details-component.interface';
import { CombinedTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface TransactionItemValueProps {
  key: string;
  value: any;
}
interface TransactionItemProps {
  item: TransactionItemValueProps;
  index?: number;
}

interface IPayTransactionHistoryDetailsProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  transactionData: CombinedTransactionItemProps | TransactionMockData | null;
  senderCurrency?: string;
  receiverCurrency?: string;
  vatPercentage?: string;
}

export { IPayTransactionHistoryDetailsProps, TransactionItemProps };

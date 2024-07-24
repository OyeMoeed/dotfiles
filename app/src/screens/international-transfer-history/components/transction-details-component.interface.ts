import { Countires, TransactionMedium, TransactionsStatus } from '@app/enums/transaction-types.enum';
import { CombinedTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface TransactionMockData {
  status: TransactionsStatus;
  transactionRequestType: string;
  transaction_medium: TransactionMedium;
  beneficiaryName: string;
  country: Countires;
  iban: string;
  bankName: string;
  phone_number: string;
  transfer_reason: string;
  amount: string;
  payrollAmount: string;
  exchangeRate: string;
  includeFees: string;
  vatAmount: string;
  bankFeesAmount: string;
  promocode: string;
  totalCreditAmount: string;
  totalDebitAmount: string;
  ref_number: string;
  transactionDateTime: string;
}

interface TransactionDetailsFooterButtonsProps {
  transactionStatus?: string;
  onPressShare?: () => void;
  onPressSplitBill?: () => void;
  onPressRefund?: () => void;
  onPressEditBeneficiary?: () => void;
}

interface TransactionDetailsProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  transaction: CombinedTransactionItemProps | null;
  onCloseBottomSheet?: () => void;
}

export { TransactionDetailsFooterButtonsProps, TransactionDetailsProps, TransactionMockData };

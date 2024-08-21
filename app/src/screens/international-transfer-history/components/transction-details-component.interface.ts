import { Countires, TransactionMedium, TransactionsStatus } from '@app/enums/transaction-types.enum';
import { StyleProp, ViewStyle } from 'react-native';
import { InternationalTransferHistoryDataProps } from '../international-transfer-history.interface';

interface TransactionDataProps {
  beneficiaryName?: string;
  country?: Countires;
  refNumber?: string;
  remittanceRefNumber?: string;
}

interface TransactionRefundProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  amount?: string;
  transactionData: TransactionDataProps | null;
  onPressRefund?: () => void;
  onPressCancel?: () => void;
}

interface TransactionMockData {
  status: TransactionsStatus;
  transactionRequestType: string;
  transactionMedium: TransactionMedium;
  beneficiaryName: string;
  country: Countires;
  iban: string;
  bankName: string;
  phoneNumber: string;
  transferReason: string;
  amount: string;
  payrollAmount: string;
  exchangeRate: string;
  includeFees: string;
  vatAmount: string;
  bankFeesAmount: string;
  promocode: string;
  totalCreditAmount: string;
  totalDebitAmount: string;
  refNumber: string;
  transactionDateTime: string;
}

interface TransactionDetailsFooterButtonsProps {
  transactionStatus?: string;
  onPressShare?: () => void;
  onPressSplitBill?: () => void;
  onPressRefund?: () => void;
  onPressEditBeneficiary?: () => void;
}

interface TransactionDetailsProps extends TransactionDetailsFooterButtonsProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  transaction: InternationalTransferHistoryDataProps | null;
  onCloseBottomSheet?: () => void;
}

export {
  TransactionDataProps,
  TransactionDetailsFooterButtonsProps,
  TransactionDetailsProps,
  TransactionMockData,
  TransactionRefundProps,
};

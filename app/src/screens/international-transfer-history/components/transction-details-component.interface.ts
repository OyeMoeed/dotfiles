import { Countires, TransactionMedium, TransactionsStatus } from '@app/enums/transaction-types.enum';
import { StyleProp, ViewStyle } from 'react-native';
import { InternationalTransferHistoryDataProps } from '../international-transfer-history.interface';

interface CommonProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

interface EditBeneficiaryProps extends CommonProps {
  beneficiary?: string;
}

interface TransactionDataProps {
  beneficiaryName?: string;
  country?: Countires;
  ref_number?: string;
  remittanceRefNumber?: string;
}

interface TransactionRefundProps extends CommonProps {
  amount?: string;
  transactionData: TransactionDataProps | null;
  onPressRefund?: () => void;
  onPressCancel?: () => void;
}

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

interface TransactionDetailsProps extends TransactionDetailsFooterButtonsProps, CommonProps {
  transaction: InternationalTransferHistoryDataProps | null;
  onCloseBottomSheet?: () => void;
}

export {
  EditBeneficiaryProps,
  TransactionDataProps,
  TransactionDetailsFooterButtonsProps,
  TransactionDetailsProps,
  TransactionMockData,
  TransactionRefundProps,
};

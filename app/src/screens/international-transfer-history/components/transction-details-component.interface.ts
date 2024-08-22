import { Countires, TransactionMedium, TransactionsStatus } from '@app/enums/transaction-types.enum';
import { StyleProp, ViewStyle } from 'react-native';
import { InternationalTransferHistoryDataProps } from '../international-transfer-history.interface';

interface CommonProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

interface EditBeneficiaryProps extends CommonProps {
  beneficiary?: string;
  onPressEditBeneficiary?: (name: string) => void;
}

interface TransactionDataProps {
  beneficiaryName?: string;
  country?: Countires;
  transactionRefNumber?: string;
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
  transactionRefNumber: string;
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
  beneficiaryName?: string;
  editBeneficiaryMessage?: string;
}

interface EditBeneficaryConfirmationProps extends CommonProps {
  onPressDone?: () => void;
}

export {
  EditBeneficaryConfirmationProps,
  EditBeneficiaryProps,
  TransactionDataProps,
  TransactionDetailsFooterButtonsProps,
  TransactionDetailsProps,
  TransactionMockData,
  TransactionRefundProps,
};

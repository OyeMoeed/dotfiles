import { Countires, TransactionMedium, TransactionsStatus } from '@app/enums/transaction-types.enum';
import { StyleProp, ViewStyle } from 'react-native';

interface BeneficiariesProps {
  id: string;
  beneficiaryName: string;
  country: string;
  icon: string | number;
}
interface DeliveryTypeDataProps {
  id: string;
  title: string;
  amount: string;
  icon: string | number;
  type: string;
}

interface DeliveryTypeProps {
  id: string;
  title: string;
  data: DeliveryTypeDataProps[];
}

interface IPayInternationalTransferBeneficiriesProps {
  testID?: string;
  beneficiaries: BeneficiariesProps[];
  selectedListItem?: string;
  onPressListItem?: (beneficiaryName?: string) => void;
}

interface IPayInternationalTransferDeliveryTypeComponentProps {
  testID?: string;
  deliveryTypesData: DeliveryTypeProps;
  selectedListItem?: string;
  onPressListItem?: (title?: string, type?: string) => void;
  selectTransactionType?: string;
}

interface TransactionDataProps {
  beneficiaryName?: string;
  country?: Countires;
  ref_number?: string;
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

export {
  BeneficiariesProps,
  DeliveryTypeDataProps,
  IPayInternationalTransferBeneficiriesProps,
  IPayInternationalTransferDeliveryTypeComponentProps,
  TransactionDataProps,
  TransactionDetailsFooterButtonsProps,
  TransactionMockData,
  TransactionRefundProps,
};

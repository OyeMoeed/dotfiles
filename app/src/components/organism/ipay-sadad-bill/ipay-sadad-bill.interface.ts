import { PaymentInfoProps } from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface BillDetailsProps {
  id: string | number;
  billTitle?: string;
  vendor: string;
  vendorIcon?: string;
  billAmount?: string;
  dueDate?: string;
  billStatus?: string;
  selected?: boolean;
  amount: string;
  violation_no: string | number;
  accountNumber: string;
  serviceType?: string;
  billNickname?: string;
}

type SelectedProp = {
  selected?: boolean;
};

interface BillsProps extends PaymentInfoProps, SelectedProp {}

interface IPaySadadBillProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  billDetails: BillsProps;
  onSelectBill?: (id: number | string) => void;
  showCheckBox?: boolean;
  onPressMoreOptions?: (id: string) => void;
  showMoreOption?: boolean;
}

export { BillDetailsProps, BillsProps, IPaySadadBillProps };

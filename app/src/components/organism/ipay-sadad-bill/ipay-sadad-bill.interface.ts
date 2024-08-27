import { BillProps } from '@app/network/services/bills/get-sadad-bills/get-sadad-bills.interface';
import { StyleProp, ViewStyle } from 'react-native';

interface BillDetailsProps {
  id: string | number;
  billTitle?: string;
  vendor?: string;
  vendorIcon?: string;
  billAmount?: string;
  dueDate?: string;
  billStatus?: string;
  selected?: boolean;
  amount: string;
  violation_no: string | number;
  accountNumber?: string;
  serviceType?: string;
}

type SelectedProp = {
  selected?: boolean;
};

interface BillsProps extends BillProps, SelectedProp {}

interface IPaySadadBillProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  billDetails: BillsProps;
  onSelectBill?: (id: number | string) => void;
  showCheckBox?: boolean;
  onPressMoreOptions?: (id: number | string) => void;
  showMoreOption?: boolean;
}

export { BillDetailsProps, BillsProps, IPaySadadBillProps };

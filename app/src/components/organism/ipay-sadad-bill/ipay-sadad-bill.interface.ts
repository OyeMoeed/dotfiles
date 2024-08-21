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
}

interface IPaySadadBillProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  billDetails: BillDetailsProps;
  onSelectBill?: (id: number | string) => void;
  showCheckBox?: boolean;
  onPressMoreOptions?: (id: number | string) => void;
  showMoreOption?: boolean;
}

export { BillDetailsProps, IPaySadadBillProps };

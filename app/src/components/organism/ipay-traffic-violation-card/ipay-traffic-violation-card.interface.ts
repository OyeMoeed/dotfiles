import { StyleProp, ViewStyle } from 'react-native';

interface BillDetailsProps {
  id: string | number;
  billTitle?: string;
  violation_no: string | number;
  vendorIcon?: string;
  billAmount?: string;
  dueDate?: string;
  billStatus?: string;
  selected?: boolean;
  amount: string;
  currency: string;
  description: string;
  violationNo: string;
  violatorId?: string;
}

interface IPaySadadBillProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  billDetails: BillDetailsProps;
  onSelectBill?: (id: number | string) => void;
  showCheckBox?: boolean;
}

export { BillDetailsProps, IPaySadadBillProps };

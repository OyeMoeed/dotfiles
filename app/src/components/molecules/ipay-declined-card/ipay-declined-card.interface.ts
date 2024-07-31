import { StyleProp, ViewStyle } from 'react-native';

interface BillData {
  id: string;
  label: string;
  value: string;
  violationNumber: string;
  icon?: string;
  onPress?: () => void;
}
interface IPayBillDetailsOptionProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  optionsStyles?: StyleProp<ViewStyle>;
  listStyles?: StyleProp<ViewStyle>;
  showHeader?: boolean;
  declinedTrasactionData: BillData[];
  paidViolation: number;
}

export { BillData, IPayBillDetailsOptionProps };

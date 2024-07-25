import { StyleProp, ViewStyle } from 'react-native';

interface BillData {
  id: string;
  label: string;
  value: string;
  icon?: string;
  
}
interface HeaderData {
  title: string;
  companyDetails: string;
  companyImage: string;
}
interface IPayBillDetailsOptionProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  optionsStyles?: StyleProp<ViewStyle>;
  data: BillData[];
  headerData: HeaderData;
}

interface OptionItem {
  label: string;
  value: string;
  icon?: string;
  onPressIcon?: () => void;
}
export { IPayBillDetailsOptionProps, OptionItem };

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
  listStyles?: StyleProp<ViewStyle>;
  data: BillData[];
  headerData?: HeaderData;
  showHeader?: boolean;
  isShowIcon?: boolean;
  showDetail?: boolean;
  showShareBtn?: boolean;
}

interface OptionItem {
  label: string;
  value: string;
  icon?: string;
  image?: string;
  onPressIcon?: () => void;
}
export { IPayBillDetailsOptionProps, OptionItem };

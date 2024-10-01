import { ViewStyle } from 'react-native';

interface IPaySalaryPayInformationProps {
  testID?: string;
  currencyStyle?: ViewStyle;
  amount: string | number;
  style?: ViewStyle;
  setAmount: (text: string | number) => void;
  isEditable?: boolean;
  openReason?: () => void;
  setSelectedItem: (text: string) => void;
  selectedItem?: string;
  notes?: string;
  transferInfo?: boolean;
  chipValue?: string;
  subtitle?: string;
  inputFieldStyle?: ViewStyle;
  fullName: string;
}

export default IPaySalaryPayInformationProps;

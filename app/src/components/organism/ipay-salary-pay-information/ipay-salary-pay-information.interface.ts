import { ViewStyle } from 'react-native';

interface IPaySalaryPayInformationProps {
  testID?: string;
  style?: ViewStyle;
  openReason?: () => void;
  selectedItem?: string;
  notes?: string;
  subtitle?: string;
  inputFieldStyle?: ViewStyle;
  fullName: string;
  onPressDatePicker: () => void;
}

export default IPaySalaryPayInformationProps;

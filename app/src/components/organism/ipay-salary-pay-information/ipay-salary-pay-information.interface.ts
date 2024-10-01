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
  onPressDeductFlag: () => void;
  onPressPayExtraFlag: () => void;
  deductFlag: boolean;
  payExtraFlag: boolean;
  amount: string;
  selectedDate: string;
  onPressDeductionShow: () => void;
  deductionAmount: string;
  setDeductionAmount: (value: string) => void;
  payExtraAmount: string;
  setPayExtraAmount: (value: string) => void;
  selectedDeductionReason?: { text: string };
  payExtraNote: string;
  setPayExtraNote: (value: string) => void;
}

export default IPaySalaryPayInformationProps;

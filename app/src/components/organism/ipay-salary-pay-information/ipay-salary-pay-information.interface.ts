import { ViewStyle } from 'react-native';

interface IPaySalaryPayInformationProps {
  testID?: string;
  style?: ViewStyle;
  openReason?: () => void;
  salaryType?: string;
  salaryId: string;
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
  selectedDate: Date;
  onPressDeductionShow: () => void;
  deductionAmount: string | number;
  setDeductionAmount: (value: string | number) => void;
  payExtraAmount: string | number;
  setPayExtraAmount: (value: string | number) => void;
  selectedDeductionReason?: { text?: string };
  payExtraNote: string;
  setPayExtraNote: (value: string) => void;
  bonusAmount: string | number;
  setBonusAmount: (value: string | number) => void;
}

export interface IPaySalaryPayDateSelectorProps {
  onPressDatePicker: () => void;
  isAdvanceSalary: boolean;
  selectedDate: Date;
  inputFieldStyle?: ViewStyle;
  selectedToDate: Date;
}
export default IPaySalaryPayInformationProps;

import { Dispatch, SetStateAction } from 'react';
import { ViewStyle } from 'react-native';

interface IPaySalaryPayInformationProps {
  testID?: string;
  style?: ViewStyle;
  openReason?: () => void;
  salaryType?: string;
  salaryId: number | string;
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
  selectedFromDate: Date | string | null;
  selectedToDate: Date | string | null;
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
  setDeductionSalaryType: Dispatch<SetStateAction<{ text?: string | undefined }>>;
}

export interface IPaySalaryPayDateSelectorProps {
  onPressDatePicker: (value?: 'FROM_DATE' | 'TO_DATE') => void;
  isAdvanceSalary: boolean;
  selectedDate: Date | string | null;
  selectedToDate: Date | string | null;
  inputFieldStyleFromDate?: ViewStyle;
  inputFieldStyleToDate?: ViewStyle;
  isNotMainScreen?: boolean;
}
export default IPaySalaryPayInformationProps;

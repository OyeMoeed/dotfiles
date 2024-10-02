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
  setBonusAmountNote: (value: string) => void;
  bonusAmountNote: string;
  setBonusAmount: (value: string | number) => void;
  setDeductionReasonsTypes: Dispatch<SetStateAction<{ text?: string | undefined }>>;
  isToDateLessThanFromDate: boolean;
  isToDateMoreThan6: boolean;
  dateFromNow: number;
}

export interface IPaySalaryPayDateSelectorProps {
  onPressDatePicker: (value?: 'FROM_DATE' | 'TO_DATE') => void;
  isAdvanceSalary: boolean;
  selectedDate: Date | string | null;
  selectedToDate: Date | string | null;
  inputFieldStyleFromDate?: ViewStyle;
  inputFieldStyleToDate?: ViewStyle;
  isMainScreen?: boolean;
  amount?: string;
  isToDateLessThanFromDate: boolean;
  isToDateMoreThan6: boolean;
  dateFromNow: number;
}
export default IPaySalaryPayInformationProps;

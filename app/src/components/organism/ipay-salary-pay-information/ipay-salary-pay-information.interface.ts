import colors from '@app/styles/colors.const';
import { TFunction } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

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
  comingMonthsCount: number;
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
  comingMonthsCount: number;
}

export interface PayExtraComponentProps {
  payExtraFlag?: boolean;
  defaultValue: string;
  payExtraAmount: string | number;
  setPayExtraAmount: (value: string | number) => void;
  textStyle: TextStyle;
  backgroundStyle: ViewStyle;
  amount: string;
  inputFieldStyle?: ViewStyle;
  payExtraNote: string;
  setPayExtraNote: (value: string) => void;
  t: TFunction<'translation', undefined>;
  colors: typeof colors;
  styles: StyleSheet.NamedStyles<any>;
}

export interface DeductExtraComponentProps {
  defaultValue: string;
  textStyle: TextStyle;
  backgroundStyle: ViewStyle;
  amount: string;
  inputFieldStyle?: ViewStyle;
  t: TFunction<'translation', undefined>;
  colors: typeof colors;
  styles: StyleSheet.NamedStyles<any>;
  deductFlag: boolean;
  deductionAmount: string | number;
  setDeductionAmount: (value: string | number) => void;
  chipValue: boolean;
  comingMonthsNow: number;
  onPressDeductionShow: () => void;
  selectedDeductionReason?: { text?: string };
}

export interface IPayBonesSalarySectionProps {
  setBonusAmountNote: (value: string) => void;
  bonusAmountNote: string;
  setBonusAmount: (value: string | number) => void;
  defaultValue: string;
  amount: string;
  bonusAmount: string | number;
  inputFieldStyle?: ViewStyle;
}

export default IPaySalaryPayInformationProps;

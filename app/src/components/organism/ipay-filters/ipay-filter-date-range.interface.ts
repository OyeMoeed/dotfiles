import { FiltersType } from '@app/utilities';
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form';

export interface IPayFilterDateRangeProps {
  title: string;
  control?: Control<FieldValues> | undefined;
  fromLabel: string;
  toLabel: string;
  errors: any;
  required: boolean;
  scrollToBottom?: () => void;
  onSelectDateFilter?: (dateType: FiltersType) => void;
  setValue: UseFormSetValue<any>;
  dateError?: string;
  hideDatePicKer?: boolean;
}

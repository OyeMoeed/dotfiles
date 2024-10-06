import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterAmountRangeProps {
  title: string;
  control?: Control<FieldValues> | undefined;
  fromLabel: string;
  toLabel: string;
  errors: any;
  required: boolean;
  amountError?: string;
}

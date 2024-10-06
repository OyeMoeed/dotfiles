import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterBeneficiariesProps {
  control?: Control<FieldValues> | undefined;
  beneficiaryData: any[];
  bankList: any[];
}

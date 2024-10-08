import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterTransactionTypesProps {
  control?: Control<FieldValues> | undefined;
  handleSelectType: (selectedItem: string) => void;
  transactionTypes: any[];
}

import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterContactsProps {
  control?: Control<FieldValues> | undefined;
  contacts: any[];
}

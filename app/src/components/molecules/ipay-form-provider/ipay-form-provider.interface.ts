import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

export interface IPayFormProviderProps<T extends FieldValues> {
  validationSchema: Yup.ObjectSchema<any>;
  defaultValues: DefaultValues<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
}

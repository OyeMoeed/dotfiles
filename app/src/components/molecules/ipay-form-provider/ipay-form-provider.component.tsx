import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPayFormProviderProps } from './ipay-flag-icon.interface';

const IPayFormProvider = <T extends FieldValues>({
  validationSchema,
  defaultValues,
  children,
}: IPayFormProviderProps<T>) => {
  const methods = useForm<T>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return <FormProvider {...methods}>{children(methods)}</FormProvider>;
};

export default IPayFormProvider;

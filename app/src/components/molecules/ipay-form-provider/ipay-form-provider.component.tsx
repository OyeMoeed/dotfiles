import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { IPayFormProviderProps } from './ipay-form-provider.interface';

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

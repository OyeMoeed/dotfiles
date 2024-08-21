import { useNavigation } from '@react-navigation/core';
import { SubmitHandler } from 'react-hook-form';
import { BeneficiaryTransferFormValues } from './international-beneficiary-transfer-form.interface';

const useInternationalTransferHook = () => {
  const navigation = useNavigation();

  const onSubmit: SubmitHandler<BeneficiaryTransferFormValues> = async (data) => {
    console.log('data', data);
  };
  return {
    onSubmit,
  };
};

export default useInternationalTransferHook;

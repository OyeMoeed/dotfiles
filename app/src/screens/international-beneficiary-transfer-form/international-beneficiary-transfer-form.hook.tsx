import constants from '@app/constants/constants';
import { useNavigation } from '@react-navigation/core';
import { SubmitHandler } from 'react-hook-form';
import { BeneficiaryTransferFormValues } from './international-beneficiary-transfer-form.interface';

const useInternationalTransferHook = () => {
  const navigation = useNavigation();
  const cities = constants.CITIES;
  const onSubmit: SubmitHandler<BeneficiaryTransferFormValues> = async (data) => {
    console.log('123123');

 
  };
  return {
    onSubmit,
    cities,
  };
};

export default useInternationalTransferHook;

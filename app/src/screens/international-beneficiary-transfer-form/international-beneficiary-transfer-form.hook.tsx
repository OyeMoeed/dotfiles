import constants from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { SubmitHandler } from 'react-hook-form';
import { BeneficiaryTransferFormValues } from './international-beneficiary-transfer-form.interface';

const useInternationalTransferHook = () => {
  const cities = constants.CITIES;

  const onSubmit: SubmitHandler<BeneficiaryTransferFormValues> = async (data) => {
    navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, { type: ScreenNames.INTERNATIONAL_TRANSFER });
  };
  return {
    onSubmit,
    cities,
  };
};

export default useInternationalTransferHook;

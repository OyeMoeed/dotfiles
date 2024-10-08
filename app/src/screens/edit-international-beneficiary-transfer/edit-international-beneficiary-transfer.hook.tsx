import constants from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import editInternationalBeneficiary from '@app/network/services/international-transfer/edit-international-beneficiary/edit-international-beneficiary.service';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import { SubmitHandler } from 'react-hook-form';
import { BeneficiaryTransferFormValues } from './edit-international-beneficiary-transfer.interface';

const useInternationalTransferHook = () => {
  const cities = constants.CITIES;

  const onSubmit: SubmitHandler<BeneficiaryTransferFormValues> = async (data) => {
    const activateBeneficiaryPayload = {
      beneficiaryCode: data.beneficiaryCode,
      nickname: data.beneficiaryNickName,
    };

    const apiResponse = await editInternationalBeneficiary(data.beneficiaryCode, activateBeneficiaryPayload);
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, {
        type: ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER,
      });
    }
  };

  return {
    onSubmit,
    cities,
  };
};

export default useInternationalTransferHook;

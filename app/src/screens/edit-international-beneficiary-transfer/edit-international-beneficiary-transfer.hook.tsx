import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import editInternationalBeneficiary from '@app/network/services/international-transfer/edit-international-beneficiary/edit-international-beneficiary.service';
import colors from '@app/styles/colors.const';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { BeneficiaryTransferFormValues } from './edit-international-beneficiary-transfer.interface';

const useInternationalTransferHook = () => {
  const cities = constants.CITIES;
  const [apiError, setAPIError] = useState<string>('');
  const localizationText = useLocalization();

  const { showToast } = useToastContext();
  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onSubmit: SubmitHandler<BeneficiaryTransferFormValues> = async (data) => {
    const activateBeneficiaryPayload = {
      beneficiaryCode: data.beneficiaryCode,
      nickname: data.beneficiaryNickName,
    };
    try {
      const apiResponse = await editInternationalBeneficiary(data.beneficiaryCode, activateBeneficiaryPayload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, {
            type: ScreenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER,
          });

        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  return {
    onSubmit,
    cities,
  };
};

export default useInternationalTransferHook;

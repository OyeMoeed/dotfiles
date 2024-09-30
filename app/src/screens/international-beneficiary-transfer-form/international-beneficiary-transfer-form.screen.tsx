import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayIcon,
  IPayImage,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import {
  IPayButton,
  IPayHeader,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { AddWUBeneficiaryProps, AddWUBeneficiaryReq } from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.interface';
import addWUbeneficiary from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BeneficiaryTransferFormValues,
} from './international-beneficiary-transfer-form.interface';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';

const IBeneficiaryTransferScreen: React.FC = () => {
  const route = useRoute();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { transferService, dynamicFieldsData } = route?.params;
  const styles = beneficiaryTransferStyles(colors);
  const [apiError, setAPIError] = useState<string>('');

  const { showToast } = useToastContext();
  const { defaultValues, validationSchema, revertFlatKeys } = useDynamicForm(dynamicFieldsData);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const addWUBeneficiary = async (payload: AddWUBeneficiaryReq) => {
    try {
      const apiResponse: AddWUBeneficiaryProps = await addWUbeneficiary(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, { type: ScreenNames.INTERNATIONAL_TRANSFER });
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error?.error || t('ERROR.SOMETHING_WENT_WRONG'));
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const onSubmit = (data: BeneficiaryTransferFormValues) => {
    const revertFlatKey = revertFlatKeys(data);
    const dynamicFields = dynamicFieldsData?.map((item) => {
      if (Object.keys(revertFlatKey).includes(item?.index)) {
        return {
          label: item?.label,
          index: item?.index,
          value: revertFlatKey[item?.index],
          description: revertFlatKey[item?.index],
          isFormValid: false,
        };
      }
      return [];
    });
    const payload = {
      beneficiaryBankDetail: {
        bankCode: '02',
        correspondingBankCode: '',
      },
      beneficiaryType: transferService?.beneficiaryType,
      countryCode: transferService?.countryCode,
      nickname: data?.beneficiaryNickName,
      dynamicFields,
      currency: transferService?.currencyCode,
      remittanceType: transferService?.remittanceType,
    };
    addWUBeneficiary(payload);
  };

  return (
    <IPayFormProvider<BeneficiaryTransferFormValues>
      validationSchema={validationSchema}
      defaultValues={defaultValues}
    >
      {({ control, formState: { errors }, handleSubmit }) => (
        <IPaySafeAreaView>
          <IPayHeader backBtn title="NEW_BENEFICIARY.NEW_BENEFICIARY" applyFlex />
          <IPayView style={styles.container}>
            <IPayImage image={transferService?.serviceLogo} style={styles.logoStyles} />
            <IPayCaption1Text
              text={`${t('COMMON.DELIVERY_TYPE')}: ${transferService.transferType}`}
              style={styles.caption}
            />
            <IPayTitle2Text text={transferService.serviceName} style={styles.heading} />
            <DynamicFormComponent
              errors={errors}
              control={control}
              fields={dynamicFieldsData}
            />
            <IPayButton
              onPress={handleSubmit(onSubmit)}
              large
              btnType={buttonVariants.PRIMARY}
              btnText="NEW_BENEFICIARY.ADD_BENEFICIARY"
              btnIconsDisabled
              btnStyle={styles.btnStyles}
            />
          </IPayView>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default IBeneficiaryTransferScreen;

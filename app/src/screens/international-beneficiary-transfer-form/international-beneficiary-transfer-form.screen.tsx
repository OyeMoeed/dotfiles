import { IPayCaption1Text, IPayImage, IPayScrollView, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { AEAddBeneficiaryReq } from '@app/network/services/international-transfer/ae-add-beneficiary/ae-add-beneficiary.interface';
import addAEBeneficiary from '@app/network/services/international-transfer/ae-add-beneficiary/ae-add-beneficiary.service';
import { AddWUBeneficiaryReq } from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.interface';
import addWUbeneficiary from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DynamicField,
  FormValuesType,
} from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { ImageStyle, StyleProp } from 'react-native';
import { InternationalTransferValue } from './international-beneficiary-transfer-form.interface';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';
import {
  AddBeneficiaryValues,
  ServiceData,
} from '../add-international-beneficiary/add-international-beneficiary.interface';

const IBeneficiaryTransferScreen: React.FC = () => {
  const route = useRoute<
    RouteProp<{
      params: { transferService: ServiceData; data: AddBeneficiaryValues; dynamicFieldsData: DynamicField[] };
    }>
  >();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { transferService, dynamicFieldsData, data: payloadData } = route.params;
  const styles = beneficiaryTransferStyles(colors);

  const { defaultValues, validationSchema, getSubmittedValues, parsedFields, handleParentLovChange } = useDynamicForm(
    dynamicFieldsData,
    true,
  );

  const addWUBeneficiary = async (payload: AddWUBeneficiaryReq) => {
    try {
      const apiResponse = await addWUbeneficiary(payload);
      if (apiResponse?.successfulResponse) {
        navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, {
          type: ScreenNames.INTERNATIONAL_TRANSFER,
          beneficiaryCode: apiResponse?.response?.beneficiaryCode,
        });
      }
    } catch {
      /* empty */
    }
  };

  const postBeneficiariesAE = async (payload: AEAddBeneficiaryReq) => {
    try {
      const apiResponse = await addAEBeneficiary(payload);
      if (apiResponse?.successfulResponse) {
        navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, {
          type: ScreenNames.INTERNATIONAL_TRANSFER,
          beneficiaryCode: apiResponse?.response?.beneficiaryCode,
        });
      }
    } catch {
      /* empty */
    }
  };

  const onSubmit = (data: FormValuesType) => {
    if (payloadData.transferType === InternationalTransferValue.WU) {
      const payload = {
        beneficiaryType: payloadData?.transferType,
        countryCode: payloadData?.country,
        nickname: payloadData?.nickname,
        dynamicFields: getSubmittedValues(parsedFields, data),
        currency: payloadData?.currency ?? '',
        remittanceType: payloadData?.remittanceType ?? '',
        beneficiaryBankDetail: payloadData?.bank,
      };
      addWUBeneficiary(payload);
    } else {
      const payload = {
        beneficiaryType: payloadData?.transferType,
        countryCode: payloadData?.country,
        nickname: payloadData?.nickname,
        dynamicFields: getSubmittedValues(parsedFields, data),
        currency: payloadData?.currency ?? '',
        remittanceType: payloadData?.bank?.actualRemittanceType ?? '',
        beneficiaryBankDetail: payloadData?.bank,
      };
      postBeneficiariesAE(payload);
    }
  };

  return (
    <IPayFormProvider<FormValuesType> validationSchema={validationSchema} defaultValues={defaultValues}>
      {({ control, formState: { errors }, handleSubmit, watch }) => (
        <IPaySafeAreaView>
          <IPayScrollView contentContainerStyle={styles.scrollViewContent}>
            <>
              <IPayHeader backBtn title="NEW_BENEFICIARY.NEW_BENEFICIARY" applyFlex />
              <IPayView style={styles.container}>
                <IPayImage image={transferService?.serviceLogo} style={styles.logoStyles as StyleProp<ImageStyle>} />
                <IPayCaption1Text
                  text={`${t('COMMON.DELIVERY_TYPE')}: ${payloadData?.deliveryType}`}
                  style={styles.caption}
                />
                <IPayTitle2Text text={transferService.serviceName} style={styles.heading} regular={false} />
                <DynamicFormComponent
                  errors={errors}
                  control={control}
                  fields={parsedFields}
                  handleParentLovChange={handleParentLovChange}
                  watch={watch}
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
            </>
          </IPayScrollView>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default IBeneficiaryTransferScreen;

import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayDropdown,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayScrollView,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayChip,
  IPayHeader,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { BANKS, COUNTRIES, RELATIONSHIPS, SNAP_POINTS, WU_TRANSFER_TYPES } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { DynamicField } from '@app/network/services/international-transfer/beneficiaries-dynamic-fields/beneficiaries-dynamic-fields.interface';
import { AddWUBeneficiaryProps } from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.interface';
import addWUbeneficiary from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, States, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { dynamicFormFields } from '../international-transfer/international-transfer.constent';
import useInternationalTransferHook from './international-beneficiary-transfer-form.hook';
import {
  BeneficiaryFields,
  BeneficiaryTransferFormValues,
  TransferService,
  TransferTypes,
} from './international-beneficiary-transfer-form.interface';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';

const IBeneficiaryTransferScreen: React.FC = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const { transferService, dynamicFieldsData } = route?.params;
  const styles = beneficiaryTransferStyles(colors);
  const localizationText = useLocalization();
  const [apiError, setAPIError] = useState<string>('');
  const [beneficiariesWURes, setBeneficiariesWURes] = useState();

  const { cities } = useInternationalTransferHook();
  const transferType = transferService?.transferType;
  const validationSchema = Yup.object().shape({});
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();

  const dynamicFieldKeys = Object.keys(dynamicFormFields);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const addWUBeneficiary = async (payload) => {
    renderSpinner(true);
    try {
      const apiResponse: AddWUBeneficiaryProps = await addWUbeneficiary(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiariesWURes(apiResponse);
          navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, { type: ScreenNames.INTERNATIONAL_TRANSFER });
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error?.error || localizationText.ERROR.SOMETHING_WENT_WRONG);
          break;
        default:
          break;
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const getValueByKey = (submitData: BeneficiaryTransferFormValues, key: string) => {
    const value = submitData[key as keyof BeneficiaryTransferFormValues];
    return value;
  };

  const onSubmit = (data: BeneficiaryTransferFormValues) => {
    const dynamicFields = dynamicFieldKeys?.map((name) => {
      const key = dynamicFormFields?.[name] ?? '';
      const value = getValueByKey(data, key) ?? '';
      return {
        index: key,
        value,
      };
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
      defaultValues={{
        beneficiaryName: '',
        iban: '',
        bankName: '',
        relationship: '',
        city: '',
        address: '',
        beneficiaryNickName: '',
        walletType: '',
        firstName: '',
        thirdName: '',
        secondName: '',
        lastName: '',
        beneficiaryNationality: '',
      }}
    >
      {({ handleSubmit }) => (
        <IPaySafeAreaView>
          <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
          <IPayView style={styles.container}>
            <IPayImage image={transferService?.serviceLogo} style={styles.logoStyles} />
            <IPayCaption1Text
              text={`${localizationText.COMMON.DELIVERY_TYPE}: ${transferService.transferType}`}
              style={styles.caption}
            />
            <IPayTitle2Text text={transferService.serviceName} style={styles.heading} />
            <IPayScrollView contentContainerStyle={styles.innerContainer}>
              <>
                <IPayFootnoteText
                  color={colors.natural.natural500}
                  style={styles.textStyle}
                  text={localizationText.NEW_BENEFICIARY.BENEFECIARY_INFORMATION}
                />

                <IPayAnimatedTextInput
                  name={BeneficiaryFields.BENEFICIARY_NICK_NAME}
                  label={localizationText.NEW_BENEFICIARY.BENEFICIARY_NICK_NAME_OPTIONAL}
                />
                {transferService.serviceName === TransferService.WESTERN_UNIION && (
                  <>
                    <IPayChip
                      icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} />}
                      variant={States.SEVERE}
                      headingStyles={styles.chipHeading}
                      textValue={localizationText.NEW_BENEFICIARY.NAME_SHOULD_BE_ENGLISH}
                    />
                    {dynamicFieldsData?.length &&
                      dynamicFieldsData?.map((item: DynamicField) => (
                        <IPayAnimatedTextInput
                          key={item?.label}
                          name={dynamicFormFields[item?.index] ?? ''}
                          label={item?.label}
                        />
                      ))}
                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text={localizationText.NEW_BENEFICIARY.OTHER_INFORMATION}
                    />
                    <IPayDropdown
                      dropdownType={localizationText.NEW_BENEFICIARY.BENEFECIARY_NATIONALITY}
                      data={COUNTRIES}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.BENEFICIARY_NATIONALITY}
                      label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NATIONALITY}
                    />
                    <IPayDropdown
                      dropdownType={localizationText.COMMON.RELATIONSHIP}
                      data={RELATIONSHIPS}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.RELATIONSHIP}
                      label={localizationText.COMMON.RELATIONSHIP}
                    />
                  </>
                )}
                {transferType !== TransferTypes.CASH &&
                  transferService.serviceName !== TransferService.WESTERN_UNIION && (
                    <>
                      <IPayAnimatedTextInput
                        name={BeneficiaryFields.BENEFICIARY_NAME}
                        label={localizationText.NEW_BENEFICIARY.BENEFECIARY_FULL_NAME}
                      />
                      <IPayDropdown
                        dropdownType={localizationText.COMMON.RELATIONSHIP}
                        data={RELATIONSHIPS}
                        size={SNAP_POINTS.MID_LARGE}
                        name={BeneficiaryFields.RELATIONSHIP}
                        label={localizationText.COMMON.RELATIONSHIP}
                      />
                      <IPayDropdown
                        dropdownType={localizationText.COMMON.CITY}
                        data={cities}
                        size={SNAP_POINTS.MID_LARGE}
                        name={BeneficiaryFields.CITY}
                        label={localizationText.PROFILE.CITY_NAME}
                        isSearchable
                      />
                    </>
                  )}
                {transferType === TransferTypes.BANK && (
                  <>
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.ADDRESS}
                      label={localizationText.REPLACE_CARD.ADDRESS}
                    />

                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text={localizationText.COMMON.BANK_DETAILS}
                    />
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.IBAN}
                      label={localizationText.COMMON.IBAN}
                      editable
                    />
                    <IPayDropdown
                      dropdownType={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                      data={BANKS}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.BANK_NAME}
                      label={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                    />
                  </>
                )}

                {/* digital wallet */}
                {transferType === TransferTypes.DIGITAL_WALLET && (
                  <>
                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text={localizationText.NEW_BENEFICIARY.DIGITAL_WALLET_DETAILS}
                    />
                    <IPayDropdown
                      dropdownType={localizationText.NEW_BENEFICIARY.WALLER_TYPE}
                      data={WU_TRANSFER_TYPES}
                      size={SNAP_POINTS.X_SMALL}
                      name={BeneficiaryFields.WALLET_TYPE}
                      label={localizationText.NEW_BENEFICIARY.WALLER_TYPE}
                    />
                  </>
                )}
              </>
            </IPayScrollView>
            <IPayButton
              onPress={handleSubmit(onSubmit)}
              large
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
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

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
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayChip,
  IPayHeader,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { COUNTRIES, RELATIONSHIPS, SNAP_POINTS, WU_TRANSFER_TYPES } from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { AEAddBeneficiaryProps } from '@app/network/services/international-transfer/ae-add-beneficiary/ae-add-beneficiary.interface';
import addAEBeneficiary from '@app/network/services/international-transfer/ae-add-beneficiary/ae-add-beneficiary.service';
import {
  AEBeneficiaryBanksParam,
  AEBeneficiaryBanksProps,
  AlinmaExpressBanks,
} from '@app/network/services/international-transfer/ae-beneficiary-banks/ae-beneficiary-banks.interface';
import getAEBeneficiaryBanks from '@app/network/services/international-transfer/ae-beneficiary-banks/ae-beneficiary-banks.service';
import { DynamicField } from '@app/network/services/international-transfer/beneficiaries-dynamic-fields/beneficiaries-dynamic-fields.interface';
import { AddWUBeneficiaryProps } from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.interface';
import addWUbeneficiary from '@app/network/services/international-transfer/beneficiaries-wu/beneficiaries-wu.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, States, buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { transferService, dynamicFieldsData } = route?.params;
  const styles = beneficiaryTransferStyles(colors);
  const [apiError, setAPIError] = useState<string>('');
  const [beneficiariesWURes, setBeneficiariesWURes] = useState();
  const [beneficiariesAERes, setBeneficiariesAERes] = useState();
  const [alinmaBanks, setAlinmaBanks] = useState<AlinmaExpressBanks[]>([]);
  const [bankCode, setBankCode] = useState<string>('');

  const { cities } = useInternationalTransferHook();

  const validationSchema = Yup.object().shape({});
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

  const onSelectBank = (bankName: string) => {
    const filteredBank = alinmaBanks?.find((item) => item?.desc === bankName);
    setBankCode(filteredBank?.code ?? '');
  };

  const getAEBanks = async () => {
    const payload: AEBeneficiaryBanksParam = {
      // TODO need to update
      alinmaExpressType: '',
      countryCode: transferService?.countryCode,
    };
    try {
      const apiResponse: AEBeneficiaryBanksProps = await getAEBeneficiaryBanks(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setAlinmaBanks(apiResponse?.response?.banks);
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

  useEffect(() => {
    getAEBanks();
  }, []);

  const addWUBeneficiary = async (payload) => {
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

  const postBeneficiariesAE = async (payload) => {
    try {
      const apiResponse: AEAddBeneficiaryProps = await addAEBeneficiary(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiariesAERes(apiResponse);
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
        bankCode,
        // TODO need to update
        correspondingBankCode: '',
      },
      beneficiaryType: transferService?.beneficiaryType ?? '',
      countryCode: transferService?.countryCode ?? '',
      nickname: data?.beneficiaryNickName ?? '',
      dynamicFields,
      currency: transferService?.currencyCode ?? '',
      remittanceType: transferService?.remittanceType ?? '',
    };
    if (transferService.serviceName === TransferService.WESTERN_UNIION) {
      addWUBeneficiary(payload);
    } else {
      postBeneficiariesAE(payload);
    }
  };

  const getBanksData = () => alinmaBanks?.map((item, idx) => ({ id: idx + 1, title: item?.desc, code: item?.code }));

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
          <IPayHeader backBtn title="NEW_BENEFICIARY.NEW_BENEFICIARY" applyFlex />
          <IPayView style={styles.container}>
            <IPayImage image={transferService?.serviceLogo} style={styles.logoStyles} />
            <IPayCaption1Text
              text={`${t('COMMON.DELIVERY_TYPE')}: ${transferService.transferType}`}
              style={styles.caption}
            />
            <IPayTitle2Text text={transferService.serviceName} style={styles.heading} />
            <IPayScrollView contentContainerStyle={styles.innerContainer}>
              <>
                <IPayFootnoteText
                  color={colors.natural.natural500}
                  style={styles.textStyle}
                  text="NEW_BENEFICIARY.BENEFECIARY_INFORMATION"
                />

                <IPayAnimatedTextInput
                  name={BeneficiaryFields.BENEFICIARY_NICK_NAME}
                  label="NEW_BENEFICIARY.BENEFICIARY_NICK_NAME_OPTIONAL"
                />
                {transferService.serviceName === TransferService.WESTERN_UNIION && (
                  <>
                    <IPayChip
                      icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} />}
                      variant={States.SEVERE}
                      headingStyles={styles.chipHeading}
                      textValue="NEW_BENEFICIARY.NAME_SHOULD_BE_ENGLISH"
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
                      text="NEW_BENEFICIARY.OTHER_INFORMATION"
                    />
                    <IPayDropdown
                      dropdownType="NEW_BENEFICIARY.BENEFECIARY_NATIONALITY"
                      data={COUNTRIES}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.BENEFICIARY_NATIONALITY}
                      label="NEW_BENEFICIARY.BENEFECIARY_NATIONALITY"
                    />
                  </>
                )}
                {transferService.transferType !== TransferTypes.CASH && (
                  <>
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.BENEFICIARY_NAME}
                      label="NEW_BENEFICIARY.BENEFECIARY_FULL_NAME"
                    />
                    <IPayDropdown
                      dropdownType="COMMON.RELATIONSHIP"
                      data={RELATIONSHIPS}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.RELATIONSHIP}
                      label="COMMON.RELATIONSHIP"
                    />
                    <IPayDropdown
                      dropdownType="COMMON.CITY"
                      data={cities}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.CITY}
                      label="PROFILE.CITY_NAME"
                      isSearchable
                    />
                  </>
                )}
                {transferService.transferType !== TransferTypes.CASH &&
                  transferService.serviceName !== TransferService.WESTERN_UNIION && (
                    <>
                      {dynamicFieldsData?.length &&
                        dynamicFieldsData?.map((item: DynamicField) => (
                          <IPayAnimatedTextInput
                            key={item?.label}
                            name={dynamicFieldKeys[item?.index]}
                            label={item?.label}
                          />
                        ))}
                      <IPayDropdown
                        dropdownType="COMMON.RELATIONSHIP"
                        data={RELATIONSHIPS}
                        size={SNAP_POINTS.MID_LARGE}
                        name={BeneficiaryFields.RELATIONSHIP}
                        label="COMMON.RELATIONSHIP"
                      />
                      <IPayDropdown
                        dropdownType="COMMON.CITY"
                        data={cities}
                        size={SNAP_POINTS.MID_LARGE}
                        name={BeneficiaryFields.CITY}
                        label="PROFILE.CITY_NAME"
                        isSearchable
                      />
                    </>
                  )}
                {transferService.transferType === TransferTypes.BANK && (
                  <>
                    <IPayAnimatedTextInput name={BeneficiaryFields.ADDRESS} label="REPLACE_CARD.ADDRESS" />

                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text="COMMON.BANK_DETAILS"
                    />
                    <IPayAnimatedTextInput name={BeneficiaryFields.IBAN} label="COMMON.IBAN" editable />
                    <IPayDropdown
                      data={getBanksData()}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.BANK_NAME}
                      onSelectListItem={onSelectBank}
                      dropdownType="INTERNATIONAL_TRANSFER.BANK_NAME"
                      label="INTERNATIONAL_TRANSFER.BANK_NAME"
                    />
                  </>
                )}

                {/* digital wallet */}
                {transferService.transferType === TransferTypes.DIGITAL_WALLET && (
                  <>
                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text="NEW_BENEFICIARY.DIGITAL_WALLET_DETAILS"
                    />
                    <IPayDropdown
                      dropdownType="NEW_BENEFICIARY.WALLER_TYPE"
                      data={WU_TRANSFER_TYPES}
                      size={SNAP_POINTS.X_SMALL}
                      name={BeneficiaryFields.WALLET_TYPE}
                      label="NEW_BENEFICIARY.WALLER_TYPE"
                    />
                  </>
                )}
              </>
            </IPayScrollView>
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

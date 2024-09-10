import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayFlatlist, IPayIcon, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { REGEX } from '@app/constants/app-validations';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  BeneficiaryInfo,
  LocalTransferAddBeneficiaryMockProps,
} from '@app/network/services/local-transfer/add-new-beneficiary/add-new-beneficiary.interface';
import addLocalTransferBeneficiary from '@app/network/services/local-transfer/add-new-beneficiary/add-new-beneficiary.service';
import {
  BeneficiaryBankDetailsReq,
  BeneficiaryBankDetailsRes,
  LocalTransferBeneficiaryBankMockProps,
} from '@app/network/services/local-transfer/beneficiary-bank-details/beneficiary-bank-details.interface';
import getlocalTransferBeneficiaryBankDetails from '@app/network/services/local-transfer/beneficiary-bank-details/beneficiary-bank-details.service';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { AddBeneficiary, ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormValues, IPayCreateBeneficiaryProps, ListOption } from './ipay-create-beneficiary.interface';
import createBeneficiaryStyles from './ipay-create-beneficiary.style';

/**
 * A component to display add new beneficiary form.
 * @param {string} props.testID - Test ID for testing purposes.
 */
const IPayCreateBeneficiary: React.FC<IPayCreateBeneficiaryProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = createBeneficiaryStyles(colors);
  const { showToast } = useToastContext();
  const localizationText = useLocalization();
  const [beneficiaryData, setBeneficiaryData] = useState<FormValues>();
  const [isBeneficiaryCreated, setIsBeneficiaryCreated] = useState<boolean>(false);
  const [beneficiaryBankDetails, setBeneficiaryBankDetails] = useState<BeneficiaryBankDetailsRes>();
  const currency = 'SAR';
  const countryCode = 'SA';

  const { beneficiaryNameSchema, ibanSchema, beneficiaryNickNameSchema, bankNameSchema } =
    getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    beneficiaryName: beneficiaryNameSchema,
    iban: ibanSchema,
    beneficiaryNickName: beneficiaryNickNameSchema,
    bankName: bankNameSchema,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      beneficiaryName: '',
      iban: '',
      bankName: '',
      beneficiaryNickName: '',
    },
  });

  const generatedData = () => {
    if (beneficiaryData) {
      return Object.entries(beneficiaryData).map(([key, value]) => ({
        key,
        value,
      }));
    }
    return [];
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: localizationText.ERROR.SOMETHING_WENT_WRONG,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onSubmitData = async (values: FormValues) => {
    const payload: BeneficiaryInfo = {
      fullName: values?.beneficiaryName,
      nickname: values?.beneficiaryNickName,
      countryCode,
      beneficiaryAccountNumber: beneficiaryBankDetails?.beneficiaryAccountNo ?? '',
      currency,
      beneficiaryBankDetail: {
        bankCode: beneficiaryBankDetails?.bankCode ?? '',
        correspondingBankCode: beneficiaryBankDetails?.correspondingBankCode ?? '',
        bankName: beneficiaryBankDetails?.bankName ?? '',
      },
    };
    if (isValid) {
      const apiResponse: LocalTransferAddBeneficiaryMockProps = await addLocalTransferBeneficiary(payload);
      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        setBeneficiaryData(values);
        setIsBeneficiaryCreated(true);
      } else {
        renderToast(apiResponse?.error?.error ?? '');
      }
    }
  };

  const renderTitle = (title: string) => title?.split('_').join(' ');

  const renderItem = (item: ListOption) => {
    const { key, value } = item;
    return (
      <IPayList
        containerStyle={styles.listContainerStyle}
        title={renderTitle(key)}
        textStyle={[styles.listTitleText, key === AddBeneficiary.IBAN && styles.capitalizeText]}
        rightContainerStyles={styles.rightContainer}
        rightText={
          <IPayView testID={key} style={styles.rightTextStyle}>
            <IPaySubHeadlineText numberOfLines={2} color={colors.primary.primary800} regular>
              {value || '-'}
            </IPaySubHeadlineText>
            {key === AddBeneficiary.BANK_NAME && <IPayImage image={images.alinmaBankLogo} style={styles.imgStyle} />}
          </IPayView>
        }
      />
    );
  };

  const onIBanChange = async (ibanNumber: string) => {
    const params: BeneficiaryBankDetailsReq = {
      iban: ibanNumber,
      countryCode,
    };
    if (REGEX.IBAN.test(ibanNumber)) {
      const apiResponse: LocalTransferBeneficiaryBankMockProps = await getlocalTransferBeneficiaryBankDetails(params);
      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        setValue(AddBeneficiary.BANK_NAME, apiResponse?.data?.bankName ?? '');
        setBeneficiaryBankDetails(apiResponse?.data);
      } else {
        renderToast(apiResponse?.error?.error ?? '');
      }
    } else {
      setBeneficiaryBankDetails({});
    }
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      {isBeneficiaryCreated ? (
        <IPayView testID="flatlist" style={styles.beneficiaryContainer}>
          <IPayView style={styles.flatListWrapper}>
            <IPayFlatlist
              style={styles.flatlist}
              data={generatedData()}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item.key.toString()}
            />
          </IPayView>
          <IPayButton
            btnText={localizationText.COMMON.CONFIRM}
            btnType={buttonVariants.PRIMARY}
            large
            btnIconsDisabled
            btnStyle={styles.btnStyle}
            onPress={() => navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, {})}
            testID="confirm-btn"
          />
        </IPayView>
      ) : (
        <IPayView testID="new-beneficiary">
          <IPayView style={styles.innerContainer}>
            <Controller
              name={AddBeneficiary.BENEFICIARY_NAME}
              control={control}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NAME}
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors.beneficiaryName}
                  testID="beneficiaryName"
                  assistiveText={errors?.beneficiaryName && errors?.beneficiaryName?.message}
                />
              )}
            />
            <Controller
              name={AddBeneficiary.IBAN}
              control={control}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  maxLength={22}
                  label={localizationText.COMMON.IBAN}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    onIBanChange(text);
                  }}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors.iban}
                  maxLength={34}
                  testID="iban"
                  assistiveText={errors?.iban && errors?.iban?.message}
                />
              )}
            />
            <IPayList
              containerStyle={watch(AddBeneficiary.IBAN).length > 9 ? styles.listContainerStyle : styles.inputVariant}
              title={localizationText.COMMON.BANK_NAME}
              rightText={
                <IPayView style={styles.rightTextStyle}>
                  {beneficiaryBankDetails?.bankName && (
                    <>
                      <IPaySubHeadlineText color={colors.primary.primary800} regular>
                        {beneficiaryBankDetails?.bankName}
                      </IPaySubHeadlineText>
                      <IPayImage image={beneficiaryBankDetails?.bankLogo} style={styles.imgStyle} />
                    </>
                  )}
                </IPayView>
              }
            />
            <Controller
              name={AddBeneficiary.BENEFICIARY_NICK_NAME}
              control={control}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.NEW_BENEFICIARY.BENEFICIARY_NICK_NAME_OPTIONAL}
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.beneficiaryNickName}
                  assistiveText={errors?.beneficiaryNickName && errors?.beneficiaryNickName?.message}
                />
              )}
            />
          </IPayView>
          <IPayButton
            onPress={handleSubmit(onSubmitData)}
            disabled={!watch(AddBeneficiary.BENEFICIARY_NAME) || !watch(AddBeneficiary.IBAN)}
            btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
            btnType={buttonVariants.PRIMARY}
            large
            btnStyle={styles.btnStyle}
            testID="beneficiary-btn"
            btnIconsDisabled
          />
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayCreateBeneficiary;

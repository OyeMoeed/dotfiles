import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { REGEX } from '@app/constants/app-validations';
import { ALINMA_BANK_CODE } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  BeneficiaryInfo,
  LocalTransferAddBeneficiaryMockProps,
} from '@app/network/services/local-transfer/add-new-beneficiary/add-new-beneficiary.interface';
import addLocalTransferBeneficiary from '@app/network/services/local-transfer/add-new-beneficiary/add-new-beneficiary.service';
import { BeneficiaryBankDetailsReq } from '@app/network/services/local-transfer/beneficiary-bank-details/beneficiary-bank-details.interface';
import LocalBeneficiaryMetaMockProps, {
  LocalBank,
} from '@app/network/services/local-transfer/local-transfer-beneficiary-metadata/local-beneficiary-metadata.interface';
import getlocalBeneficiaryMetaData from '@app/network/services/local-transfer/local-transfer-beneficiary-metadata/local-beneficiary-metadata.service';
import validateIBAN from '@app/network/services/local-transfer/validate-iban/validate-iban.service';
import { getValidationSchemas } from '@app/services';
import useTheme from '@app/styles/hooks/theme.hook';
import { getBankIconByCode } from '@app/utilities';
import {
  AddBeneficiary,
  AddBeneficiaryKey,
  ApiResponseStatusType,
  buttonVariants,
  spinnerVariant,
} from '@app/utilities/enums.util';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {
  BankDetails,
  BeneficiaryBankDetails,
  FormValues,
  IPayCreateBeneficiaryProps,
  ListOption,
  TransferTypes,
} from './ipay-create-beneficiary.interface';
import createBeneficiaryStyles from './ipay-create-beneficiary.style';

/**
 * A component to display add new beneficiary form.
 * @param {string} props.testID - Test ID for testing purposes.
 */
const IPayCreateBeneficiary: React.FC<IPayCreateBeneficiaryProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = createBeneficiaryStyles(colors);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();
  const localizationText = useLocalization();
  const [beneficiaryData, setBeneficiaryData] = useState<FormValues>();
  const [isBeneficiaryCreated, setIsBeneficiaryCreated] = useState<boolean>(false);
  const [bankList, setBankList] = useState<LocalBank[]>([]);
  const [beneficiaryBankDetails, setBeneficiaryBankDetails] = useState<BeneficiaryBankDetails>();
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
  const formatKey = (key: string) =>
    key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
      .replace(/^./, (str) => str?.toUpperCase()); // Capitalize the first letter
  const generatedData = () => {
    if (beneficiaryData) {
      return Object.entries(beneficiaryData).map(([key, value]) => ({
        key: formatKey(key),
        value,
      }));
    }
    return [];
  };

  const getBankList = async () => {
    const apiResponse: LocalBeneficiaryMetaMockProps = await getlocalBeneficiaryMetaData();
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      setBankList(apiResponse.response.localBanks);
    }
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
  useEffect(() => {
    getBankList();
  }, []);

  const onSubmitData = async (values: FormValues) => {
    const payload: BeneficiaryInfo = {
      beneficiaryAccountNumber: beneficiaryBankDetails?.beneficiaryAccountNo,
      fullName: values?.beneficiaryName,
      nickname: values?.beneficiaryNickName,
      beneficiaryBankDetail: {
        bankCode: beneficiaryBankDetails?.bankCode,
        bankName: beneficiaryBankDetails?.bankName,
      },
      beneficiaryType:
        beneficiaryBankDetails?.bankCode === ALINMA_BANK_CODE
          ? TransferTypes.alinmaBank
          : TransferTypes.localBankInsideKsa,
    };

    if (isValid) {
      renderSpinner(true);
      const apiResponse: LocalTransferAddBeneficiaryMockProps = await addLocalTransferBeneficiary(payload);

      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        setBeneficiaryData(values);
        navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, { response: apiResponse });
        renderSpinner(false);
      }
    }
    renderSpinner(false);
  };

  const onPrepareData = async (values: FormValues) => {
    if (isValid) {
      setBeneficiaryData(values);
      setIsBeneficiaryCreated(true);
    }
  };
  const renderTitle = (title: string) => title?.split('_').join(' ');

  const renderItem = (item: ListOption) => {
    const { key, value } = item;
    return (
      <IPayList
        containerStyle={styles.listContainerStyle}
        title={renderTitle(key)}
        textStyle={[styles.listTitleText, key === AddBeneficiaryKey.IBAN && styles.capitalizeText]}
        rightContainerStyles={styles.rightContainer}
        rightText={
          <IPayView testID={key} style={styles.rightTextStyle}>
            <IPaySubHeadlineText numberOfLines={2} color={colors.primary.primary800} regular>
              {value || '-'}
            </IPaySubHeadlineText>
            {key === AddBeneficiaryKey.BANK_NAME && getBankIconByCode(beneficiaryBankDetails?.bankCode, 40)}
          </IPayView>
        }
      />
    );
  };

  const getBankDetails = (bankCode: string, ibanNumber: string) => {
    const bankDetails = bankList.find((bank: BankDetails) => bank.code === bankCode);

    if (bankDetails) {
      const { desc: bankName } = bankDetails;
      setValue(AddBeneficiary.BANK_NAME, bankName);
      setBeneficiaryBankDetails({
        bankCode,
        bankName,
        beneficiaryAccountNo: ibanNumber,
      });
    }
  };

  const onIBanChange = async (ibanNumber: string) => {
    const params: BeneficiaryBankDetailsReq = {
      iban: ibanNumber,
      countryCode,
    };
    if (REGEX.IBAN.test(ibanNumber)) {
      renderSpinner(true);
      const apiResponse = await validateIBAN(params);
      if (apiResponse?.bankCode) {
        getBankDetails(apiResponse.bankCode, ibanNumber);
      } else {
        renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
      }
    }
    renderSpinner(false);
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
            onPress={handleSubmit(onSubmitData)}
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
                  maxLength={24}
                  label={localizationText.COMMON.IBAN}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    onIBanChange(text);
                  }}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors.iban}
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
                      {getBankIconByCode(beneficiaryBankDetails?.bankCode, 40)}
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
            onPress={handleSubmit(onPrepareData)}
            disabled={!watch(AddBeneficiary.BENEFICIARY_NAME) || !watch(AddBeneficiary.IBAN) || !isValid}
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

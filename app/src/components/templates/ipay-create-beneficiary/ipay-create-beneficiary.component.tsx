import { IPayFlatlist, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import { REGEX } from '@app/constants/app-validations';
import { ALINMA_BANK_CODE } from '@app/constants/constants';
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
import { AddBeneficiary, AddBeneficiaryKey, ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const styles = createBeneficiaryStyles(colors);
  const [beneficiaryData, setBeneficiaryData] = useState<FormValues>();
  const [isBeneficiaryCreated, setIsBeneficiaryCreated] = useState<boolean>(false);
  const [bankList, setBankList] = useState<LocalBank[]>([]);
  const [beneficiaryBankDetails, setBeneficiaryBankDetails] = useState<BeneficiaryBankDetails>();
  const countryCode = 'SA';

  const { beneficiaryNameSchema, ibanSchema, beneficiaryNickNameSchema, bankNameSchema } = getValidationSchemas(t);

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

  useEffect(() => {
    getBankList();
  }, []);

  const onSubmitData = async (values: FormValues) => {
    const beneficiaryName = values?.beneficiaryName;
    const nameSplit = beneficiaryName?.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : '';

    const payload: BeneficiaryInfo = {
      beneficiaryAccountNumber: beneficiaryBankDetails?.beneficiaryAccountNo,
      fullName: values?.beneficiaryName,
      nickname: values?.beneficiaryNickName ? values?.beneficiaryNickName : `${firstName} ${lastName}`,
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
      const apiResponse: LocalTransferAddBeneficiaryMockProps = await addLocalTransferBeneficiary(payload);

      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        setBeneficiaryData(values);
        navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, { response: apiResponse });
      }
    }
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
      const apiResponse = await validateIBAN(params);
      if (apiResponse?.bankCode) {
        getBankDetails(apiResponse.bankCode, ibanNumber);
      }
    }
  };

  const onBeneficiaryNameChange = (text: string, onChange: (...event: any[]) => void) => {
    const filteredText = text.replace(REGEX.name, '');
    onChange(filteredText);
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
            btnText="COMMON.CONFIRM"
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
                  label="NEW_BENEFICIARY.BENEFECIARY_NAME"
                  value={value}
                  maxLength={50}
                  onChangeText={(text) => onBeneficiaryNameChange(text, onChange)}
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
                  maxLength={34}
                  label="COMMON.IBAN"
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
              title="COMMON.BANK_NAME"
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
                  label="NEW_BENEFICIARY.BENEFICIARY_NICK_NAME_OPTIONAL"
                  value={value}
                  maxLength={50}
                  onChangeText={(text) => onBeneficiaryNameChange(text, onChange)}
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
            btnText="NEW_BENEFICIARY.ADD_BENEFICIARY"
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

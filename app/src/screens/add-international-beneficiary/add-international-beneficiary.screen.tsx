import { IPayCheckbox, IPayFlag, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import getBeneficiariesDynamicFields from '@app/network/services/international-transfer/beneficiaries-dynamic-fields/beneficiaries-dynamic-fields.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useMemo } from 'react';
import useGetAECountries from '@app/network/services/international-transfer/ae-beneficiary-countries/use-get-ae-countries.hook';
import useGetAEMetadata from '@app/network/services/international-transfer/ae-beneficiary-metadata/use-get-ae-metadata.hook';
import useGETAEBanks from '@app/network/services/international-transfer/ae-beneficiary-banks/use-get-ae-banks.hook';
import useGetWUMetadata from '@app/network/services/international-transfer/wu-beneficiary-metadata/use-get-wu-metadata.hook';
import useGetWUCurrencies from '@app/network/services/international-transfer/wu-beneficiary-currencies/use-get-wu-currencies.hook';
import useGetWURemittance from '@app/network/services/international-transfer/wu-remittance-types/use-get-wu-remittance.hook';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import useGetWuBanks from '@app/network/services/international-transfer/wu-beneficiary-banks/use-get-wu-banks.hook';
import { ImageStyle, StyleProp } from 'react-native';
import { Controller } from 'react-hook-form';
import useGetAECurrencies from '@app/network/services/international-transfer/ae-beneficiary-currencies/use-get-ae-countries.hook';
import addBeneficiaryStyles from './add-international-beneficiary.style';
import { AddBeneficiaryValues, ServiceDataProps } from './add-international-beneficiary.interface';
import { InternationalTransferValue } from '../international-beneficiary-transfer-form/international-beneficiary-transfer-form.interface';
import useAddInternationalBenValidation from './add-international-beneficiary.factory';

const TransferMethods = ({ data, formProps }: ServiceDataProps) => {
  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = formProps;
  const values = watch();

  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);

  const isAlinmaPay = useMemo(() => values?.transferType === InternationalTransferValue.AE, [values?.transferType]);
  const isChecked = useMemo(() => !!values?.transferType, [values?.transferType]);
  const { serviceLogo, serviceName } = data;

  const { wuMetadata } = useGetWUMetadata({ enabled: !isAlinmaPay && isChecked });
  const { wuRemittanceTypes } = useGetWURemittance({
    enabled: !isAlinmaPay && isChecked,
    countryCode: values?.country,
    currencyCode: values?.currency,
  });
  const { wuCurrencies } = useGetWUCurrencies({
    countryCode: values?.country,
    enabled: !isAlinmaPay && isChecked,
  });
  const { wuBanks } = useGetWuBanks({
    countryCode: values?.country,
    remittanceType: values?.remittanceType,
    enabled: !isAlinmaPay && isChecked,
    currency: values?.currency,
  });

  const { aeMetadata } = useGetAEMetadata({ enabled: isAlinmaPay });
  const { aeCountries } = useGetAECountries({ enabled: isAlinmaPay, alinmaExpressType: values?.deliveryType });

  const { aeBanks } = useGETAEBanks({
    enabled: isAlinmaPay,
    alinmaExpressType: values?.deliveryType,
    countryCode: values?.country,
  });

  const { aeCurrencies } = useGetAECurrencies({
    enabled: isAlinmaPay,
    bank: values?.bank?.correspondantBank,
    alinmaExpressType: values?.deliveryType,
  });

  const bankField = [
    {
      index: 'bank',
      label: 'TRANSACTION_HISTORY.BANK_NAME',
      lovList: wuBanks as ListItem[],
      type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
    },
  ];

  const getFields = (): DynamicField[] => {
    if (isChecked) {
      if (isAlinmaPay) {
        return [
          {
            index: 'nickname',
            label: 'INTERNATIONAL_TRANSFER.BENEFICIARY_NICK_NAME',
            type: DYNAMIC_FIELDS_TYPES.TEXT,
          },
          {
            index: 'deliveryType',
            label: 'NEW_BENEFICIARY.SELECT_DELIVERY_TYPE',
            type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
            lovList: aeMetadata,
          },
          {
            index: 'country',
            label: 'INTERNATIONAL_TRANSFER.COUNTRY',
            lovList: aeCountries,
            type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
            rightIcon: values?.country ? (
              <IPayFlag countryCode={values?.country || ''} style={styles.flagStyle} />
            ) : (
              <IPayView />
            ),
            isCountry: true,
          },
          {
            index: 'bank',
            label: 'TRANSACTION_HISTORY.BANK_NAME',
            lovList: aeBanks,
            type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
            returnFullValue: true,
            value: values?.bank?.code,
          },
          {
            index: 'currency',
            label: 'INTERNATIONAL_TRANSFER.CURRENCY',
            lovList: aeCurrencies,
            type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
            isCurrency: true,
          },
        ];
      }
      return [
        {
          index: 'nickname',
          label: 'INTERNATIONAL_TRANSFER.BENEFICIARY_NICK_NAME',
          type: DYNAMIC_FIELDS_TYPES.TEXT,
        },
        {
          index: 'country',
          label: 'INTERNATIONAL_TRANSFER.COUNTRY',
          lovList: wuMetadata,
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
          rightIcon: values?.country ? (
            <IPayFlag countryCode={values?.country || ''} style={styles.flagStyle} />
          ) : (
            <IPayView />
          ),
          isCountry: true,
        },
        {
          index: 'currency',
          label: 'INTERNATIONAL_TRANSFER.CURRENCY',
          lovList: wuCurrencies,
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
          isCurrency: true,
        },
        {
          index: 'remittanceType',
          label: 'NEW_BENEFICIARY.SELECT_DELIVERY_TYPE',
          lovList: wuRemittanceTypes,
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
        },
        ...(values?.remittanceType === '500' ? bankField : []),
      ];
    }
    return [];
  };

  return (
    <IPayView style={styles.cardStyle}>
      <IPayView style={styles.rowStylesOuter}>
        <IPayView style={styles.rowStyles}>
          <IPayImage image={serviceLogo} style={styles.logoStyles as StyleProp<ImageStyle>} />
          <IPayFootnoteText style={styles.textColor} text={serviceName} />
        </IPayView>
        <Controller
          name="transferType" // Use the flattened key
          control={control}
          render={({ field: { value } }) => (
            <IPayCheckbox
              isCheck={value === data?.serviceValue}
              onPress={() => {
                reset({
                  transferType: data?.serviceValue,
                });
              }}
            />
          )}
        />
      </IPayView>
      {values?.transferType === data?.serviceValue && (
        <DynamicFormComponent fields={getFields()} control={control} errors={errors} watch={watch} />
      )}
    </IPayView>
  );
};

const AddInternationalBeneficiaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const { alinmaDirectData, westernUnionData } = useConstantData();
  const { validationSchema } = useAddInternationalBenValidation();

  const getBeneficiariesDynamicFieldsData = async (data: AddBeneficiaryValues) => {
    const payload = {
      beneficiaryType: data?.transferType,
      remittanceType: data.remittanceType,
      countryCode: data.country,
      currencyCode: data.currency,
      deliveryType: '',
      bank: data?.bank,
    };
    try {
      const apiResponse = await getBeneficiariesDynamicFields(payload);
      if (apiResponse?.successfulResponse) {
        navigate(ScreenNames.INTERNATIONAL_BENEFICIARY_TRANSFER_FORM, {
          data,
          dynamicFieldsData: apiResponse?.response?.dynamicFields,
          transferService: data?.transferType === InternationalTransferValue.WU ? westernUnionData : alinmaDirectData,
        });
      }
    } catch {
      /* empty */
    }
  };

  return (
    <IPayFormProvider<AddBeneficiaryValues>
      validationSchema={validationSchema}
      defaultValues={{
        currency: '',
        country: '',
        transferType: '',
        remittanceType: '',
        nickname: '',
        deliveryType: '',
        bank: undefined,
      }}
    >
      {(formProps) => {
        const {
          handleSubmit,
          formState: { isValid },
        } = formProps;

        return (
          <IPaySafeAreaView>
            <IPayHeader backBtn title="NEW_BENEFICIARY.NEW_BENEFICIARY" applyFlex />
            <IPayView style={styles.outerContainer}>
              <IPayFootnoteText
                color={colors.natural.natural500}
                style={styles.textStyle}
                text="NEW_BENEFICIARY.METHOD_OF_DELIVERY"
              />
              {[alinmaDirectData, westernUnionData]?.map((service) => (
                <TransferMethods key={service.recordID} data={service} formProps={formProps} />
              ))}
              <IPayButton
                large
                btnType={buttonVariants.PRIMARY}
                btnText="COMMON.NEXT"
                btnIconsDisabled
                onPress={handleSubmit(getBeneficiariesDynamicFieldsData)}
                btnStyle={styles.btnStyles}
                disabled={!isValid}
              />
            </IPayView>
          </IPaySafeAreaView>
        );
      }}
    </IPayFormProvider>
  );
};

export default AddInternationalBeneficiaryScreen;

import icons from '@app/assets/icons';
import { IPayCheckbox, IPayDropdown, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { ALINMA_TRANSFER_TYPES, CUSTOM_SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { BeneficiariesFieldsProps } from '@app/network/services/international-transfer/beneficiaries-dynamic-fields/beneficiaries-dynamic-fields.interface';
import getBeneficiariesDynamicFields from '@app/network/services/international-transfer/beneficiaries-dynamic-fields/beneficiaries-dynamic-fields.service';
import {
  Currencies,
  WUBeneficiaryCurrenciesProps,
} from '@app/network/services/international-transfer/wu-beneficiary-currencies/wu-beneficiary-currencies.interface';
import getWUBeneficiaryCurrencies from '@app/network/services/international-transfer/wu-beneficiary-currencies/wu-beneficiary-currencies.service';
import WUBeneficiaryMetaDataProps, {
  WesternUnionCountries,
} from '@app/network/services/international-transfer/wu-beneficiary-metadata/wu-beneficiary-metadata.interface';
import getWUBeneficiaryMetaData from '@app/network/services/international-transfer/wu-beneficiary-metadata/wu-beneficiary-metadata.service';
import {
  RemittanceType,
  WuRemittanceTypesProps,
} from '@app/network/services/international-transfer/wu-remittance-types/wu-remittance-types.interface';
import getWURemittanceTypes from '@app/network/services/international-transfer/wu-remittance-types/wu-remittance-types.service';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  AddBeneficiaryFields,
  AddBeneficiaryValues,
  ServiceData,
  ServiceDataProps,
} from './add-international-beneficiary.interface';
import addBeneficiaryStyles from './add-international-beneficiary.style';

const AddInternationalBeneficiaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const localizationText = useLocalization();
  const { AlinmaDirectData, WesternUnionData } = useConstantData();
  const [selectedService, setSelectedService] = useState<ServiceData>();
  const [beneficiaryMetaData, setBeneficiaryMetaData] = useState<WesternUnionCountries[]>([]);
  const [currenciesData, setCurrenciesData] = useState<Currencies[]>([]);
  const [remittanceTypeData, setRemittanceTypeData] = useState<RemittanceType[]>([]);
  const [apiError, setAPIError] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [remittanceType, setRemittanceType] = useState<string>('');

  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const { required } = getValidationSchemas(localizationText);
  const validationSchema = Yup.object().shape({
    currency: required,
    transferType: required,
  });

  const onSelectCountry = (countryName: string) => {
    const filterCode = beneficiaryMetaData?.find((item) => item?.desc === countryName);
    setCountryCode(filterCode?.code);
  };

  const onSelectCurrency = (currency: string) => {
    setCurrencyCode(currency);
  };

  const onSelectRemittanceType = (remittance: string) => {
    const filterCode = remittanceTypeData?.find((item) => item?.desc === remittance);
    setRemittanceType(filterCode?.code);
  };

  const getCountriesData = () => beneficiaryMetaData?.map((item, idx) => ({ id: idx + 1, title: item?.desc }));

  const getCurrenciesData = () => currenciesData?.map((item, idx) => ({ id: idx + 1, title: item?.code }));

  const getRemittancTypeData = () => remittanceTypeData?.map((item, idx) => ({ id: idx + 1, title: item?.desc }));

  const TransferMethods = ({ data }: ServiceDataProps) => {
    const { serviceLogo, recordID, serviceName } = data;
    const isCheck = selectedService?.recordID === recordID;
    return (
      <IPayView style={styles.cardStyle}>
        <IPayView style={styles.rowStylesOuter}>
          <IPayView style={styles.rowStyles}>
            <IPayImage image={serviceLogo} style={styles.logoStyles} />
            <IPayFootnoteText style={styles.textColor} text={serviceName} />
          </IPayView>
          <IPayCheckbox isCheck={isCheck} onPress={() => setSelectedService(data)} />
        </IPayView>
        {isCheck && (
          <>
            <IPayDropdown
              dropdownType={localizationText.INTERNATIONAL_TRANSFER.COUNTRY}
              data={getCountriesData()}
              size={SNAP_POINTS.MID_LARGE}
              name={AddBeneficiaryFields.country}
              label={localizationText.COMMON.BENEFECIARY_COUNTRY}
              isSearchable
              onSelectListItem={onSelectCountry}
            />
            <IPayDropdown
              dropdownType={localizationText.NEW_BENEFICIARY.SELECT_DELIVERY_TYPE}
              data={serviceName === AlinmaDirectData.serviceName ? ALINMA_TRANSFER_TYPES : getRemittancTypeData()}
              size={CUSTOM_SNAP_POINT.EXTRA_SMALL}
              name={AddBeneficiaryFields.transferType}
              label={localizationText.COMMON.DELIVERY_TYPE}
              onSelectListItem={onSelectRemittanceType}
            />
            <IPayDropdown
              dropdownType={localizationText.NEW_BENEFICIARY.CHOOSE_CURRENCY}
              data={getCurrenciesData()}
              size={SNAP_POINTS.MID_LARGE}
              name={AddBeneficiaryFields.currency}
              label={localizationText.COMMON.CURRENCY}
              onSelectListItem={onSelectCurrency}
            />
          </>
        )}
      </IPayView>
    );
  };

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

  const getWUBeneficiaryMetaDataData = async () => {
    renderSpinner(true);
    try {
      const apiResponse: WUBeneficiaryMetaDataProps = await getWUBeneficiaryMetaData();
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiaryMetaData(apiResponse?.response?.westernUnionCountryList);
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

  const getWUBeneficiaryCurrenciesData = async () => {
    renderSpinner(true);
    const payload = {
      countryCode,
    };
    try {
      const apiResponse: WUBeneficiaryCurrenciesProps = await getWUBeneficiaryCurrencies(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setCurrenciesData(apiResponse?.response?.currencies);
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

  const getWURemittanceTypesData = async () => {
    renderSpinner(true);
    const payload = {
      countryCode,
      currencyCode,
    };
    try {
      const apiResponse: WuRemittanceTypesProps = await getWURemittanceTypes(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setRemittanceTypeData(apiResponse?.response?.remittanceTypes);
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

  useEffect(() => {
    getWUBeneficiaryMetaDataData();
    getWUBeneficiaryCurrenciesData();
    getWURemittanceTypesData();
  }, []);

  const getBeneficiariesDynamicFieldsData = async (data: AddBeneficiaryValues) => {
    renderSpinner(true);
    const payload = {
      beneficiaryType: selectedService?.beneficiaryType,
      remittanceType,
      countryCode,
      currencyCode,
    };
    try {
      const apiResponse: BeneficiariesFieldsProps = await getBeneficiariesDynamicFields(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          navigate(ScreenNames.INTERNATIONAL_BENEFICIARY_TRANSFER_FORM, {
            transferService: { ...data, ...selectedService, remittanceType, countryCode, currencyCode },
            dynamicFieldsData: apiResponse?.response?.dynamicFields,
          });
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

  const handleBeneficiaryTransfer = (data: AddBeneficiaryValues) => {
    getBeneficiariesDynamicFieldsData(data);
  };

  return (
    <IPayFormProvider<AddBeneficiaryValues>
      validationSchema={validationSchema}
      defaultValues={{
        currency: '',
        country: '',
        transferType: '',
      }}
      mode="onChange"
      reValidateMode="onChange"
    >
      {({ handleSubmit, formState: { isValid } }) => (
        <IPaySafeAreaView>
          <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
          <IPayView style={styles.outerContainer}>
            <IPayFootnoteText
              color={colors.natural.natural500}
              style={styles.textStyle}
              text={localizationText.NEW_BENEFICIARY.METHOD_OF_DELIVERY}
            />
            <TransferMethods data={AlinmaDirectData} />
            <TransferMethods data={WesternUnionData} />
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.COMMON.NEXT}
              btnIconsDisabled
              onPress={handleSubmit(handleBeneficiaryTransfer)}
              btnStyle={styles.btnStyles}
              disabled={!isValid}
            />
          </IPayView>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default AddInternationalBeneficiaryScreen;

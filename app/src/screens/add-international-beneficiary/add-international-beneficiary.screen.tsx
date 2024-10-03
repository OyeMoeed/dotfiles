import icons from '@app/assets/icons';
import {
  IPayCheckbox,
  IPayDropdown,
  IPayFlag,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { ALINMA_TRANSFER_TYPES, CUSTOM_SNAP_POINT, SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { AEBeneficiaryCountriesProps } from '@app/network/services/international-transfer/ae-beneficiary-countries/ae-beneficiary-countries.interface';
import getAEBeneficiaryCountries from '@app/network/services/international-transfer/ae-beneficiary-countries/ae-beneficiary-countries.service';
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
import { getValidationSchemas } from '@app/services';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { TransferService } from '../international-beneficiary-transfer-form/international-beneficiary-transfer-form.interface';
import {
  AddBeneficiaryFields,
  AddBeneficiaryValues,
  ServiceDataProps,
} from './add-international-beneficiary.interface';
import addBeneficiaryStyles from './add-international-beneficiary.style';

const TransferMethods = ({
  data,
  setSelectedService,
  countryCode,
  setCountryCode,
  beneficiaryMetaData,
  setCurrencyCode,
  setRemittanceType,
  setAPIError,
  renderToast,
  isChecked,
}: ServiceDataProps) => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const { t } = useTranslation();
  const [currenciesData, setCurrenciesData] = useState<Currencies[]>([]);
  const [remittanceTypeData, setRemittanceTypeData] = useState<RemittanceType[]>([]);

  const { serviceLogo, serviceName } = data;

  const getWUBeneficiaryCurrenciesData = async (code: string) => {
    const payload = {
      countryCode: code,
    };
    try {
      const apiResponse: WUBeneficiaryCurrenciesProps = await getWUBeneficiaryCurrencies(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setCurrenciesData(apiResponse?.response?.currencies);
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

  const getWURemittanceTypesData = async (code: string) => {
    const payload = {
      countryCode,
      currencyCode: code,
    };
    try {
      const apiResponse: WuRemittanceTypesProps = await getWURemittanceTypes(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setRemittanceTypeData(apiResponse?.response?.remittanceTypes);
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

  const getCountriesData = () =>
    beneficiaryMetaData?.map((item, idx) => ({
      id: idx + 1,
      title: item?.desc,
      countryCode: item?.code,
    }));

  const getCurrenciesData = () => currenciesData?.map((item, idx) => ({ id: idx + 1, title: item?.code }));

  const getRemittancTypeData = () => remittanceTypeData?.map((item, idx) => ({ id: idx + 1, title: item?.desc }));

  const onSelectCountry = (countryName: string) => {
    const filterCode = beneficiaryMetaData?.find((item) => item?.desc === countryName);
    setCountryCode(filterCode?.code);
    getWUBeneficiaryCurrenciesData(filterCode?.code);
  };

  const onSelectCurrency = (currency: string) => {
    setCurrencyCode(currency);
    getWURemittanceTypesData(currency);
  };

  const onSelectRemittanceType = (remittance: string) => {
    const filterRemittanceType = remittanceTypeData?.find((item) => item?.desc === remittance);
    setRemittanceType(filterRemittanceType?.code);
  };

  return (
    <IPayView style={styles.cardStyle}>
      <IPayView style={styles.rowStylesOuter}>
        <IPayView style={styles.rowStyles}>
          <IPayImage image={serviceLogo} style={styles.logoStyles} />
          <IPayFootnoteText style={styles.textColor} text={serviceName} />
        </IPayView>
        <IPayCheckbox isCheck={isChecked} onPress={() => setSelectedService(data)} />
      </IPayView>
      {isChecked && (
        <>
          <IPayDropdown
            dropdownType="INTERNATIONAL_TRANSFER.COUNTRY"
            data={getCountriesData()}
            size={SNAP_POINTS.MID_LARGE}
            name={AddBeneficiaryFields.country}
            label="COMMON.BENEFECIARY_COUNTRY"
            isSearchable
            onSelectListItem={onSelectCountry}
            rightIcon={countryCode ? <IPayFlag countryCode={countryCode} style={styles.flagStyle} /> : <IPayView />}
          />
          <IPayDropdown
            dropdownType="NEW_BENEFICIARY.CHOOSE_CURRENCY"
            data={getCurrenciesData()}
            size={SNAP_POINTS.MID_LARGE}
            name={AddBeneficiaryFields.currency}
            label="COMMON.CURRENCY"
            onSelectListItem={onSelectCurrency}
          />
          <IPayDropdown
            dropdownType="NEW_BENEFICIARY.SELECT_DELIVERY_TYPE"
            data={serviceName === TransferService.ALINMAPAY_DIRECT ? ALINMA_TRANSFER_TYPES : getRemittancTypeData()}
            size={CUSTOM_SNAP_POINT.EXTRA_SMALL}
            name={AddBeneficiaryFields.transferType}
            label="COMMON.DELIVERY_TYPE"
            onSelectListItem={onSelectRemittanceType}
          />
        </>
      )}
    </IPayView>
  );
};

const AddInternationalBeneficiaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const { t } = useTranslation();
  const { alinmaDirectData, westernUnionData } = useConstantData();
  const [selectedService, setSelectedService] = useState<ServiceDataProps>();
  const [beneficiaryMetaData, setBeneficiaryMetaData] = useState<WesternUnionCountries[]>([]);
  const [apiError, setAPIError] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [remittanceType, setRemittanceType] = useState<string>('');

  const { showToast } = useToastContext();

  const { required } = getValidationSchemas(t);
  const validationSchema = Yup.object().shape({
    currency: required,
    transferType: required,
  });

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getWUBeneficiaryMetaDataData = async () => {
    const isWestern = selectedService?.serviceName === TransferService.WESTERN_UNIION;
    try {
      const apiResponse: WUBeneficiaryMetaDataProps = await getWUBeneficiaryMetaData(
        isWestern ? 'wu' : 'alinma-express',
      );
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          if (isWestern) {
            setBeneficiaryMetaData(apiResponse?.response?.westernUnionCountryList);
          } else {
            setBeneficiaryMetaData(apiResponse?.response?.alinmaExpressTypeList);
          }
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

  const getAEBeneficiaryCountriesData = async () => {
    const payload = {
      alinmaExpressType: remittanceType,
    };
    try {
      const apiResponse: AEBeneficiaryCountriesProps = await getAEBeneficiaryCountries(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiaryMetaData(apiResponse?.response?.countries);
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
    if (selectedService?.serviceName === TransferService.ALINMAPAY_DIRECT) {
      getAEBeneficiaryCountriesData();
    }
    getWUBeneficiaryMetaDataData();
  }, [selectedService?.serviceName]);

  const getBeneficiariesDynamicFieldsData = async (data: AddBeneficiaryValues) => {
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
          <IPayHeader backBtn title="NEW_BENEFICIARY.NEW_BENEFICIARY" applyFlex />
          <IPayView style={styles.outerContainer}>
            <IPayFootnoteText
              color={colors.natural.natural500}
              style={styles.textStyle}
              text="NEW_BENEFICIARY.METHOD_OF_DELIVERY"
            />
            {[alinmaDirectData, westernUnionData]?.map((service) => (
              <TransferMethods
                key={service.recordID}
                data={service}
                isChecked={selectedService?.recordID === service.recordID}
                setSelectedService={setSelectedService}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                beneficiaryMetaData={beneficiaryMetaData}
                setCurrencyCode={setCurrencyCode}
                setRemittanceType={setRemittanceType}
                setAPIError={setAPIError}
                renderToast={renderToast}
              />
            ))}
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.NEXT"
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

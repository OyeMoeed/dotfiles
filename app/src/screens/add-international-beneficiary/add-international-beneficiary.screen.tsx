import icons from '@app/assets/icons';
import { IPayCheckbox, IPayDropdown, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { ALINMA_TRANSFER_TYPES, CUSTOM_SNAP_POINT, SNAP_POINTS, WU_TRANSFER_TYPES } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  Currencies,
  WUBeneficiaryCurrenciesProps,
} from '@app/network/services/international-transfer/wu-beneficiary-currencies/wu-beneficiary-currencies.interface';
import getWUBeneficiaryCurrencies from '@app/network/services/international-transfer/wu-beneficiary-currencies/wu-beneficiary-currencies.service';
import WUBeneficiaryMetaDataProps, {
  WesternUnionCountries,
} from '@app/network/services/international-transfer/wu-beneficiary-metadata/wu-beneficiary-metadata.interface';
import getWUBeneficiaryMetaData from '@app/network/services/international-transfer/wu-beneficiary-metadata/wu-beneficiary-metadata.service';
import { getValidationSchemas } from '@app/services';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  AddBeneficiaryFields,
  AddBeneficiaryValues,
  ServiceDataProps,
} from './add-international-beneficiary.interface';
import addBeneficiaryStyles from './add-international-beneficiary.style';

const AddInternationalBeneficiaryScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const localizationText = useLocalization();
  const { alinmaDirectData, westernUnionData } = useConstantData();
  const [selectedService, setSelectedService] = useState<ServiceDataProps>();
  const [beneficiaryMetaData, setBeneficiaryMetaData] = useState<WesternUnionCountries[]>([]);
  const [currenciesData, setCurrenciesData] = useState<Currencies[]>([]);
  const [apiError, setAPIError] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const handleBeneficiaryTransfer = (data: AddBeneficiaryValues) => {
    navigate(ScreenNames.INTERNATIONAL_BENEFICIARY_TRANSFER_FORM, { transferService: { ...data, ...selectedService } });
  };
  const { showToast } = useToastContext();

  const { required } = getValidationSchemas(localizationText);
  const validationSchema = Yup.object().shape({
    currency: required,
    transferType: required,
  });

  const onSelectCountry = (countryName: string) => {
    const filterCode = beneficiaryMetaData?.find((item) => item?.desc === countryName);
    setCountryCode(filterCode?.code);
  };

  const getCountriesData = () => beneficiaryMetaData?.map((item, idx) => ({ id: idx + 1, title: item?.desc }));

  const getCurrenciesData = () => currenciesData?.map((item, idx) => ({ id: idx + 1, title: item?.code }));

  // TODO: Fix nested components
  // eslint-disable-next-line react/no-unstable-nested-components
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
              data={serviceName === alinmaDirectData.serviceName ? ALINMA_TRANSFER_TYPES : WU_TRANSFER_TYPES}
              size={CUSTOM_SNAP_POINT.EXTRA_SMALL}
              name={AddBeneficiaryFields.transferType}
              label={localizationText.COMMON.DELIVERY_TYPE}
            />
            <IPayDropdown
              dropdownType={localizationText.NEW_BENEFICIARY.CHOOSE_CURRENCY}
              data={getCurrenciesData()}
              size={SNAP_POINTS.MID_LARGE}
              name={AddBeneficiaryFields.currency}
              label={localizationText.COMMON.CURRENCY}
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

  const getWUBeneficiaryMetaDataData = async () => {
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
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const getWUBeneficiaryCurrenciesData = async () => {
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
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getWUBeneficiaryMetaDataData();
    getWUBeneficiaryCurrenciesData();
  }, []);

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
            <TransferMethods data={alinmaDirectData} />
            <TransferMethods data={westernUnionData} />
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

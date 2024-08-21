import { IPayCheckbox, IPayDropdown, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { COUNTRIES, CURRENCIES, SNAP_POINTS, TRANSFER_TYPES } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
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
  const handleBeneficiaryTransfer = () => {
    navigate(ScreenNames.INTERNATIONAL_BENEFICIARY_TRANSFER_FORM, { transferService: selectedService });
  };

  const { required } = getValidationSchemas(localizationText);
  const validationSchema = Yup.object().shape({
    currency: required,
    transferType: required,
  });
  const TransferModes = ({ data }: ServiceDataProps) => {
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
              data={COUNTRIES}
              size={SNAP_POINTS.MID_LARGE}
              name={AddBeneficiaryFields.country}
              label={localizationText.COMMON.BENEFECIARY_COUNTRY}
              isSearchable
            />
            <IPayDropdown
              dropdownType={localizationText.COMMON.DELIVERY_TYPE}
              data={TRANSFER_TYPES}
              size={SNAP_POINTS.MID_LARGE}
              name={AddBeneficiaryFields.transferType}
              label={localizationText.COMMON.DELIVERY_TYPE}
            />
            <IPayDropdown
              dropdownType={localizationText.COMMON.CURRENCY}
              data={CURRENCIES}
              size={SNAP_POINTS.MID_LARGE}
              name={AddBeneficiaryFields.currency}
              label={localizationText.COMMON.CURRENCY}
            />
          </>
        )}
      </IPayView>
    );
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
            <TransferModes data={AlinmaDirectData} />
            <TransferModes data={WesternUnionData} />
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

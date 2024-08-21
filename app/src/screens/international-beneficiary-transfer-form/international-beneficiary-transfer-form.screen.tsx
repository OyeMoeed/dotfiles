import {
  IPayCaption1Text,
  IPayDropdown,
  IPayFootnoteText,
  IPayImage,
  IPayScrollView,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { BANKS, RELATIONSHIPS, SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import * as Yup from 'yup';
import useInternationalTransferHook from './international-beneficiary-transfer-form.hook';
import { BeneficiaryFields, BeneficiaryTransferFormValues } from './international-beneficiary-transfer-form.interface';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';

const IBeneficiaryTransferScreen: React.FC = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const { transferService } = route?.params;
  const styles = beneficiaryTransferStyles(colors);
  const localizationText = useLocalization();
  const { onSubmit, cities } = useInternationalTransferHook();
  const { city, required } = getValidationSchemas(localizationText);
  const validationSchema = Yup.object().shape({
    city: city,
    beneficiaryName: required,
    iban: required,
    bankName: required,
    relationship: required,
    address: required,
  });

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
      }}
    >
      {({ handleSubmit }) => (
        <IPaySafeAreaView>
          <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
          <IPayView style={styles.container}>
            <IPayImage image={transferService?.serviceLogo} style={styles.logoStyles} />
            <IPayCaption1Text
              text={`${localizationText.COMMON.DELIVERY_TYPE}: ${transferService.type}`}
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
                <IPayAnimatedTextInput name={BeneficiaryFields.ADDRESS} label={localizationText.REPLACE_CARD.ADDRESS} />
                <IPayFootnoteText
                  color={colors.natural.natural500}
                  style={styles.textStyle}
                  text={localizationText.COMMON.BANK_DETAILS}
                />
                <IPayAnimatedTextInput name={BeneficiaryFields.IBAN} label={localizationText.COMMON.IBAN} editable />
                <IPayDropdown
                  dropdownType={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                  data={BANKS}
                  size={SNAP_POINTS.MID_LARGE}
                  name={BeneficiaryFields.BANK_NAME}
                  label={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                />
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

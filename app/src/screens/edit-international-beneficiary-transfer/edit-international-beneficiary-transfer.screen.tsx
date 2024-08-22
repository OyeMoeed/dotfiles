import { IPayDropdown, IPayFootnoteText, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { BANKS, CURRENCIES, RELATIONSHIPS, SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import * as Yup from 'yup';
import useInternationalTransferHook from './edit-international-beneficiary-transfer.hook';
import { BeneficiaryFields, BeneficiaryTransferFormValues } from './edit-international-beneficiary-transfer.interface';
import beneficiaryTransferStyles from './edit-international-beneficiary-transfer.style';

const EditIBeneficiaryTransferScreen: React.FC = () => {
  const route = useRoute();
  const { colors } = useTheme();

  const styles = beneficiaryTransferStyles(colors);
  const localizationText = useLocalization();
  const { onSubmit, cities } = useInternationalTransferHook();
  const {} = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({});

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
          <IPayHeader backBtn title={localizationText.COMMON.EDIT_BENEFICIARY} applyFlex />
          <IPayView style={styles.container}>
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

                <>
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
                    disabled
                  />
                </>

                <IPayFootnoteText
                  color={colors.natural.natural500}
                  style={styles.textStyle}
                  text={localizationText.COMMON.BANK_DETAILS}
                />
                <IPayAnimatedTextInput
                  name={BeneficiaryFields.IBAN}
                  label={localizationText.COMMON.IBAN}
                  editable={false}
                />
                <IPayDropdown
                  dropdownType={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                  data={BANKS}
                  size={SNAP_POINTS.MID_LARGE}
                  name={BeneficiaryFields.BANK_NAME}
                  label={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                  disabled
                />

                <IPayDropdown
                  dropdownType={localizationText.NEW_BENEFICIARY.CHOOSE_CURRENCY}
                  data={CURRENCIES}
                  size={SNAP_POINTS.MID_LARGE}
                  name={BeneficiaryFields.WALLET_TYPE}
                  label={localizationText.COMMON.CURRENCY}
                />
              </>
            </IPayScrollView>
            <IPayButton
              onPress={handleSubmit(onSubmit)}
              large
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.COMMON.SAVE_EDITS}
              btnIconsDisabled
              btnStyle={styles.btnStyles}
            />
            <IPayButton
              onPress={() => goBack()}
              large
              btnType={buttonVariants.OUTLINED}
              btnText={localizationText.COMMON.CANCEL}
              btnIconsDisabled
              btnStyle={styles.cancelBtn}
            />
          </IPayView>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default EditIBeneficiaryTransferScreen;

import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayDropdown,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayScrollView,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayChip,
  IPayHeader,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { BANKS, COUNTRIES, RELATIONSHIPS, SNAP_POINTS, WU_TRANSFER_TYPES } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import * as Yup from 'yup';
import useInternationalTransferHook from './international-beneficiary-transfer-form.hook';
import {
  BeneficiaryFields,
  BeneficiaryTransferFormValues,
  TransferTypes,
} from './international-beneficiary-transfer-form.interface';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';

const IBeneficiaryTransferScreen: React.FC = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const { transferService } = route?.params as { transferService: { transferType: ''; serviceName: '' } };
  const styles = beneficiaryTransferStyles(colors);
  const localizationText = useLocalization();
  const { onSubmit, cities } = useInternationalTransferHook();
  const transferType = transferService?.transferType;
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
          <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
          <IPayView style={styles.container}>
            <IPayImage image={transferService?.serviceLogo} style={styles.logoStyles} />
            <IPayCaption1Text
              text={`${localizationText.COMMON.DELIVERY_TYPE}: ${transferService.transferType}`}
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
                {transferType === TransferTypes.CASH && (
                  <>
                    <IPayChip
                      icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} />}
                      variant={States.SEVERE}
                      headingStyles={styles.chipHeading}
                      textValue={localizationText.NEW_BENEFICIARY.NAME_SHOULD_BE_ENGLISH}
                    />
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.FIRST_NAME}
                      label={localizationText.NEW_BENEFICIARY.FIRST_NAME}
                    />
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.THIRD_NAME}
                      label={localizationText.NEW_BENEFICIARY.THIRD_NAME}
                    />
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.SECOND_NAME}
                      label={localizationText.NEW_BENEFICIARY.SECOND_NAME}
                    />
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.LAST_NAME}
                      label={localizationText.NEW_BENEFICIARY.LAST_NAME}
                    />
                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text={localizationText.NEW_BENEFICIARY.OTHER_INFORMATION}
                    />
                    <IPayDropdown
                      dropdownType={localizationText.NEW_BENEFICIARY.BENEFECIARY_NATIONALITY}
                      data={COUNTRIES}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.BENEFICIARY_NATIONALITY}
                      label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NATIONALITY}
                    />
                  </>
                )}
                {transferType !== TransferTypes.CASH && (
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
                    />
                  </>
                )}
                {transferType === TransferTypes.BANK && (
                  <>
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.ADDRESS}
                      label={localizationText.REPLACE_CARD.ADDRESS}
                    />

                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text={localizationText.COMMON.BANK_DETAILS}
                    />
                    <IPayAnimatedTextInput
                      name={BeneficiaryFields.IBAN}
                      label={localizationText.COMMON.IBAN}
                      editable
                    />
                    <IPayDropdown
                      dropdownType={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                      data={BANKS}
                      size={SNAP_POINTS.MID_LARGE}
                      name={BeneficiaryFields.BANK_NAME}
                      label={localizationText.INTERNATIONAL_TRANSFER.BANK_NAME}
                    />
                  </>
                )}

                {/* digital wallet */}
                {transferType === TransferTypes.DIGITAL_WALLET && (
                  <>
                    <IPayFootnoteText
                      color={colors.natural.natural500}
                      style={styles.textStyle}
                      text={localizationText.NEW_BENEFICIARY.DIGITAL_WALLET_DETAILS}
                    />
                    <IPayDropdown
                      dropdownType={localizationText.NEW_BENEFICIARY.WALLER_TYPE}
                      data={WU_TRANSFER_TYPES}
                      size={SNAP_POINTS.X_SMALL}
                      name={BeneficiaryFields.WALLET_TYPE}
                      label={localizationText.NEW_BENEFICIARY.WALLER_TYPE}
                    />
                  </>
                )}
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

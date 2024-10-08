import { IPayFootnoteText, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import remittanceTypeDescKeysMapping from '@app/components/templates/ipay-international-beneficiary-list/ipay-international-beneficiary-list.utils';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { BeneficiaryDetailsProps } from '../international-transfer/international-transfer.interface';
import useInternationalTransferHook from './edit-international-beneficiary-transfer.hook';
import { BeneficiaryFields, BeneficiaryTransferFormValues } from './edit-international-beneficiary-transfer.interface';
import beneficiaryTransferStyles from './edit-international-beneficiary-transfer.style';

const EditIBeneficiaryTransferScreen: React.FC = () => {
  const {
    params: { beneficiary },
  } = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: { beneficiary: BeneficiaryDetailsProps | undefined } }, 'params'>;
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = beneficiaryTransferStyles(colors);
  const { onSubmit } = useInternationalTransferHook();

  const validationSchema = Yup.object().shape({
    [BeneficiaryFields.BENEFICIARY_NICK_NAME]: Yup.string()
      .required(t('INTERNATIONAL_TRANSFER.NICKNAME_REQUIRED'))
      .max(50, 'VALIDATION.MAX_LENGTH'),
  });

  return (
    <IPayFormProvider<BeneficiaryTransferFormValues>
      validationSchema={validationSchema}
      defaultValues={{
        beneficiaryName: beneficiary?.fullName,
        iban: beneficiary?.beneficiaryAccountNumber,
        bankName: beneficiary?.beneficiaryBankDetail?.bankName || '',
        remittanceType: t(remittanceTypeDescKeysMapping(beneficiary?.remittanceTypeDesc || '')),
        city: beneficiary?.beneficiaryBankDetail?.city || '',
        beneficiaryNickName: beneficiary?.nickname,
        currency: beneficiary?.currencyDesc,
        country: beneficiary?.countryDesc,
        beneficiaryCode: beneficiary?.beneficiaryCode,
      }}
    >
      {({ handleSubmit }) => (
        <IPaySafeAreaView>
          <IPayHeader backBtn title="COMMON.EDIT_BENEFICIARY" applyFlex />
          <IPayView style={styles.container}>
            <IPayScrollView contentContainerStyle={styles.innerContainer}>
              <>
                <IPayFootnoteText
                  color={colors.natural.natural500}
                  style={styles.textStyle}
                  text="NEW_BENEFICIARY.BENEFECIARY_INFORMATION"
                />

                <IPayAnimatedTextInput
                  name={BeneficiaryFields.BENEFICIARY_NICK_NAME}
                  label="INTERNATIONAL_TRANSFER.BENEFICIARY_NICK_NAME"
                />

                <>
                  <IPayAnimatedTextInput
                    name={BeneficiaryFields.BENEFICIARY_NAME}
                    label="NEW_BENEFICIARY.BENEFECIARY_FULL_NAME"
                    editable={false}
                    containerStyle={styles.disabledInput}
                    labelColor={colors?.natural?.natural500}
                  />

                  <IPayAnimatedTextInput
                    name={BeneficiaryFields.REMITTANCE_TYPE}
                    label="INTERNATIONAL_TRANSFER.REMITTANCE_TYPE"
                    editable={false}
                    containerStyle={styles.disabledInput}
                    labelColor={colors?.natural?.natural500}
                  />

                  <IPayAnimatedTextInput
                    name={BeneficiaryFields.COUNTRY}
                    label="INTERNATIONAL_TRANSFER.COUNTRY"
                    editable={false}
                    containerStyle={styles.disabledInput}
                    labelColor={colors?.natural?.natural500}
                  />

                  {beneficiary?.beneficiaryBankDetail?.city && (
                    <IPayAnimatedTextInput name={BeneficiaryFields.CITY} label="COMMON.CITY" editable={false} />
                  )}
                </>

                <IPayFootnoteText
                  color={colors.natural.natural500}
                  style={styles.textStyle}
                  text="COMMON.BANK_DETAILS"
                />

                {beneficiary?.beneficiaryAccountNumber && (
                  <IPayAnimatedTextInput
                    name={BeneficiaryFields.IBAN}
                    label="COMMON.IBAN"
                    editable={false}
                    containerStyle={styles.disabledInput}
                    labelColor={colors?.natural?.natural500}
                  />
                )}

                <IPayAnimatedTextInput
                  name={BeneficiaryFields.BANK_NAME}
                  label="INTERNATIONAL_TRANSFER.BANK_NAME"
                  editable={false}
                  containerStyle={styles.disabledInput}
                  labelColor={colors?.natural?.natural500}
                />

                <IPayAnimatedTextInput
                  name={BeneficiaryFields.CURRENCY}
                  label="COMMON.CURRENCY"
                  editable={false}
                  containerStyle={styles.disabledInput}
                  labelColor={colors?.natural?.natural500}
                />
              </>
            </IPayScrollView>
            <IPayButton
              onPress={handleSubmit(onSubmit)}
              large
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.SAVE_EDITS"
              btnIconsDisabled
              btnStyle={styles.btnStyles}
            />
            <IPayButton
              onPress={() => goBack()}
              large
              btnType={buttonVariants.OUTLINED}
              btnText="COMMON.CANCEL"
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

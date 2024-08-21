import { IPayFootnoteText } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import * as Yup from 'yup';
import useInternationalTransferHook from './international-beneficiary-transfer-form.hook';
import { BeneficiaryTransferFormValues } from './international-beneficiary-transfer-form.interface';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';

const IBeneficiaryTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = beneficiaryTransferStyles(colors);
  const localizationText = useLocalization();
  const { onSubmit } = useInternationalTransferHook();

  const { mobileNumberSchema, iqamaIdSchema } = getValidationSchemas(localizationText);
  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    iqamaId: iqamaIdSchema,
  });
  return (
    <IPayFormProvider<BeneficiaryTransferFormValues>
      validationSchema={validationSchema}
      defaultValues={{ mobileNumber: '', iqamaId: '' }}
    >
      {({ handleSubmit, watch }) => (
        <IPaySafeAreaView style={styles.container}>
          <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
          <IPayFootnoteText
            color={colors.natural.natural500}
            style={styles.textStyle}
            text={localizationText.NEW_BENEFICIARY.BENEFECIARY_INFORMATION}
          />
          {/* <IPayDropdown testID="city-dropdown" /> */}
          <IPayAnimatedTextInput
            name="mobileNumber"
            label={localizationText.PROFILE.MOBILE_NUMBER}
            editable
            keyboardType="phone-pad"
            onMaxLengthReach={() => {
              iqamaIdRef.current?.focus();
            }}
          />

          <IPayButton
            onPress={handleSubmit(onSubmit)}
            large
            btnType={buttonVariants.PRIMARY}
            btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
            btnIconsDisabled
            btnStyle={styles.btnStyles}
          />
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default IBeneficiaryTransferScreen;

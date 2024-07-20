import images from '@app/assets/images';
import { IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { IPayCreateBeneficiaryProps } from './ipay-create-beneficiary.interface';
import createBeneficiaryStyles from './ipay-create-beneficiary.style';

/**
 * A component to display add new beneficiary form.
 * @param {string} props.testID - Test ID for testing purposes.
 */
const IPayCreateBeneficiary: React.FC<IPayCreateBeneficiaryProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = createBeneficiaryStyles(colors);
  const localizationText = useLocalization();

  const onSubmitData = () => {};

  const validationSchema = yup.object().shape({
    beneficiary_name: yup
      .string()
      .max(50, localizationText.ERROR.TOO_LONG)
      .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE),
    iban: yup
      .string()
      .max(34, localizationText.ERROR.TOO_LONG)
      .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE),
    beneficiary_nick_name: yup.string().max(50, localizationText.ERROR.TOO_LONG),
  });

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView testID="new-beneficiary">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            beneficiary_name: '',
            iban: '',
            bank_name: localizationText.COMMON.ALINMA_BANK,
            beneficiary_nick_name: '',
          }}
          onSubmit={onSubmitData}
        >
          {({ handleChange, handleSubmit, values, errors, resetForm }) => (
            <>
              <IPayView style={styles.innerContainer}>
                <IPayAnimatedTextInput
                  label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NAME}
                  value={values.beneficiary_name}
                  onChangeText={handleChange('beneficiary_name')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  isError={!!errors?.beneficiary_name}
                  testID="beneficiary_name"
                  assistiveText={errors?.beneficiary_name && errors?.beneficiary_name}
                />
                <IPayAnimatedTextInput
                  label={localizationText.COMMON.IBAN}
                  value={values.iban}
                  onChangeText={handleChange('iban')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  testID="iban"
                  isError={!!errors?.iban}
                  assistiveText={errors?.iban && errors?.iban}
                />
                <IPayList
                  containerStyle={styles.listContainerStyle}
                  title={localizationText.COMMON.BANK_NAME}
                  rightText={
                    <IPayView style={styles.rightTextStyle}>
                      <IPaySubHeadlineText color={colors.primary.primary800} regular>
                        {localizationText.COMMON.ALINMA_BANK}
                      </IPaySubHeadlineText>
                      <IPayImage image={images.alinmaBankLogo} style={styles.imgStyle} />
                    </IPayView>
                  }
                />
                <IPayAnimatedTextInput
                  label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NICK_NAME}
                  value={values.beneficiary_nick_name}
                  onChangeText={handleChange('beneficiary_nick_name')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  isError={!!errors?.beneficiary_nick_name}
                  assistiveText={errors?.beneficiary_nick_name && errors?.beneficiary_nick_name}
                />
              </IPayView>
              <IPayButton
                onPress={() => {
                  handleSubmit();
                  resetForm();
                }}
                disabled={!values.beneficiary_name || !values.iban}
                btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
                btnType="primary"
                large
                btnIconsDisabled
                btnStyle={styles.btnStyle}
                testID="beneficiary-btn"
              />
            </>
          )}
        </Formik>
      </IPayView>
    </IPayView>
  );
};

export default IPayCreateBeneficiary;

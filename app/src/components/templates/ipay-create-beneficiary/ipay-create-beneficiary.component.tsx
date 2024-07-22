import images from '@app/assets/images';
import { IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      beneficiary_name: '',
      iban: '',
      bank_name: localizationText.COMMON.ALINMA_BANK,
      beneficiary_nick_name: '',
    },
  });

  const onSubmitData = () => {
    if (isValid) {
      reset();
    }
  };

  const commonRule = {
    required: {
      value: true,
      message: localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE,
    },
  };

  const ruleConfig = {
    beneficiaryName: {
      ...commonRule,
      maxLength: {
        value: 50,
        message: localizationText.ERROR.TOO_LONG,
      },
    },
    iban: {
      ...commonRule,
      maxLength: {
        value: 34,
        message: localizationText.ERROR.TOO_LONG,
      },
    },
    beneficiary_nick_name: {
      maxLength: {
        value: 50,
        message: localizationText.ERROR.TOO_LONG,
      },
    },
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView testID="new-beneficiary">
        <IPayView style={styles.innerContainer}>
          <Controller
            name="beneficiary_name"
            control={control}
            rules={ruleConfig.beneficiaryName}
            render={({ field: { onChange, value } }) => (
              <IPayAnimatedTextInput
                label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NAME}
                value={value}
                onChangeText={onChange}
                containerStyle={styles.inputContainerStyle}
                isError={!!errors.beneficiary_name}
                testID="beneficiary_name"
                assistiveText={errors?.beneficiary_name && errors?.beneficiary_name?.message}
              />
            )}
          />
          <Controller
            name="iban"
            control={control}
            rules={ruleConfig.iban}
            render={({ field: { onChange, value } }) => (
              <IPayAnimatedTextInput
                label={localizationText.COMMON.IBAN}
                value={value}
                onChangeText={onChange}
                containerStyle={styles.inputContainerStyle}
                isError={!!errors.iban}
                testID="iban"
                assistiveText={errors?.iban && errors?.iban?.message}
              />
            )}
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
          <Controller
            name="beneficiary_nick_name"
            control={control}
            rules={ruleConfig.beneficiary_nick_name}
            render={({ field: { onChange, value } }) => (
              <IPayAnimatedTextInput
                label={localizationText.NEW_BENEFICIARY.BENEFICIARY_NICK_NAME_OPTIONAL}
                value={value}
                onChangeText={onChange}
                containerStyle={styles.inputContainerStyle}
                isError={!!errors?.beneficiary_nick_name}
                assistiveText={errors?.beneficiary_nick_name && errors?.beneficiary_nick_name?.message}
              />
            )}
          />
        </IPayView>
        <IPayButton
          onPress={handleSubmit(onSubmitData)}
          disabled={!getValues('beneficiary_name') || !getValues('iban')}
          btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
          btnType="primary"
          large
          btnIconsDisabled
          btnStyle={styles.btnStyle}
          testID="beneficiary-btn"
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayCreateBeneficiary;

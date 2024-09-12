import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayCheckboxTitle, IPayRHFAnimatedTextInput } from '@app/components/molecules';
import { MoiPaymentFormFields } from '@app/enums/moi-payment.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moiPaymentDetialStyles from './ipay-moi-payment-detail-form.style';
import { IPayMoiPaymentDetailFormProps } from './ipy-moi-payment-detail-form.imterface';

/**
 * Props for the SadadBillDetailForm component.
 *
 * @param {boolean} [props.isCompanyValue] - A boolean indicating if the company value is valid or present.
 * @param {boolean} [props.isServiceValue] - A boolean indicating if the service value is valid or present.
 * @param {function} [props.onCompanyAction] - A function to handle actions related to the company.
 * @param {function} [props.onServiceAction] - A function to handle actions related to the service.
 * @param {string} [props.companyInputName] - String to use in input name of company
 * @param {string} [props.serviceInputName] - String to use in input name of service type
 * @param {string} [props.accountInputName] - String to use in input name of account no
 @param {React.ReactElement<any> | undefined} [props.companyLeftImage] - An React element to be displayed on the left side of the animated text input. 
 *   This could be an image or an icon. If not provided, no image will be displayed.
 *
 * @returns {JSX.Element} - The rendered SadadBillDetailForm component.
 */

const IPayMoiPaymentDetailForm: React.FC<IPayMoiPaymentDetailFormProps> = ({
  testID,
  isServiceProviderValue,
  isServiceTypeValue,
  onServiceProviderAction,
  onServiceTypeAction,
  onCheckboxAction,
  onBeneficiaryIdAction,
  onIdTypeAction,
  onDurationAction,
  myIdCheck,
  control,
  onChangeText,
  errorMessage,
}: IPayMoiPaymentDetailFormProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = moiPaymentDetialStyles(colors);

  const getInputStyles = useCallback(() => {
    const baseStyle = styles.inputContainerStyle;
    const additionalStyle = (errorMessage && styles.errorStyle) || (myIdCheck && styles.greyInputStyle);

    return additionalStyle ? [baseStyle, additionalStyle] : [baseStyle];
  }, [errorMessage, myIdCheck]);

  return (
    <IPayView style={styles.inputWrapper} testID={testID}>
      <Controller
        name={MoiPaymentFormFields.SERVICE_PROVIDER}
        control={control}
        render={() => (
          <IPayRHFAnimatedTextInput
            testID="service-provider-input"
            name={MoiPaymentFormFields.SERVICE_PROVIDER}
            label="BILL_PAYMENTS.SERVICE_PROVIDER"
            editable={false}
            containerStyle={styles.inputContainerStyle}
            showRightIcon
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
            onClearInput={onServiceProviderAction}
          />
        )}
      />
      <Controller
        name={MoiPaymentFormFields.SERVICE_TYPE}
        control={control}
        render={() => (
          <IPayRHFAnimatedTextInput
            testID="service-type-input"
            name={MoiPaymentFormFields.SERVICE_TYPE}
            label="BILL_PAYMENTS.SERVICE_TYPE"
            editable={false}
            showRightIcon
            containerStyle={[styles.inputContainerStyle, !isServiceProviderValue && styles.greyInputStyle]}
            customIcon={
              <IPayIcon
                icon={icons.arrow_circle_down}
                size={18}
                color={isServiceProviderValue ? colors.primary.primary500 : colors.natural.natural500}
              />
            }
            actionDisabled={!isServiceProviderValue}
            onClearInput={onServiceTypeAction}
          />
        )}
      />

      {isServiceTypeValue && (
        <>
          <IPayCaption2Text regular text="BILL_PAYMENTS.BENEFECIARY_DETAILS" />

          <Controller
            name={MoiPaymentFormFields.MY_ID_CHECK}
            control={control}
            render={() => (
              <IPayCheckboxTitle
                isCheck={myIdCheck || false}
                testID="my-id"
                heading="BILL_PAYMENTS.USE_MY_ID"
                onPress={onCheckboxAction}
              />
            )}
          />

          <Controller
            name={MoiPaymentFormFields.MY_ID}
            control={control}
            render={() => (
              <IPayRHFAnimatedTextInput
                testID="beneficiary-id-input"
                name={MoiPaymentFormFields.MY_ID}
                label={myIdCheck ? t('BILL_PAYMENTS.MY_ID') : t('BILL_PAYMENTS.BENEFICIARY_ID')}
                labelColor={myIdCheck ? colors.natural.natural500 : colors.primary.primary500}
                showRightIcon={!myIdCheck}
                editable={!myIdCheck}
                containerStyle={getInputStyles()}
                customIcon={<IPayIcon icon={icons.cross_square} size={18} color={colors.natural.natural500} />}
                onClearInput={onBeneficiaryIdAction}
                onChange={(event) => onChangeText && onChangeText(event.nativeEvent.text)}
                assistiveText={errorMessage}
                isError
              />
            )}
          />

          <Controller
            name={MoiPaymentFormFields.ID_TYPE}
            control={control}
            render={() => (
              <IPayRHFAnimatedTextInput
                testID="id-type-input"
                name={MoiPaymentFormFields.ID_TYPE}
                label="BILL_PAYMENTS.ID_TYPE"
                editable={false}
                showRightIcon
                containerStyle={[styles.inputContainerStyle, !isServiceTypeValue && styles.greyInputStyle]}
                customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
                onClearInput={onIdTypeAction}
              />
            )}
          />

          <Controller
            name={MoiPaymentFormFields.DURATION}
            control={control}
            render={() => (
              <IPayRHFAnimatedTextInput
                testID="duration-input"
                name={MoiPaymentFormFields.DURATION}
                label="BILL_PAYMENTS.DURATION"
                editable={false}
                showRightIcon
                containerStyle={[styles.inputContainerStyle, !isServiceTypeValue && styles.greyInputStyle]}
                customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
                onClearInput={onDurationAction}
              />
            )}
          />
        </>
      )}
    </IPayView>
  );
};

export default IPayMoiPaymentDetailForm;

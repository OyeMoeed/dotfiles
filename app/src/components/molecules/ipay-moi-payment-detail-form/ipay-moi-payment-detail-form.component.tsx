import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput, IPayCheckboxTitle } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
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
  serviceProvider,
  serviceType,
  myIdCheck,
  beneficiaryId,
  idType,
  duration,
}: IPayMoiPaymentDetailFormProps) => {
  const { colors } = useTheme();
  const styles = moiPaymentDetialStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView style={styles.inputWrapper} testID={testID}>
      <IPayAnimatedTextInput
        testID="service-provider-input"
        name={serviceProvider ?? ''}
        label={localizationText.BILL_PAYMENTS.SERVICE_PROVIDER}
        editable={false}
        containerStyle={styles.inputContainerStyle}
        showRightIcon
        customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
        onClearInput={onServiceProviderAction}
      />
      {isServiceProviderValue && (
        <IPayAnimatedTextInput
          testID="service-type-input"
          name={serviceType ?? ''}
          label={localizationText.BILL_PAYMENTS.SERVICE_TYPE}
          editable={false}
          showRightIcon
          containerStyle={[styles.inputContainerStyle, isServiceProviderValue && styles.greyInputStyle]}
          customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />}
          onClearInput={onServiceTypeAction}
        />
      )}

      {isServiceTypeValue && (
        <IPayView>
          <IPayCheckboxTitle
            isCheck={myIdCheck}
            testID="my-id"
            text={localizationText.BILL_PAYMENTS.MY_ID}
            onPress={onCheckboxAction}
          />

          <IPayAnimatedTextInput
            testID="beneficiary-id-input"
            name={beneficiaryId ?? ''}
            label={localizationText.BILL_PAYMENTS.BENEFICIARY_ID}
            editable={false}
            showRightIcon
            containerStyle={[styles.inputContainerStyle, isServiceTypeValue && styles.greyInputStyle]}
            customIcon={<IPayIcon icon={icons.cross_square} size={18} color={colors.natural.natural500} />}
            onClearInput={onBeneficiaryIdAction}
          />

          <IPayAnimatedTextInput
            testID="id-type-input"
            name={idType ?? ''}
            label={localizationText.BILL_PAYMENTS.ID_TYPE}
            editable={false}
            showRightIcon
            containerStyle={[styles.inputContainerStyle, isServiceTypeValue && styles.greyInputStyle]}
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />}
            onClearInput={onIdTypeAction}
          />

          <IPayAnimatedTextInput
            testID="duration-input"
            name={duration ?? ''}
            label={localizationText.BILL_PAYMENTS.DURATION}
            editable={false}
            showRightIcon
            containerStyle={[styles.inputContainerStyle, isServiceTypeValue && styles.greyInputStyle]}
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />}
            onClearInput={onDurationAction}
          />
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayMoiPaymentDetailForm;

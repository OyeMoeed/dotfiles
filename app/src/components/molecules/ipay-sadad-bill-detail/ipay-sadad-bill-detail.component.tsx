import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayAnimatedTextInput from '../ipay-animated-input-text/ipay-animated-input-text.component';
import { SadadBillDetailFormProps } from './ipay-sadad-bill-detail.interface';
import sadadBillDetailStyles from './ipay-sadad-bill-detail.style';

/**
 * Props for the SadadBillDetailForm component.
 *
 * @param {string} [props.companyValue] - The value representing the company.
 * @param {string} [props.serviceValue] - The value representing the service.
 * @param {boolean} [props.isCompanyValue] - A boolean indicating if the company value is valid or present.
 * @param {boolean} [props.isServiceValue] - A boolean indicating if the service value is valid or present.
 * @param {string} [props.accountNumberValue] - The value representing the account number.
 * @param {props} [props.onAccountNumber] - A function that is called when the account number is updated.
 * @param {boolean} [props.isValidAccountNo] - A boolean indicating if the account number is valid.
 * @param {function} [props.onCompanyAction] - A function to handle actions related to the company.
 * @param {function} [props.onServiceAction] - A function to handle actions related to the service.
 @param {React.ReactElement<any> | undefined} [props.companyLeftImage] - An React element to be displayed on the left side of the animated text input. 
 *   This could be an image or an icon. If not provided, no image will be displayed.
 *
 * @returns {JSX.Element} - The rendered SadadBillDetailForm component.
 */

const IPaySadadBillDetailForm: React.FC<SadadBillDetailFormProps> = ({
  testID,
  companyValue,
  serviceValue,
  isCompanyValue,
  isServiceValue,
  accountNumberValue,
  onAccountNumber,
  isValidAccountNo,
  onCompanyAction,
  onServiceAction,
  companyLeftImage,
}: SadadBillDetailFormProps) => {
  const { colors } = useTheme();
  const styles = sadadBillDetailStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView style={styles.inputWrapper} testID={testID}>
      <IPayAnimatedTextInput
        testID="account-input"
        label={localizationText.NEW_SADAD_BILLS.COMPANY_NAME}
        editable={false}
        value={companyValue}
        containerStyle={styles.inputContainerStyle}
        showRightIcon
        rightIcon={companyLeftImage}
        customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
        onClearInput={onCompanyAction}
      />
      <IPayAnimatedTextInput
        testID="service-input"
        label={localizationText.NEW_SADAD_BILLS.SERVICE_TYPE}
        editable={false}
        value={serviceValue}
        showRightIcon
        containerStyle={[styles.inputContainerStyle, isCompanyValue && styles.greyInputStyle]}
        customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />}
        onClearInput={onServiceAction}
      />
      {isServiceValue && (
        <IPayAnimatedTextInput
          label={localizationText.NEW_SADAD_BILLS.ACCOUNT_NUMBER}
          editable
          value={accountNumberValue}
          containerStyle={[styles.inputContainerStyle]}
          onChangeText={onAccountNumber}
          isError={isValidAccountNo}
          assistiveText={isValidAccountNo ? localizationText.NEW_SADAD_BILLS.INVALID_ACCOUNT_NUMBER : ''}
        />
      )}
    </IPayView>
  );
};

export default IPaySadadBillDetailForm;

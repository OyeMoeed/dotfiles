import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { SadadBillDetailFormProps } from './ipay-sadad-bill-detail.interface';
import sadadBillDetailStyles from './ipay-sadad-bill-detail.style';

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

const IPaySadadBillDetailForm: React.FC<SadadBillDetailFormProps> = ({
  testID,
  isCompanyValue,
  isServiceValue,
  onCompanyAction,
  onServiceAction,
  companyLeftImage,
  companyInputName,
  serviceInputName,
  accountInputName,
  accountInputLabel,
}: SadadBillDetailFormProps) => {
  const { colors } = useTheme();
  const styles = sadadBillDetailStyles(colors);

  const AccountTextInputLabel = accountInputLabel || 'NEW_SADAD_BILLS.ACCOUNT_NUMBER';

  return (
    <IPayView style={styles.inputWrapper} testID={testID}>
      <IPayAnimatedTextInput
        testID="account-input"
        name={companyInputName}
        label="NEW_SADAD_BILLS.COMPANY_NAME"
        editable={false}
        containerStyle={styles.inputContainerStyle}
        showRightIcon
        rightIcon={companyLeftImage}
        customIcon={<IPayIcon icon={icons.arrow_circle_down} size={24} color={colors.primary.primary500} />}
        onClearInput={onCompanyAction}
        selection={{ start: 0 }}
      />
      <IPayAnimatedTextInput
        testID="service-input"
        name={serviceInputName}
        label="NEW_SADAD_BILLS.SERVICE_TYPE"
        editable={false}
        showRightIcon
        containerStyle={[styles.inputContainerStyle, !isCompanyValue && styles.greyInputStyle]}
        customIcon={
          <IPayIcon
            icon={icons.arrow_circle_down}
            size={24}
            color={isCompanyValue ? colors.primary.primary500 : colors.natural.natural500}
          />
        }
        onClearInput={onServiceAction}
        selection={{ start: 0 }}
      />
      {isServiceValue && (
        <IPayAnimatedTextInput
          label={AccountTextInputLabel}
          editable
          name={accountInputName}
          containerStyle={[styles.inputContainerStyle]}
        />
      )}
    </IPayView>
  );
};

export default IPaySadadBillDetailForm;

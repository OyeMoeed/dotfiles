import { IPayFootnoteText, IPayView } from '@app/components/atoms';

import { TrafficPaymentFormFields } from '@app/enums/traffic-payment.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback } from 'react';
import IPaySegmentedControls from '../ipay-segmented-controls/ipay-segmented-controls.component';

import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import IPayCheckboxTitle from '../ipay-checkbox-title/ipay-chekbox-title.component';
import DynamicFormComponent from '../ipay-dynamic-form/ipay-dynamic-form.component';
import { IPayTrafficDetailFormProps } from './ipay-traffic-detail-form.interface';
import trafficDetailStyles from './ipay-traffic-detail-form.style';

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

const IPayTrafficDetailForm: React.FC<IPayTrafficDetailFormProps> = ({
  testID,
  onCheckboxAction,
  myIdCheck,
  control,
  formSelectedTab,
  handleFormTabSelect,
  buttonComponent,
  onPress,
  billerId,
  serviceId,
  walletNumber,
  errorMessage,
  fields,
  errors,
}: IPayTrafficDetailFormProps) => {
  const { colors } = useTheme();
  const styles = trafficDetailStyles(colors);
  const { t } = useTranslation();
  const getInputStyles = useCallback(() => {
    const baseStyle = styles.inputContainerStyle;
    const additionalStyle = (errorMessage && styles.errorStyle) || (myIdCheck && styles.greyInputStyle);

    return additionalStyle ? [baseStyle, additionalStyle] : [baseStyle];
  }, [errorMessage, myIdCheck]);
  const tabs = [t('TRAFFIC_VIOLATION.BY_VIOLATION_NUMBER'), t('TRAFFIC_VIOLATION.BY_VIOLATION_ID')];

  return (
    <IPayView style={styles.inputWrapper} testID={`${testID}-traffic-form-page`}>
      <IPayFootnoteText regular text="TRAFFIC_VIOLATION.SERVICE_TYPE" color={colors.primary.primary600} />
      <IPaySegmentedControls
        customStyles={styles.segmentStyles}
        selectedTab={formSelectedTab}
        tabs={tabs}
        onSelect={handleFormTabSelect}
      />
      <Controller
        name={TrafficPaymentFormFields.MY_ID_CHECK}
        control={control}
        render={() => (
          <IPayCheckboxTitle
            isCheck={myIdCheck || false}
            heading="BILL_PAYMENTS.USE_MY_ID"
            onPress={onCheckboxAction}
            checkBoxStyle={styles.checkBoxStyle}
          />
        )}
      />
      <DynamicFormComponent errors={errors} control={control} fields={fields} handleChange={handleChange} />
      {/* <Controller
        name={TrafficPaymentFormFields.MY_ID}
        control={control}
        render={() => (
          <IPayRHFAnimatedTextInput
            name={TrafficPaymentFormFields.MY_ID}
            label={myIdCheck ? 'BILL_PAYMENTS.MY_ID' : 'TRAFFIC_VIOLATION.VIOLATOR_ID'}
            labelColor={myIdCheck ? colors.natural.natural500 : colors.primary.primary500}
            showRightIcon={!myIdCheck}
            editable={!myIdCheck}
            containerStyle={getInputStyles()}
            inputStyle={styles.inputStyle}
            customIcon={<IPayIcon icon={icons.cross_square} size={18} color={colors.natural.natural500} />}
            // onClearInput={onBeneficiaryIdAction}
            // onChange={(event) => onChangeText && onChangeText(event.nativeEvent.text)}
            assistiveText={errorMessage}
            isError
            maxLength={10}
          />
        )}
      />

      <Controller
        name={TrafficPaymentFormFields.ID_TYPE}
        control={control}
        render={() => (
          <IPayRHFAnimatedTextInput
            testID="id-type-input"
            name={TrafficPaymentFormFields.ID_TYPE}
            label="BILL_PAYMENTS.ID_TYPE"
            editable={false}
            showRightIcon
            containerStyle={[styles.inputContainerStyle]}
            inputStyle={styles.inputStyle}
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={24} color={colors.primary.primary500} />}
            // onClearInput={onIdTypeAction}
          />
        )}
      />

      {formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_NUM && (
        <Controller
          name={TrafficPaymentFormFields.VOILATION_NUMBER}
          control={control}
          render={() => (
            <IPayRHFAnimatedTextInput
              name={TrafficPaymentFormFields.VOILATION_NUMBER}
              label="TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL"
              labelColor={colors.primary.primary500}
              containerStyle={[styles.inputContainerStyle]}
              inputStyle={styles.inputStyle}
              customIcon={<IPayIcon icon={icons.cross_square} size={18} color={colors.natural.natural500} />}
              // onClearInput={clearVoilationNumber}
              // onChange={(event) => onChangeText && onChangeText(event.nativeEvent.text)}
              assistiveText={errorMessage}
              showRightIcon
              isError
              maxLength={10}
            />
          )}
        />
      )} */}
    </IPayView>
  );
};

export default IPayTrafficDetailForm;

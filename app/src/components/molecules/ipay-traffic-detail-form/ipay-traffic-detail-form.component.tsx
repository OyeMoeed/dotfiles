import { IPayFootnoteText, IPayView } from '@app/components/atoms';

import { TrafficPaymentFormFields } from '@app/enums/traffic-payment.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';

import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import IPayCheckboxTitle from '../ipay-checkbox-title/ipay-chekbox-title.component';
import DynamicFormComponent from '../ipay-dynamic-form/ipay-dynamic-form.component';
import IPaySegmentedControls from '../ipay-segmented-controls/ipay-segmented-controls.component';
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
  fields,
  errors,
  myIdValue,
}: IPayTrafficDetailFormProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = trafficDetailStyles(colors);

  const tabs = [t('TRAFFIC_VIOLATION.BY_VIOLATION_NUMBER'), t('TRAFFIC_VIOLATION.BY_VIOLATION_ID')];

  return (
    <IPayView style={styles.inputWrapper} testID={`${testID}-traffic-form-page`}>
      <IPayView style={styles.tabWrapper}>
        <IPayFootnoteText regular text="TRAFFIC_VIOLATION.SERVICE_TYPE" color={colors.primary.primary600} />
        <IPaySegmentedControls
          customStyles={styles.segmentStyles}
          selectedTab={formSelectedTab}
          tabs={tabs}
          onSelect={handleFormTabSelect}
        />
      </IPayView>

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
      <DynamicFormComponent
        errors={errors}
        control={control}
        fields={fields}
        myIdValue={myIdValue}
        myIdCheck={myIdCheck}
      />
    </IPayView>
  );
};

export default IPayTrafficDetailForm;

import { IPayCaption2Text, IPayCheckbox, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayChip } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillStatus, States } from '@app/utilities/enums.util';
import React from 'react';
import { IPaySadadBillProps } from './ipay-traffic-violation-card.interface';
import trafficViolationCardStyles from './ipay-traffic-violation-card.style';

const IPayTrafficViolationCard: React.FC<IPaySadadBillProps> = ({
  testID,
  style,
  billDetails,
  onSelectBill,
  showCheckBox,
}) => {
  const { id, billTitle, violation_no, vendorIcon, billAmount, dueDate, billStatus, selected } = billDetails;
  const { colors } = useTheme();
  const styles = trafficViolationCardStyles(colors);
  const localizationText = useLocalization();

  const billingAmount = `${billAmount} ${localizationText.COMMON.SAR}`;

  const onPressCheckBox = () => {
    if (onSelectBill) onSelectBill(id);
  };

  return (
    <IPayView testID={`${testID}-traffic-violation`} style={[styles.container, style]}>
      {showCheckBox && <IPayCheckbox isCheck={selected} onPress={onPressCheckBox} />}
      <IPayView style={styles.contentView}>
        <IPayView>
          <IPayImage image={vendorIcon} style={styles.vendorIcon} />
          <IPaySubHeadlineText text={billTitle} color={colors.natural.natural900} />
          <IPayCaption2Text
            text={`${localizationText.TRAFFIC_VIOLATION.VIOLATION_NUMBER} ${violation_no}`}
            color={colors.natural.natural900}
            style={styles.vendorText}
          />
        </IPayView>
        <IPayView style={styles.contentChildView}>
          <IPayChip
            containerStyle={styles.chipView}
            isShowIcon={false}
            textValue={BillStatus.UNPAID}
            variant={States.NATURAL}
          />
          <IPaySubHeadlineText text={billingAmount} color={colors.natural.natural900} />
        </IPayView>
      </IPayView>
    </IPayView>
  );
};

export default IPayTrafficViolationCard;

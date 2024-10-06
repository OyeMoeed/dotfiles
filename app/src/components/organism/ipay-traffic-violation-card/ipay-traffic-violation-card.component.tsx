import images from '@app/assets/images';
import { IPayCaption2Text, IPayCheckbox, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayChip } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillStatus, States } from '@app/utilities/enums.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPaySadadBillProps } from './ipay-traffic-violation-card.interface';
import trafficViolationCardStyles from './ipay-traffic-violation-card.style';

const IPayTrafficViolationCard: React.FC<IPaySadadBillProps> = ({
  testID,
  style,
  billDetails,
  onSelectBill,
  showCheckBox,
}) => {
  const { violationNo, violatorId, amount, selected } = billDetails;
  const violationNumber = violationNo || billDetails.violation_no;
  const { colors } = useTheme();
  const styles = trafficViolationCardStyles(colors);
  const { t } = useTranslation();

  const billingAmount = `${amount} ${t('COMMON.SAR')}`;

  const onPressCheckBox = () => {
    if (onSelectBill) onSelectBill(violationNumber);
  };

  const titleText = violationNumber ? t('TRAFFIC_VIOLATION.VIOLATION_NUMBER') : t('TRAFFIC_VIOLATION.VIOLATOR_ID');

  return (
    <IPayView testID={`${testID}-traffic-violation`} style={[styles.container, style]}>
      {showCheckBox && <IPayCheckbox isCheck={selected} onPress={onPressCheckBox} />}
      <IPayView style={styles.contentView}>
        <IPayView>
          <IPayImage image={images.traffic} style={styles.vendorIcon} />
          <IPaySubHeadlineText text="TRAFFIC_VIOLATION.TRAFFIC_VIOLATION" color={colors.natural.natural900} />
          <IPayCaption2Text
            text={`${titleText}. ${violationNumber || violatorId}`}
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

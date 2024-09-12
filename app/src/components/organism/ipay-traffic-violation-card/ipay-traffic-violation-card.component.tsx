import images from '@app/assets/images';
import { IPayCaption2Text, IPayCheckbox, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayChip } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillStatus, States } from '@app/utilities/enums.util';
import React from 'react';
import { IPaySadadBillProps } from './ipay-traffic-violation-card.interface';
import trafficViolationCardStyles from './ipay-traffic-violation-card.style';
import { useTranslation } from 'react-i18next';

const IPayTrafficViolationCard: React.FC<IPaySadadBillProps> = ({
  testID,
  style,
  billDetails,
  onSelectBill,
  showCheckBox,
}) => {
  const { violation_no: violationNo, amount, currency, description, selected } = billDetails;
  const { colors } = useTheme();
  const styles = trafficViolationCardStyles(colors);
  const { t } = useTranslation();

  const billingAmount = `${amount} ${currency}`;

  const onPressCheckBox = () => {
    if (onSelectBill) onSelectBill(violationNo);
  };

  return (
    <IPayView testID={`${testID}-traffic-violation`} style={[styles.container, style]}>
      {showCheckBox && <IPayCheckbox isCheck={selected} onPress={onPressCheckBox} />}
      <IPayView style={styles.contentView}>
        <IPayView>
          <IPayImage image={images.traffic} style={styles.vendorIcon} />
          <IPaySubHeadlineText text={description} color={colors.natural.natural900} />
          <IPayCaption2Text
            text={`${t('TRAFFIC_VIOLATION.VIOLATION_NUMBER')} ${violationNo}`}
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

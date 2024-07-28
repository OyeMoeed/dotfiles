import { IPayCaption2Text, IPayCheckbox, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayChip } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import dateTimeFormat from '@app/utilities/date.const';
import { BillStatus, States } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useMemo } from 'react';
import { IPaySadadBillProps } from './ipay-traffic-violation-card.interface';
import trafficViolationCardStyles from './ipay-traffic-violation-card.style';

const IPayTrafficViolationCard: React.FC<IPaySadadBillProps> = ({
  testID,
  style,
  billDetails,
  onSelectBill,
  showCheckBox,
}) => {
  const { id, billTitle, vendor, vendorIcon, billAmount, dueDate, billStatus, selected } = billDetails;
  const { colors } = useTheme();
  const styles = trafficViolationCardStyles(colors);
  const localizationText = useLocalization();

  const statusVariant = useMemo(
    () => (billStatus === BillStatus.UNPAID ? States.NATURAL : States.SUCCESS),
    [billStatus],
  );

  const billingAmountColor = useMemo(
    () => (Number(billAmount) > 0 ? colors.natural.natural900 : colors.natural.natural300),
    [billAmount],
  );

  const dueDateColor = useMemo(() => {
    const currentDate = moment();
    const parsedDueDate = moment(dueDate, dateTimeFormat.DateAndTime);
    return currentDate.isAfter(parsedDueDate) ? colors.error.error500 : colors.natural.natural500;
  }, [dueDate]);

  const billingAmount = `${billAmount} ${localizationText.COMMON.SAR}`;
  const billingDueDate = `${localizationText.SADAD.DUE} ${dueDate}`;

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
          <IPayCaption2Text text={vendor} color={colors.natural.natural900} style={styles.vendorText} />
        </IPayView>
        <IPayView style={styles.contentChildView}>
          <IPayChip
            containerStyle={styles.chipView}
            isShowIcon={false}
            textValue={billStatus}
            variant={statusVariant}
          />
          <IPaySubHeadlineText text={billingAmount} color={billingAmountColor} />
          {billStatus === BillStatus.UNPAID && (
            <IPayCaption2Text text={billingDueDate} style={styles.dueDateText} color={dueDateColor} />
          )}
        </IPayView>
      </IPayView>
    </IPayView>
  );
};

export default IPayTrafficViolationCard;

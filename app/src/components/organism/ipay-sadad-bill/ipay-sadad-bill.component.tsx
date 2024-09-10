import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayCheckbox,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayChip } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import BILLS_MANAGEMENT_URLS from '@app/network/services/bills-management/bills-management.urls';
import useTheme from '@app/styles/hooks/theme.hook';
import { getDateFormate } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { BillStatus, States } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useMemo } from 'react';
import { IPaySadadBillProps } from './ipay-sadad-bill.interface';
import sadadBillStyles from './ipay-sadad-bill.style';

const IPaySadadBill: React.FC<IPaySadadBillProps> = ({
  testID,
  style,
  billDetails,
  onSelectBill,
  showCheckBox,
  onPressMoreOptions,
  showMoreOption = true,
}) => {
  const { billId, billerId, billerName, amount, billDesc, dueDateTime, billStatusDesc, selected = false } = billDetails;

  const { colors } = useTheme();
  const styles = sadadBillStyles(colors);
  const localizationText = useLocalization();

  const statusVariant = useMemo(
    () => (billStatusDesc === BillStatus.UNPAID ? States.NATURAL : States.SUCCESS),
    [billStatusDesc],
  );

  const billingAmountColor = useMemo(
    () => (Number(amount) > 0 ? colors.natural.natural900 : colors.natural.natural300),
    [amount],
  );

  const dueDateColor = useMemo(() => {
    const currentDate = moment();
    const parsedDueDate = moment(dueDateTime, dateTimeFormat.DateAndTime);
    return currentDate.isAfter(parsedDueDate) ? colors.error.error500 : colors.natural.natural500;
  }, [dueDateTime]);

  const billingAmount = `${amount || 0} ${localizationText.COMMON.SAR}`;
  const billingDueDate = `${localizationText.SADAD.DUE} ${getDateFormate(dueDateTime, dateTimeFormat.ShortDate)}`;

  const onPressCheckBox = () => {
    if (onSelectBill) onSelectBill(billId);
  };

  const onPressMore = () => {
    if (onPressMoreOptions) onPressMoreOptions(billId);
  };

  return (
    <IPayView testID={`${testID}-sadad-bill`} style={[styles.container, style]}>
      {showCheckBox && <IPayCheckbox isCheck={selected} onPress={onPressCheckBox} />}
      <IPayView style={styles.contentView}>
        <IPayView>
          <IPayImage image={BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(billerId)} style={styles.vendorIcon} />
          <IPaySubHeadlineText text={billDesc} color={colors.natural.natural900} />
          <IPayCaption2Text text={billerName} color={colors.natural.natural900} style={styles.vendorText} />
        </IPayView>
        <IPayView style={styles.contentChildView}>
          <IPayChip
            containerStyle={styles.chipView}
            isShowIcon={false}
            textValue={billStatusDesc}
            variant={statusVariant}
          />
          <IPaySubHeadlineText text={billingAmount} color={billingAmountColor} />
          {billStatusDesc === BillStatus.UNPAID && (
            <IPayCaption2Text text={billingDueDate} style={styles.dueDateText} color={dueDateColor} />
          )}
        </IPayView>
      </IPayView>

      <IPayPressable
        onPress={onPressMore}
        disabled={!showMoreOption}
        style={showMoreOption ? styles.moreOptionView : styles.moreOptionConditional}
      >
        {showMoreOption ? <IPayIcon icon={icons.more} size={24} color={colors.primary.primary900} /> : <IPayView />}
      </IPayPressable>
    </IPayView>
  );
};

export default IPaySadadBill;

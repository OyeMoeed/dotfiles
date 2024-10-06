/* eslint-disable no-case-declarations */
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
import BILLS_MANAGEMENT_URLS from '@app/network/services/bills-management/bills-management.urls';
import useTheme from '@app/styles/hooks/theme.hook';
import { dateTimeFormat } from '@app/utilities';
import { getFormattedDate } from '@app/utilities/date-helper.util';
import { BillStatus, States } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { billId, billerId, billerName, amount, billDesc, dueDateTime, selected = false, billStatusCode } = billDetails;

  const { colors } = useTheme();
  const styles = sadadBillStyles(colors);
  const { t } = useTranslation();

  const statusVariant = useMemo(() => {
    if (dueDateTime) {
      switch (billStatusCode) {
        case BillStatus.UNPAID:
          return States.NATURAL;
        case BillStatus.DEACTIVE:
          return States.ERROR;
        default:
          return States.SUCCESS;
      }
    } else {
      return '';
    }
  }, [billStatusCode]);

  // Function to get the key from the value
  const getEnumKeyByValue = (enumObj: any, value: string): string | undefined =>
    Object.keys(enumObj).find((key) => enumObj[key] === value);

  const billStatus = useMemo(() => {
    let key: string | undefined = '';
    switch (billStatusCode) {
      case BillStatus.DEACTIVE:
        key = getEnumKeyByValue(BillStatus, BillStatus.DEACTIVE);
        return `BILL_PAYMENTS.${key}`;
      case BillStatus.UNPAID:
        key = getEnumKeyByValue(BillStatus, BillStatus.UNPAID);
        return `BILL_PAYMENTS.${key}`;
      case BillStatus.PARTIALLY_PAID:
        key = getEnumKeyByValue(BillStatus, BillStatus.PARTIALLY_PAID);
        return `BILL_PAYMENTS.${key}`;
      case BillStatus.OVER_PAID:
        key = getEnumKeyByValue(BillStatus, BillStatus.OVER_PAID);
        return `BILL_PAYMENTS.${key}`;
      default:
        key = getEnumKeyByValue(BillStatus, BillStatus.PAID);
        return `BILL_PAYMENTS.${key}`;
    }
  }, [billStatusCode]);

  const billingAmountColor = useMemo(
    () => (Number(amount) > 0 ? colors.natural.natural900 : colors.natural.natural300),
    [amount],
  );

  const dueDateColor = useMemo(() => {
    const currentDate = moment();
    const parsedDueDate = moment(dueDateTime, dateTimeFormat.DateAndTime);
    return currentDate.isAfter(parsedDueDate) ? colors.error.error500 : colors.natural.natural500;
  }, [dueDateTime]);

  const billingAmount = amount ? `${amount || 0} ${t('COMMON.SAR')}` : '';
  const billingDueDate = `${t('SADAD.DUE')} ${getFormattedDate(dueDateTime, dateTimeFormat.DateMonthYearWithoutSpace, dateTimeFormat.MonthDateFormat)}`;

  const onPressCheckBox = () => {
    if (onSelectBill) onSelectBill(billId);
  };

  const onPressMore = () => {
    onPressMoreOptions?.(billId);
  };

  const getBillerImage = useCallback(() => BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(billerId), [billerId]);

  return (
    <IPayView testID={`${testID}-sadad-bill`} style={[styles.container, style]}>
      {showCheckBox && <IPayCheckbox isCheck={selected} onPress={onPressCheckBox} />}
      <IPayView style={styles.contentView}>
        <IPayView>
          <IPayImage image={getBillerImage()} style={styles.vendorIcon} />
          <IPaySubHeadlineText
            text={billDesc}
            style={[styles.billSubHeading, billDesc.length > 30 && styles.condtionalWidthSubtitle]}
          />
          <IPayCaption2Text text={billerName} color={colors.natural.natural900} style={styles.vendorText} />
        </IPayView>
        <IPayView style={styles.contentChildView}>
          {dueDateTime && (
            <IPayChip
              containerStyle={styles.chipView}
              isShowIcon={false}
              textValue={billStatus}
              variant={statusVariant}
            />
          )}
          <IPaySubHeadlineText text={billingAmount} color={billingAmountColor} />
          {billStatusCode === BillStatus.UNPAID && (
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

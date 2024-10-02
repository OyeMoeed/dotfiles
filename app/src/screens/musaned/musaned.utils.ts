import i18n from '@app/localization/i18n.localization';
import colors from '@app/styles/colors.const';
import { MusanedStatus } from '@app/utilities';
import { shareOptions } from '@app/utilities/shared.util';
import Share from 'react-native-share';
import { MusanedPaySalaryConfirmPaymentInfo } from './musaned-pay-salary-confirm/musaned-pay-salary-confirm.interface';
import { MusanedUserDetailsData } from './musaned-user-details/musaned-user-details.interface';

// this function should change the color of the status of the gift
const getStatusStyles = (theme: typeof colors, status: MusanedStatus = MusanedStatus.UNPAIED) => {
  switch (status) {
    case MusanedStatus.UNPAIED:
      return {
        color: theme.natural.natural700,
        text: 'MUSANED.UNPAID',
        backgroundColor: theme.natural.natural100,
        type: MusanedStatus.UNPAIED,
      };
    case MusanedStatus.PAID:
      return {
        color: theme.tertiary.tertiary500,
        text: 'MUSANED.PAID',
        backgroundColor: theme.success.success25,
        type: MusanedStatus.PAID,
      };
    default:
      return {
        color: theme.natural.natural700,
        text: 'MUSANED.UNPAID',
        backgroundColor: theme.natural.natural100,
        type: MusanedStatus.UNPAIED,
      };
  }
};

const getShareableMessage = i18n.t('MUSANED.INVITE_LABORER');

const bottomSheetShare = async (mobileNumber: string) => {
  const otherOptions = {
    subject: 'Wa',
    message: getShareableMessage,
    title: i18n.t('MUSANED.HEADER'),
    social: Share.Social.WHATSAPP,
    whatsAppNumber: mobileNumber,
  };

  Share.open(shareOptions(getShareableMessage, otherOptions))
    .then(() => {})
    .catch(() => {});
};

const getPaymentSalaryConfirmationData = (
  paymentInfo: MusanedPaySalaryConfirmPaymentInfo,
  userInfo: MusanedUserDetailsData,
) => {
  const {
    fromDate,
    toDate,
    totalSalary,
    fees,
    vat,
    basicSalary,
    bonusAmount,
    deductionAmount,
    deductionReason,
    note,
    extraAmount,
  } = paymentInfo;
  const { poiNumber } = userInfo;

  const detailsInfo = [
    {
      text: 'MUSANED.LABORER_ID',
      details: poiNumber,
    },
    {
      text: 'COMMON.DATE',
      details: `${fromDate} to ${toDate}`,
      hidden: !fromDate || !toDate,
    },
    {
      text: 'MUSANED.TOTAL_SALARY',
      details: `${totalSalary} ${i18n.t('SAR')}`,
      hidden: !totalSalary,
    },
    {
      text: 'MUSANED.BASIC_SALARY',
      details: `${basicSalary} ${i18n.t('SAR')}`,
      hidden: !basicSalary,
    },
    {
      text: 'MUSANED.PAID_BONUS_AMOUNT',
      details: `${bonusAmount} ${i18n.t('SAR')}`,
      hidden: !bonusAmount,
    },
    {
      text: 'MUSANED.EXTRA_AMOUNT',
      details: `${extraAmount} ${i18n.t('SAR')}`,
      hidden: !extraAmount,
    },
    {
      text: 'MUSANED.NOTE',
      details: note,
      hidden: !extraAmount,
    },
    {
      text: 'MUSANED.DEDUCTION_AMOUNT',
      details: `${deductionAmount} ${i18n.t('SAR')}`,
      hidden: !deductionAmount,
    },
    {
      text: 'MUSANED.DEDUCTION_REASON',
      details: deductionReason,
      hidden: !deductionAmount,
    },
    {
      text: 'ORDER_SUMMARY.FEES',
      details: `${fees} ${i18n.t('SAR')}`,
    },
    {
      text: 'ORDER_SUMMARY.VAT',
      details: `${vat} ${i18n.t('SAR')}`,
    },
    {
      text: 'MUSANED.NOTE',
      details: note,
      hidden: !bonusAmount,
    },
  ];

  return detailsInfo;
};

export { bottomSheetShare, getPaymentSalaryConfirmationData, getStatusStyles };

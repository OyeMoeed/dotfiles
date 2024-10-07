import { TFunction } from 'i18next';
import colors from '@app/styles/colors.const';
import { MusanedStatus } from '@app/utilities';
import { shareOptions } from '@app/utilities/shared.util';
import Share from 'react-native-share';
import { MusanedPaySalaryConfirmPaymentInfo } from './musaned-pay-salary-confirm/musaned-pay-salary-confirm.interface';
import { MusanedUserDetailsData } from './musaned-user-details/musaned-user-details.interface';
import { SalaryCategories } from './musaned-pay-salary/musaned-pay-salary.interface';

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

const bottomSheetShare = async (mobileNumber: string, t: TFunction<'translation', undefined>) => {
  const getShareableMessage = t('MUSANED.INVITE_LABORER');
  const otherOptions = {
    subject: 'Wa',
    message: getShareableMessage,
    title: t('MUSANED.HEADER'),
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
  t: TFunction<'translation', undefined>,
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
    salaryType,
  } = paymentInfo;
  const { poiNumber } = userInfo;
  const isMonthlySalary = salaryType.id === SalaryCategories.Monthly_Salary;
  const selectedDate = fromDate === toDate ? fromDate : `${fromDate} to ${toDate}`;

  const detailsInfo = [
    {
      text: 'MUSANED.LABORER_ID',
      details: poiNumber,
    },
    {
      text: isMonthlySalary ? 'MUSANED.MONTHS' : 'COMMON.DATE',
      details: isMonthlySalary ? `${fromDate}` : selectedDate,
      hidden: !fromDate || !toDate,
    },
    {
      text: 'MUSANED.BASIC_SALARY',
      details: `${basicSalary} ${t('COMMON.SAR')}`,
      hidden: !basicSalary || Number(basicSalary) === Number(totalSalary),
    },
    {
      text: 'MUSANED.DEDUCTION_AMOUNT',
      details: `${deductionAmount} ${t('COMMON.SAR')}`,
      hidden: !deductionAmount,
    },
    {
      text: 'MUSANED.PAID_BONUS_AMOUNT',
      details: `${bonusAmount} ${t('COMMON.SAR')}`,
      hidden: !bonusAmount,
    },
    {
      text: 'MUSANED.EXTRA_AMOUNT',
      details: `${extraAmount} ${t('COMMON.SAR')}`,
      hidden: !extraAmount,
    },
    {
      text: isMonthlySalary ? 'MUSANED.PAID_SALARY' : 'MUSANED.TOTAL_SALARY',
      details: `${totalSalary} ${t('COMMON.SAR')}`,
      hidden: !totalSalary,
    },
    {
      text: 'MUSANED.NOTE',
      details: note,
      hidden: !extraAmount,
    },
    {
      text: 'MUSANED.DEDUCTION_REASON',
      details: deductionReason,
      hidden: !deductionAmount,
    },
    {
      text: 'ORDER_SUMMARY.FEES',
      details: `${fees} ${t('COMMON.SAR')}`,
    },
    {
      text: 'ORDER_SUMMARY.VAT',
      details: `${vat} ${t('COMMON.SAR')}`,
    },
    {
      text: 'MUSANED.NOTE',
      details: note,
      hidden: !bonusAmount,
    },
  ].filter((value) => !value.hidden);

  return detailsInfo;
};

const convertToBEDate = (value: Date | string | null) => String(value).split('/').reverse().join(':');

const convertToLocalDate = (value: Date | string | null) => String(value).split(':').reverse().join('/');

export { bottomSheetShare, getPaymentSalaryConfirmationData, getStatusStyles, convertToBEDate, convertToLocalDate };
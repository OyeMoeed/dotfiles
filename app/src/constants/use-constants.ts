import MoneyRequestStatus from '@app/enums/money-request-status.enum';
import { TransactionOperations } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { FiltersType } from '@app/utilities/enums.util';
import moment from 'moment';

const useConstantData = () => {
  const localizationText = useLocalization();
  const date = new Date();
  const timeFormatted = moment(date).format('HH:mm');
  const dateFormatted = moment(date).format('DD/MM/YYYY');
  const formattedDate = `${dateFormatted} - ${timeFormatted}`;

  const transferReasonData = [
    { id: 1, text: localizationText.SEND_MONEY_FORM.LIVING_EXPENSES },
    { id: 2, text: localizationText.SEND_MONEY_FORM.ACCOMMODATION_FEES },
    { id: 3, text: localizationText.SEND_MONEY_FORM.BILL_PAYMENT },
    { id: 4, text: localizationText.SEND_MONEY_FORM.CAR_FINANCE_PAYMENT },
    { id: 5, text: localizationText.SEND_MONEY_FORM.HOUSE_FINANCE_PAYMENT },
    { id: 6, text: localizationText.SEND_MONEY_FORM.INSURANCE_PAYMENT },
    { id: 7, text: localizationText.SEND_MONEY_FORM.RENT_PAYMENT },
  ];

  const transactionHistoryFilterData = [
    {
      id: '1',
      label: localizationText.TRANSACTION_HISTORY.TRANSACTION_TYPE,
      type: FiltersType.TRANSACTION_TYPE,
      filterValues: [
        {
          id: '1',
          key: 'POS_PURSHASE',
          value: localizationText.HOME.POS_PURSHASE,
        },
        {
          id: '2',
          key: 'SEND_MONEY',
          value: localizationText.HOME.SEND_MONEY,
        },
        {
          id: '3',
          key: 'RECEIVED_MONEY',
          value: localizationText.HOME.RECEIVED_MONEY,
        },
        {
          id: '4',
          key: 'LOCAL_TRANSFER',
          value: localizationText.HOME.LOCAL_TRANSFER,
        },
        {
          id: '5',
          key: 'ATM_WITHDRAWALS',
          value: localizationText.HOME.ATM_WITHDRAWALS,
        },
        {
          id: '6',
          key: 'CASHBACK_PROMO',
          value: localizationText.HOME.CASHBACK_PROMO,
        },
      ],
    },
    {
      id: '2',
      label: localizationText.TRANSACTION_HISTORY.CARD,
      type: FiltersType.CARD,
      filterValues: [
        {
          id: '1',
          key: 'CARD1',
          value: `${localizationText.CARD_OPTIONS.DEBIT_CARD} - **** 2222`,
        },
        {
          id: '1',
          key: 'CARD2',
          value: `${localizationText.TOP_UP.CREDIT_CARD} - **** 2222`,
        },
      ],
    },
  ];
  const requestMoneyData = [
    {
      id: '1',
      title: 'Ahmed Mohamed',
      status: MoneyRequestStatus.CANCEL,
      type: TransactionOperations.CREDIT,
      receiver_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      send_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      request_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    },
    {
      id: '2',
      title: 'mahmoud Abdullah',
      status: MoneyRequestStatus.PAID,
      type: TransactionOperations.DEBIT,
      receiver_mobile_number: '0503340494',
      amount: '460',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      send_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      payment_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      ref_number: 'FTA35346',
    },
    {
      id: '3',
      title: 'Esraa Ahmed',
      status: MoneyRequestStatus.PENDING,
      type: TransactionOperations.DEBIT,
      receiver_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      request_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      ref_number: 'FTA35346',
    },
    {
      id: '4',
      title: 'Mohamed Ali',
      status: MoneyRequestStatus.REJECTED,
      type: TransactionOperations.CREDIT,
      receiver_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      send_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      rejection_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      ref_number: 'FTA35346',
    },
  ];

  const requestSummaryData = [
    {
      id: 1,
      label: localizationText.REQUEST_SUMMARY.PAY_TO,
      detailsText: 'Ahmed Mohammed', // TODO: replaced with api
      leftIcon: true,
    },
    {
      id: 2,
      label: localizationText.REQUEST_SUMMARY.MOBILE_NUMBER,
      detailsText: '0503340494', // TODO: replaced by api
    },
    {
      id: 3,
      label: localizationText.REQUEST_SUMMARY.AMOUNT,
    },
  ];

  const transactionHistoryFilterDefaultValues = {
    [FiltersType.TRANSACTION_TYPE]: '',
    [FiltersType.CARD]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  return {
    requestSummaryData,
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    requestMoneyData
  };
};

export default useConstantData;

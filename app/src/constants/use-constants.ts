import GiftStatus from '@app/enums/gift-status.enum';
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
  const giftData = [
    {
      id: '1',
      title: 'Ibrahim Abdullah', // TODO: replaced with api
      occasion: 'Eiydiah',
      status: GiftStatus.UNOPENED,
      amount: '2000',
      dates: formattedDate,
    },
    {
      id: '2',
      title: 'Sayed Ismael', // TODO: replaced with api
      occasion: 'Eiydiah',
      status: GiftStatus.EXPIRED,
      amount: '500',
      dates: formattedDate,
    },
    {
      id: '3',
      title: 'Alaa Mahmoud', // TODO: replaced with api
      occasion: 'Eiydiah',
      status: GiftStatus.OPENED,
      amount: '1200',
      dates: formattedDate,
    },
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

  const billPayDetailsData = [
    //TODO will be repleaced by API data
    {
      id: '2',
      label: localizationText.TRAFFIC_VIOLATION.AMOUNT,
      value: '1000',
    },
    {
      id: '3',
      label: localizationText.TRAFFIC_VIOLATION.SERVICE_PROVIDER,
      value: 'Traffic MOI',
    },
    {
      id: '4',
      label: localizationText.TRAFFIC_VIOLATION.SERVICE_TYPE,
      value: 'Traffic violation',
    },
    {
      id: '2',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATOR_ID,
      value: '10061883685',
    },
    {
      id: '3',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL,
      value: '2432533475',
    },
    {
      id: '4',
      label: localizationText.TRAFFIC_VIOLATION.VIOLATION_DATE,
      value: '14/03/2024 - 15:30',
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
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    giftData,
    billPayDetailsData,
  };
};

export default useConstantData;

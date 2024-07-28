import images from '@app/assets/images';
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

  const transactionHistoryFilterDefaultValues = {
    [FiltersType.TRANSACTION_TYPE]: '',
    [FiltersType.CARD]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  const sadadBillsCompanyData = [
    {
      id: 1,
      image: images.electricityBill,
      text: '123 - Saudi electricity company',
      type: 'Global Services',
    },
    {
      id: 2,
      image: images.licence,
      text: '231 - Madinah regional municiplity',
      type: 'Communiations',
    },
    {
      id: 3,
      image: images.alinmaBankLogo,
      text: '745 - Mobily',
      type: 'Banks',
    },
    {
      id: 4,
      image: images.rajhiBankLogo,
      text: '964 - Madinah municiplity',
      type: 'Banks',
    },
  ];

  const sadadServiceTypeData = [
    { id: 1, text: 'Electricity Bill' },
    { id: 2, text: 'Renew Iqamah' },
    { id: 3, text: 'Issue Exit Re-Entry Visit (Single)' },
    { id: 4, text: 'Visa Cancellation' },
    { id: 5, text: 'Transfer of Sponsorship' },
    { id: 6, text: 'Replace Iqamah' },
    { id: 7, text: 'Transfer Dependent to be Head of Household' },
    { id: 8, text: 'Change of Occupation' },
  ];

  return {
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    giftData,
    sadadBillsCompanyData,
    sadadServiceTypeData,
  };
};

export default useConstantData;

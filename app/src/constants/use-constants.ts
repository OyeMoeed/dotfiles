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

  const orderSummaryData = [
    {
      id: 1,
      label: localizationText.ORDER_SUMMARY.PRODUCT_NAME,
      detailsText: 'Subscribe on Spotify', // TODO: replaced with api
    },
    {
      id: 2,
      label: localizationText.ORDER_SUMMARY.AMOUNT,
    },
    {
      id: 3,
      label: localizationText.ORDER_SUMMARY.DISCOUNT,
      detailsText: '20%',
    },
    {
      id: 4,
      label: localizationText.ORDER_SUMMARY.FEES,
    },
    {
      id: 5,
      label: localizationText.ORDER_SUMMARY.VAT,
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

  const merchantData = [
    {
      id: '1',
      title: 'Careem Captains Cards',
      image: images.mobilityLogo,
    },
    {
      id: '2',
      title: 'Mobily Saudi Arabia',
      image: images.mobilityLogo,
    },
    {
      id: '3',
      title: 'Airbnb US Store',
      image: images.mobilityLogo,
    },
    {
      id: '4',
      title: 'Microsoft Office',
    },
    {
      id: '5',
      title: 'Uber Drivers Vouchers - KSA',
      image: images.uberLogo,
    },
  ];
  return {
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    giftData,
    merchantData,
    requestSummaryData,
    orderSummaryData,
  };
};

export default useConstantData;

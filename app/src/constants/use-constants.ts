import icons from '@app/assets/icons';
import GiftStatus from '@app/enums/gift-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
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

  const sendGiftFilterData = [
    {
      id: '1',
      label: localizationText.SEND_GIFT.RECEIVER_NAME,
      type: FiltersType.CONTACT_NUMBER,
      searchPlaceholder: localizationText.SEND_GIFT.SEARCH_FOR_RECEIVER,
      dropdownIcon: icons.user_search,
      listTitleStyle: { fontWeight: FONT_WEIGHT_BOLD },
      filterValues: [
        {
          id: '1',
          key: 'Ahmend',
          value: 'Ahmed',
          description: '+9711133339900',
        },
        {
          id: '2',
          key: 'Omer',
          value: 'Omer',
          description: '+9711133339900',
        },
        {
          id: '3',
          key: 'Esra',
          value: 'Esra',
          description: '+9711133339900',
        },
      ],
    },
  ];

  const sendGiftBottomFilterData = [
    {
      id: '1',
      label: localizationText.SEND_GIFT.STATUS,
      type: FiltersType.STATUS,
      filterValues: [
        {
          id: '1',
          key: GiftStatus.OPENED,
          value: localizationText.SEND_GIFT.OPENED,
        },
        {
          id: '2',
          key: GiftStatus.UNOPENED,
          value: localizationText.SEND_GIFT.UNOPENED,
        },
        {
          id: '3',
          key: GiftStatus.EXPIRED,
          value: localizationText.SEND_GIFT.EXPIRED,
        },
      ],
    },
    {
      id: '2',
      label: localizationText.SEND_GIFT.OCCASION,
      type: FiltersType.OCCASION,
      filterValues: [
        {
          id: '1',
          key: 'Eiydiah',
          value: 'Eiydiah',
        },
        {
          id: '2',
          key: 'Birthday',
          value: 'Birthday',
        },
      ],
    },
  ];

  const sendGiftFilterDefaultValues = {
    [FiltersType.CONTACT_NUMBER]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
    [FiltersType.STATUS]: '',
    [FiltersType.OCCASION]: '',
  };

  return {
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    sendGiftFilterData,
    sendGiftFilterDefaultValues,
    sendGiftBottomFilterData,
    giftData,
  };
};

export default useConstantData;

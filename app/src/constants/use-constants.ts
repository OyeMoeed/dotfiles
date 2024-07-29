import icons from '@app/assets/icons';
import images from '@app/assets/images';
import GiftStatus from '@app/enums/gift-status.enum';
import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { TransactionOperations } from '@app/enums/transaction-types.enum';

import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { FiltersType } from '@app/utilities/enums.util';

const useConstantData = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const date = new Date();
  const formattedDate = formatDateAndTime(date, dateTimeFormat.DateAndTime)

  const transferReasonData = [
    { id: 1, text: localizationText.SEND_MONEY_FORM.LIVING_EXPENSES },
    { id: 2, text: localizationText.SEND_MONEY_FORM.ACCOMMODATION_FEES },
    { id: 3, text: localizationText.SEND_MONEY_FORM.BILL_PAYMENT },
    { id: 4, text: localizationText.SEND_MONEY_FORM.CAR_FINANCE_PAYMENT },
    { id: 5, text: localizationText.SEND_MONEY_FORM.HOUSE_FINANCE_PAYMENT },
    { id: 6, text: localizationText.SEND_MONEY_FORM.INSURANCE_PAYMENT },
    { id: 7, text: localizationText.SEND_MONEY_FORM.RENT_PAYMENT },
  ];
  const nonAlinmaDetails = [
    {
      id: '1',
      label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
      value: 'Esra’ Alturk', // TODO: replace with api data
      leftIcon: icons.user_square,
      color: colors.primary.primary900,
      isAlinma: false,
    },
    { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: localizationText.TRANSFER_SUMMARY.AMOUNT_2 },
    {
      id: '3',
      label: localizationText.TRANSFER_SUMMARY.REASON,
      value: localizationText.TRANSFER_SUMMARY.REASON_TRANSFER,
    },
  ];
  const alinmaDetails = [
    {
      id: '1',
      label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
      value: 'Adam Ahmed', // TODO: replace with api data
      leftIcon: images.logoTab,
      isAlinma: true,
    },
    { id: '2', label: localizationText.TRANSFER_SUMMARY.AMOUNT, value: localizationText.TRANSFER_SUMMARY.MONEY },
    {
      id: '3',
      label: localizationText.TRANSFER_SUMMARY.REASON,
      value: localizationText.TRANSFER_SUMMARY.REASON_TRANSFER,
    },
    { id: '4', label: localizationText.TRANSFER_SUMMARY.NOTE, value: localizationText.TRANSFER_SUMMARY.NOTE_DETAIL },
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

  const offerFilterData = [
    {
      id: '1',
      label: localizationText.OFFERS.CATEGORY,
      type: FiltersType.OFFER_CATEGORY,
      filterValues: [
        {
          id: '1',
          key: 'CLOTHS',
          value: localizationText.OFFERS.CLOTHS,
        },
        {
          id: '2',
          key: 'FOOD',
          value: localizationText.OFFERS.FOOD,
        },
      ],
    },
    {
      id: '2',
      label: localizationText.OFFERS.AVAILABILITY,
      type: FiltersType.OFFER_AVAILABILITY,
      filterValues: [
        {
          id: '1',
          key: 'ONLINE',
          value: localizationText.OFFERS.ONLINE,
        },
        {
          id: '2',
          key: 'OFFLINE',
          value: localizationText.OFFERS.OFFLINE,
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

  const applePayDetails = [
    {
      id: '1',
      label: localizationText.TOP_UP.TOPUP_TYPE,
      value: localizationText.TOP_UP.APPLE_PAY,
      icon: icons.apple_pay,
      color: colors.primary.primary800,
    },
    { id: '2', label: localizationText.TOP_UP.TOPUP_DATE, value: formattedDate, icon: null },
  ];

  const cardPayDetails = [
    {
      id: '1',
      label: localizationText.TOP_UP.TOPUP_TYPE,
      value: localizationText.TOP_UP.CREDIT_CARD,
      icon: icons.cards,
      color: colors.primary.primary800,
    },
    {
      id: '2',
      label: 'Adam Ahmed', // TODO: This DATA will be repalce by API response
      value: '**** **** **** 1250',
      icon: null,
      leftIcon: icons.master_card,
    },
    {
      id: '3',
      label: localizationText.TOP_UP.REF_NUMBER,
      value: '21523325',
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    { id: '4', label: localizationText.TOP_UP.TOPUP_DATE, value: formattedDate, icon: null },
  ];
  const walletPayDetailes = [
    {
      id: '2',
      label: localizationText.TOP_UP.TRANSFER_TO,
      value: 'Shatha Mohammed', // TODO:replaced by api
      icon: null,
      leftIcon: icons.master_card,
    },
    {
      id: '3',
      label: localizationText.TOP_UP.TRANSACTION_ID,
      value: '21523325',
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    { id: '4', label: localizationText.TRANSACTION_HISTORY.AMOUNT, value: localizationText.TOP_UP.AMOUNT, icon: null },
    { id: '1', label: localizationText.TRANSACTION_HISTORY.TRANSFER_REASON, value: localizationText.TOP_UP.REASON },
  ];

  const giftPayDetailes = [
    {
      id: '1',
      label: localizationText.TOP_UP.TRANSFER_TO,
      value: 'Shatha Mohammed', // TODO:replaced by api
      isAlinma: true,
    },
    { id: '2', label: localizationText.TRANSACTION_HISTORY.AMOUNT, value: localizationText.TOP_UP.AMOUNT, icon: null },
    { id: '3', label: localizationText.TOP_UP.OCCASION, value: localizationText.TOP_UP.EIYDIAH },
  ];

    const offerFilterDefaultValues = {
    [FiltersType.OFFER_CATEGORY]: '',
    [FiltersType.OFFER_AVAILABILITY]: '',
  };
  const contactList = [
    //TODO: List will replace by actual data
    { title: localizationText.MENU.CALL_WITHIN_SA, phone_number: '8004339000' },
    { title: localizationText.MENU.CALL_OUTSIDE_SA, phone_number: '(+966) 920000670' },
  ];
  const guideStepsToCall = [
    { title: localizationText.ACTIVATE_BENEFICIARY.CALL_FROM_REGISTERED_NUM, stepNumber: '1', isContactList: true },
    { title: localizationText.ACTIVATE_BENEFICIARY.PRESS_NUMBER_4, stepNumber: '2', pressNumber: '4' },
    {
      title: localizationText.ACTIVATE_BENEFICIARY.PRESS_NUMBER_1_TO_ACTIVATE,
      stepNumber: '3',
      pressNumber: '1',
      extraText: localizationText.ACTIVATE_BENEFICIARY.TO_ACTIVATE,
    },
  ];
  const guideToReceiveCall = [
    { title: localizationText.ACTIVATE_BENEFICIARY.ANSWER_THE_CALL, stepNumber: '1', isContactList: true },
    {
      title: localizationText.ACTIVATE_BENEFICIARY.PRESS_NUMBER_1_TO_ACTIVATE,
      stepNumber: '2',
      pressNumber: '1',
      extraText: localizationText.ACTIVATE_BENEFICIARY.TO_ACTIVATE,
    },
  ];
  return {
    transferReasonData,
    giftPayDetailes,
    walletPayDetailes,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    sendGiftFilterData,
    sendGiftFilterDefaultValues,
    sendGiftBottomFilterData,
    alinmaDetails,
    nonAlinmaDetails,
    contactList,
    guideStepsToCall,
    guideToReceiveCall,
    giftData,
    billPayDetailsData,
    applePayDetails,
    cardPayDetails,
    offerFilterData,
    offerFilterDefaultValues,
    requestSummaryData,
    requestMoneyData
  };
};

export default useConstantData;

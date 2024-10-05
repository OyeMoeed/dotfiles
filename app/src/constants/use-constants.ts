// TODO: fix max-lines
/* eslint-disable max-lines-per-function */
import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { FilterTypes } from '@app/components/organism/ipay-filter-bottom-sheet/ipay-filter-bottom-sheet.interface';
import { GiftStatus } from '@app/enums/gift-status.enum';
import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { TransactionOperations } from '@app/enums/transaction-types.enum';
import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';
import { SalaryCategories } from '@app/screens/musaned/musaned-pay-salary/musaned-pay-salary.interface';

import useTheme from '@app/styles/hooks/theme.hook';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { dateTimeFormat } from '@app/utilities';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import { FiltersType, TransactionHistoryFilter } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';

const useConstantData = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const date = new Date();
  const formattedDate = formatDateAndTime(date, dateTimeFormat.DateAndTime);

  const localTransferReasonData = [
    { id: 1, text: t('LOCAL_TRANSFER.INVESTMENT') },
    { id: 2, text: t('LOCAL_TRANSFER.TUITION') },
    { id: 7, text: t('LOCAL_TRANSFER.TREATMENT') },
    { id: 3, text: t('LOCAL_TRANSFER.TRAVEL') },
    { id: 4, text: t('LOCAL_TRANSFER.PURCHASES') },
    { id: 5, text: t('LOCAL_TRANSFER.FIRENDS_AND_FAMILY') },
    { id: 6, text: t('LOCAL_TRANSFER.DONATION') },
  ];
  const transferReasonData = [
    { id: 1, text: t('SEND_MONEY_FORM.LIVING_EXPENSES') },
    { id: 2, text: t('SEND_MONEY_FORM.ACCOMMODATION_FEES') },
    { id: 3, text: t('SEND_MONEY_FORM.BILL_PAYMENT') },
    { id: 4, text: t('SEND_MONEY_FORM.CAR_FINANCE_PAYMENT') },
    { id: 5, text: t('SEND_MONEY_FORM.HOUSE_FINANCE_PAYMENT') },
    { id: 6, text: t('SEND_MONEY_FORM.INSURANCE_PAYMENT') },
    { id: 7, text: t('SEND_MONEY_FORM.RENT_PAYMENT') },
  ];
  const nonAlinmaDetails = [
    {
      id: '1',
      label: t('TRANSFER_SUMMARY.TRANSFER_TO'),
      value: 'Esra’ Alturk', // TODO: replace with api data
      leftIcon: icons.user_square,
      color: colors.primary.primary900,
      isAlinma: false,
    },
    { id: '2', label: t('TRANSFER_SUMMARY.AMOUNT'), value: t('TRANSFER_SUMMARY.AMOUNT_2') },
    {
      id: '3',
      label: t('TRANSFER_SUMMARY.REASON'),
      value: t('TRANSFER_SUMMARY.REASON_TRANSFER'),
    },
  ];
  const alinmaDetails = [
    {
      id: '1',
      label: t('TRANSFER_SUMMARY.TRANSFER_TO'),
      value: 'Adam Ahmed', // TODO: replace with api data
      leftIcon: images.logoIconGradient,
      isAlinma: true,
    },
    { id: '2', label: t('TRANSFER_SUMMARY.AMOUNT'), value: t('TRANSFER_SUMMARY.MONEY') },
    {
      id: '3',
      label: t('TRANSFER_SUMMARY.REASON'),
      value: t('TRANSFER_SUMMARY.REASON_TRANSFER'),
    },
    { id: '4', label: t('TRANSFER_SUMMARY.NOTE'), value: t('TRANSFER_SUMMARY.NOTE_DETAIL') },
  ];
  const alinmaDetailsUnsaved1 = [
    {
      id: '1',
      label: t('TRANSFER_SUMMARY.TRANSFER_TO'),
      value: '015324234889', // TODO: replace with api data
      leftIcon: images.logoIconGradient,
      isAlinma: true,
    },
    { id: '2', label: t('TRANSFER_SUMMARY.AMOUNT'), value: `500 ${t('COMMON.SAR')}` },
    { id: '4', label: t('TRANSFER_SUMMARY.NOTE'), value: 'Thank You! long message te...' },
  ];
  const alinmaDetailsUnsaved2 = [
    {
      id: '1',
      label: t('TRANSFER_SUMMARY.TRANSFER_TO'),
      value: '010203040505', // TODO: replace with api data
      leftIcon: images.logoIconGradient,
      isAlinma: true,
    },
    { id: '2', label: t('TRANSFER_SUMMARY.AMOUNT'), value: `800 ${t('COMMON.SAR')}` },
    {
      id: '3',
      label: t('TRANSFER_SUMMARY.REASON'),
      value: t('TRANSFER_SUMMARY.REASON_TRANSFER'),
    },
  ];

  const sendMoneyDetails = [
    {
      id: '1',
      label: t('TRANSFER_SUMMARY.TRANSFER_TO'),
      value: 'Adam Ahmed', // TODO: replace with api data
      leftIcon: true,
      isAlinma: true,
    },
    { id: '2', label: t('TOP_UP.TRANSACTION_ID'), value: '21523325', icon: icons.copy },
    {
      id: '3',
      label: t('TRANSFER_SUMMARY.AMOUNT'),
      value: `${3000} ${t('COMMON.SAR')}`,
    },
    {
      id: '4',
      label: t('TRANSFER_SUMMARY.REASON'),
      value: t('TRANSFER_SUMMARY.REASON_TRANSFER'),
    },
  ];

  const transactionHistoryFilterData: TransactionHistoryFilter[] = [
    {
      id: '1',
      label: t('TRANSACTION_HISTORY.TRANSACTION_TYPE'),
      type: FiltersType.TRANSACTION_TYPE,
      filterValues: [
        {
          id: '1',
          key: 'POS_PURSHASE',
          value: t('HOME.POS_PURSHASE'),
        },
        {
          id: '2',
          key: 'SEND_MONEY',
          value: t('HOME.SEND_MONEY'),
        },
        {
          id: '3',
          key: 'RECEIVED_MONEY',
          value: t('HOME.RECEIVED_MONEY'),
        },
        {
          id: '4',
          key: 'LOCAL_TRANSFER',
          value: t('HOME.LOCAL_TRANSFER'),
        },
        {
          id: '5',
          key: 'ATM_WITHDRAWALS',
          value: t('HOME.ATM_WITHDRAWALS'),
        },
        {
          id: '6',
          key: 'CASHBACK_PROMO',
          value: t('HOME.CASHBACK_PROMO'),
        },
      ],
    },
    {
      id: '2',
      label: t('TRANSACTION_HISTORY.CARD'),
      type: FiltersType.CARD,
      filterValues: [
        {
          id: '1',
          key: 'CARD1',
          value: `${t('CARD_OPTIONS.DEBIT_CARD')} - **** 2222`,
        },
        {
          id: '1',
          key: 'CARD2',
          value: `${t('TOP_UP.CREDIT_CARD')} - **** 2222`,
        },
      ],
    },
  ];
  const sendRequestMoneyData = [
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
      cancellation_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    },
    {
      id: '2',
      title: 'mahmoud Abdullah',
      status: MoneyRequestStatus.PAID,
      type: TransactionOperations.CREDIT,
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
      type: TransactionOperations.CREDIT,
      receiver_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      send_date: new Date('2024-07-01T12:00:00+05:00').toString(),
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

  const transactionHistoryFilterDataWithoudCard = [
    {
      id: '1',
      label: t('TRANSACTION_HISTORY.TRANSACTION_TYPE'),
      type: FiltersType.TRANSACTION_TYPE,
      filterValues: [
        {
          id: '1',
          key: 'POS_PURSHASE',
          value: t('HOME.POS_PURSHASE'),
        },
        {
          id: '2',
          key: 'SEND_MONEY',
          value: t('HOME.SEND_MONEY'),
        },
        {
          id: '3',
          key: 'RECEIVED_MONEY',
          value: t('HOME.RECEIVED_MONEY'),
        },
        {
          id: '4',
          key: 'LOCAL_TRANSFER',
          value: t('HOME.LOCAL_TRANSFER'),
        },
        {
          id: '5',
          key: 'ATM_WITHDRAWALS',
          value: t('HOME.ATM_WITHDRAWALS'),
        },
        {
          id: '6',
          key: 'CASHBACK_PROMO',
          value: t('HOME.CASHBACK_PROMO'),
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
      type: TransactionOperations.CREDIT,
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
      type: TransactionOperations.CREDIT,
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

  const receviedRequestMoneyData = [
    {
      id: '1',
      title: 'Ahmed Mohamed',
      status: MoneyRequestStatus.CANCEL,
      type: TransactionOperations.DEBIT,
      sender_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      request_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      cancellation_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    },
    {
      id: '2',
      title: 'mahmoud Abdullah',
      status: MoneyRequestStatus.PAID,
      type: TransactionOperations.DEBIT,
      sender_mobile_number: '0503340494',
      amount: '460',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      request_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      payment_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      ref_number: 'FTA35346',
    },
    {
      id: '3',
      title: 'Esraa Ahmed',
      status: MoneyRequestStatus.PENDING,
      type: TransactionOperations.DEBIT,
      sender_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      request_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    },
    {
      id: '4',
      title: 'Mohamed Ali',
      status: MoneyRequestStatus.REJECTED,
      type: TransactionOperations.DEBIT,
      sender_mobile_number: '0503340494',
      amount: '250',
      dates: formattedDate,
      note: 'Hey Dear, I would like to send this amazing request',
      request_date: new Date('2024-07-01T12:00:00+05:00').toString(),
      rejection_date: new Date('2024-07-01T12:00:00+05:00').toString(),
    },
  ];

  const requestSummaryData = [
    {
      id: 1,
      label: t('REQUEST_SUMMARY.PAY_TO'),
      detailsText: 'Ahmed Mohammed', // TODO: replaced with api
      leftIcon: true,
    },
    {
      id: 2,
      label: t('REQUEST_SUMMARY.MOBILE_NUMBER'),
      detailsText: '0503340494', // TODO: replaced by api
    },
    {
      id: 3,
      label: t('REQUEST_SUMMARY.AMOUNT'),
    },
  ];

  const offerFilterData = [
    {
      id: '1',
      isRequired: false,
      label: t('OFFERS.CATEGORY'),
      type: FiltersType.OFFER_CATEGORY,
      filterValues: [
        {
          id: '1',
          key: 'FOOD',
          value: t('OFFERS.FOOD'),
        },
        {
          id: '2',
          key: 'CLOTHS',
          value: t('OFFERS.CLOTHES'),
        },
        {
          id: '3',
          key: 'ELECTRONICS',
          value: t('OFFERS.ELECTRONICS'),
        },
        {
          id: '4',
          key: 'THEATRE',
          value: t('OFFERS.THEATRE'),
        },
        {
          id: '6',
          key: 'GAMES',
          value: t('OFFERS.GAMES'),
        },
        {
          id: '3',
          key: 'Electronics',
          value: t('OFFERS.ELECTRONICS'),
        },
        {
          id: '3',
          key: 'Games',
          value: t('OFFERS.GAMES'),
        },
        {
          id: '4',
          key: 'Theatre',
          value: t('OFFERS.THEATER'),
        },
      ],
    },
    {
      id: '2',
      isRequired: false,
      label: t('OFFERS.AVAILABILITY'),
      type: FiltersType.OFFER_AVAILABILITY,
      filterValues: [
        {
          id: '1',
          key: 'ONLINE',
          value: t('OFFERS.ONLINE'),
        },
        {
          id: '2',
          key: 'IN_STORES',
          value: t('OFFERS.IN_STORES'),
        },
      ],
    },
  ];

  const billPayDetailsData = [
    // TODO will be repleaced by API data
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.AMOUNT'),
      value: `1000 ${t('COMMON.SAR')}`,
    },
    {
      id: '3',
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: 'Traffic MOI',
    },
    {
      id: '4',
      label: t('TRAFFIC_VIOLATION.SERVICE_TYPE'),
      value: 'Traffic violation',
    },
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.VIOLATOR_ID'),
      value: '10061883685',
    },
    {
      id: '3',
      label: t('TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL'),
      value: '2432533475',
    },
    {
      id: '4',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '14/03/2024 - 15:30',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.REF_NUMBER'),
      value: 'FTA35346',
      icon: icons.copy,
    },
  ];

  const notificationRequestFilters: FilterTypes[] = [
    {
      id: '1',
      label: 'Status',
      type: FiltersType.STATUS,
      filterValues: [
        { id: '1', key: 'paid', value: 'Paid' },
        { id: '2', key: 'cancelled', value: 'Cancelled' },
        { id: '3', key: 'rejected', value: 'Rejected' },
        { id: '4', key: 'all', value: 'All' },
      ],
    },
    {
      id: '2',
      label: 'Sender Name',
      type: FiltersType.BENEFICIARY_NAME,
      filterValues: [
        { id: '1', key: 'hassan_raza', value: 'Hassan Raza' },
        { id: '2', key: 'habib', value: 'Habib Sabir' },
      ],
    },
  ];

  const billPayDetailsRefundData = [
    // TODO will be repleaced by API data

    {
      id: '3',
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: 'Traffic MOI',
    },
    {
      id: '4',
      label: t('TRAFFIC_VIOLATION.SERVICE_TYPE'),
      value: 'Traffic violation',
    },
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.VIOLATOR_ID'),
      value: '10061883685',
    },
    {
      id: '3',
      label: t('TRAFFIC_VIOLATION.VIOLATION_NUMBER_FULL'),
      value: '2432533475',
    },
    {
      id: '4',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '14/03/2024 - 15:30',
    },
  ];
  const declinedTransationData = [
    // TODO will be repleaced by API data
    {
      id: '1',
      label: t('TRAFFIC_VIOLATION.TITLE'),
      value: '1000',
      violationNumber: '124355653',
    },
  ];
  const orderSummaryData = [
    {
      id: 1,
      label: t('ORDER_SUMMARY.PRODUCT_NAME'),
      detailsText: 'Subscribe on Spotify', // TODO: replaced with api
    },
    {
      id: 2,
      label: t('ORDER_SUMMARY.AMOUNT'),
    },
    {
      id: 3,
      label: t('ORDER_SUMMARY.DISCOUNT'),
      detailsText: '20%',
    },
    {
      id: 4,
      label: t('ORDER_SUMMARY.FEES'),
    },
    {
      id: 5,
      label: t('ORDER_SUMMARY.VAT'),
    },
  ];

  const playstationData = [
    {
      id: 1,
      image: images.playstationcard,
      title: 'Playstation',
      detail: 'Sony PlayStation Network Gift Card. Saudi Arabia',
    },
    {
      id: 2,
      image: images.playstationcard,
      title: 'Playstation',
      detail: 'Sony PlayStation Network Gift Card. Saudi Arabia',
    },
    {
      id: 2,
      title: 'Playstation',
      detail: 'Sony PlayStation Network Gift Card. India',
    },
  ];

  const playStationPrices = [
    {
      id: 1,
      image: images.playstationsingle,
      title: 'Playstation',
      detail: 'Sony PlayStation Network Gift Card-10$',
      price: '40.00',
    },
    {
      id: 2,
      image: images.playstationsingle,
      title: 'Playstation',
      detail: 'Sony PlayStation Network Gift Card-20$',
      isDiscounted: true,
      discount: '20%',
      price: '700.00',
    },
    {
      id: 3,
      title: 'Playstation',
      image: images.playstationsingle,
      detail: 'Sony PlayStation Network Gift Card-10$',
      price: '40.00',
    },
  ];

  const transactionHistoryFilterDefaultValues = {
    [FiltersType.TRANSACTION_TYPE]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  const transferTypesData = [
    {
      recordID: '123',
      serviceName: 'AlinmaPay Direct',
      conversionRate: '1',
      fees: ' 10',
      total: '12,691',
      exchangeRate: '12.69',
      serviceLogo: images.ipay,
      toConvert: '1',
      currency: 'SAR',
      fromAmount: '1',
      fromCurrency: 'EGP',
      toAmount: '1',
      toCurrency: 'SAR',
    },
    {
      recordID: '113',
      serviceName: 'Western Union',
      conversionRate: '1',
      fees: ' 10',
      total: '12,690',
      exchangeRate: '12.69',
      serviceLogo: images.wu,
      toConvert: '1',
      currency: 'SAR',
      fromAmount: '1',
      fromCurrency: 'EGP',
      toAmount: '1',
      toCurrency: 'SAR',
    },
  ];

  const alinmaDirectData = {
    recordID: '123',
    serviceName: 'AlinmaPay Direct',
    serviceLogo: images.alinmaPayDirectLogo,
    type: 'Bank Transfer',
  };
  const westernUnionData = {
    recordID: '113',
    serviceName: 'Western Union',
    serviceLogo: images.westernUnionLogo,
    type: 'Cash Pickup',
  };

  const transactionHistoryFilterDefaultValuesWithoudCard = {
    [FiltersType.TRANSACTION_TYPE]: '',
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
      image: images.license,
      text: '231 - Madinah regional municiplity',
      type: 'Communications',
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

  const transferHistoryFilterData = [
    {
      id: '1',
      label: t('LOCAL_TRANSFER.BENEFICIARY_NAME'),
      type: FiltersType.BENEFICIARY_NAME,
      icon: icons.user1,
      filterValues: [
        {
          id: '1',
          key: 'ahmed_mohamed',
          value: 'Ahmed Mohamed',
        },
        {
          id: '2',
          key: 'brooklyn_simmons',
          value: 'Brooklyn Simmons',
        },
        {
          id: '3',
          key: 'ali_hassan',
          value: 'Ali Hassan',
        },
      ],
    },
    {
      id: '2',
      label: t('TRANSACTION_HISTORY.BANK_NAME'),
      type: FiltersType.BANK_NAME_LIST,
      filterValues: [
        {
          id: '1',
          key: 'bank1',
          value: 'Alinma Bank',
          image: images.alinmaBankLogo,
        },
        {
          id: '2',
          key: 'bank2',
          value: 'Saudi National Bank',
          image: images.nationalBankLogo,
        },
        {
          id: '3',
          key: 'bank3',
          value: 'Al Rajhi Bank',
          image: images.rajhiBankLogo,
        },
      ],
    },
  ];

  const internationalTransferHistoryFilterData = [
    {
      id: '1',
      label: t('INTERNATIONAL_TRANSFER.DELIVERY_TYPE'),
      type: FiltersType.DELIVERY_TYPE,
      filterValues: [
        {
          id: '1',
          title: 'AlinmaPay Direct',
          image: images.alinmaPayDirectLogo,
          data: [
            {
              id: '1',
              title: 'Bank Transfer',
              amount: '10',
              type: 'AlinmaPay Direct',
            },
            {
              id: '2',
              title: 'Cash Pickup',
              amount: '10',
              type: 'AlinmaPay Direct',
            },
          ],
        },
        {
          id: '2',
          title: 'Western Union',
          image: images.westernUnionLogo,
          data: [
            {
              id: '1',
              title: 'Degitial Wallet',
              amount: '10',
              type: 'Western Union',
            },
            {
              id: '2',
              title: 'Bank Transfer',
              amount: '10',
              type: 'Western Union',
            },
            {
              id: '3',
              title: 'Cash Pickup',
              amount: '10',
              type: 'Western Union',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      label: t('LOCAL_TRANSFER.BENEFICIARY_NAME'),
      type: FiltersType.BENEFICIARY_NAME_LIST,
      filterValues: [
        {
          id: '1',
          beneficiaryName: 'Ahmed Khan',
          country: 'Pakistan',
          icon: images.pakFlag,
        },
        {
          id: '2',
          beneficiaryName: 'Ahmed Mohamed',
          country: 'Egypt',
          icon: images.egyFlag,
        },
        {
          id: '3',
          beneficiaryName: 'Ahmed Ali',
          country: 'Nepal',
          icon: images.nepFlag,
        },
      ],
    },
  ];

  const musanedTransferHistoryFilterData = [
    {
      id: '1',
      label: t('MUSANED.LABORER_NAME'),
      type: FiltersType.LABORER_NAME,
      filterValues: [],
    },
    {
      id: '2',
      label: t('MUSANED.SALARY_TYPE'),
      type: FiltersType.SALARY_TYPE,
      filterValues: [],
    },
  ];

  const sendGiftFilterData = [
    {
      id: '1',
      label: t('SEND_GIFT.RECEIVER_NAME'),
      type: FiltersType.CONTACT_NUMBER,
      searchPlaceholder: t('SEND_GIFT.SEARCH_FOR_RECEIVER'),
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

  const salaryTypes: SelectedValue[] = [
    { id: SalaryCategories.Monthly_Salary, text: 'MUSANED.MONTHLY_SALARY' },
    { id: SalaryCategories.Advanced_Salary, text: 'MUSANED.ADVANCED_SALARY' },
    { id: SalaryCategories.Bonus_Salary, text: 'MUSANED.BONUS_SALARY' },
  ];

  const transferHistoryFilterDefaultValues = {
    [FiltersType.BENEFICIARY_NAME]: '',
    [FiltersType.BANK_NAME_LIST]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
    [FiltersType.DELIVERY_TYPE]: '',
  };

  const w2WFilterData = (filterValues) => [
    {
      id: '1',
      label: t('WALLET_TO_WALLET.CONTACT_NUMBER_OR_NAME'),
      type: FiltersType.CONTACT_NUMBER,
      dropdownIcon: icons.user_search,
      editable: true,
      listTitleStyle: { color: colors.natural.natural900 },
      filterValues,
    },
  ];

  const w2WFilterDefaultValues = {
    [FiltersType.CONTACT_NUMBER]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  const sendGiftBottomFilterData = [
    {
      id: '1',
      label: t('SEND_GIFT.STATUS'),
      type: FiltersType.STATUS,
      filterValues: [
        {
          id: '1',
          key: GiftStatus.EXECUTED,
          value: t('SEND_GIFT.OPENED'),
        },
        {
          id: '2',
          key: GiftStatus.INITIATED,
          value: t('SEND_GIFT.UNOPENED'),
        },
        {
          id: '3',
          key: GiftStatus.FAILED,
          value: t('SEND_GIFT.EXPIRED'),
        },
      ],
    },
    {
      id: '2',
      label: t('SEND_GIFT.OCCASION'),
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

  const orderHistoryFilterDefaultValues = {
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };
  const applePayDetails = [
    {
      id: '1',
      label: t('TOP_UP.TOPUP_TYPE'),
      value: t('TOP_UP.APPLE_PAY'),
      icon: icons.apple_pay,
      color: colors.primary.primary800,
    },
    { id: '2', label: t('TOP_UP.TOPUP_DATE'), value: formattedDate, icon: null },
  ];

  const cardPayDetails = [
    {
      id: '1',
      label: t('TOP_UP.TOPUP_TYPE'),
      value: t('TOP_UP.CREDIT_CARD'),
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
      label: t('TOP_UP.REF_NUMBER'),
      value: '21523325',
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    { id: '4', label: t('TOP_UP.TOPUP_DATE'), value: formattedDate, icon: null },
  ];
  const walletPayDetailes = [
    {
      id: '2',
      label: t('TOP_UP.TRANSFER_TO'),
      value: 'Shatha Mohammed', // TODO:replaced by api
      isAlinma: true,
      icon: null,
      leftIcon: icons.master_card,
    },
    {
      id: '3',
      label: t('TOP_UP.TRANSACTION_ID'),
      value: '21523325',
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    { id: '4', label: t('TOP_UP.AMOUNT'), icon: null },
    { id: '1', label: t('TRANSACTION_HISTORY.TRANSFER_REASON'), value: t('TOP_UP.REASON') },
  ];

  const orderDetails = [
    {
      id: '1',
      label: t('ORDER_SCREEN.COUPON_CODE'),
      value: 'FTA35346',
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    { id: '2', label: t('ORDER_SCREEN.PRODUCT_NAME'), value: 'Subscribe on Spotify' },
    {
      id: '3',
      label: t('ORDER_SCREEN.AMOUNT'),
      value: `470 ${t('COMMON.SAR')}`,
    },
    { id: '4', label: t('ORDER_SCREEN.DISCOUNT'), value: '20%' },
    {
      id: '3',
      label: t('ORDER_SCREEN.FEES'),
      value: `0.00 ${t('COMMON.SAR')}`,
    },
    {
      id: '3',
      label: t('ORDER_SCREEN.VAT'),
      value: `00.2 ${t('COMMON.SAR')}`,
    },
    {
      id: '4',
      label: t('ORDER_SCREEN.TOTAL_AMOUNT'),
      value: `250.00 SAR ${t('COMMON.SAR')}`,
    },
    {
      id: '5',
      label: t('ORDER_SCREEN.PURCHASE_DATE'),
      value: '14/03/2024 - 15:30',
    },
  ];
  const allOrders = [
    // TODO: Replaced with api
    {
      id: '1',
      image: images.playstation,
      amount: '740.00',
      title: 'Sony PlayStation Network Gift Card.',
      coupon: t('SHOP.COUPON_CODE'),
      code: 'FTA35346',
      purchase: t('SHOP.PURCHASED_AT'),
      date: formattedDate,
    },
    {
      id: '2',
      image: images.xbox,
      amount: '470.00',
      title: 'Xbox Network Gift Card.',
      coupon: t('SHOP.COUPON_CODE'),
      code: 'FTA35346',
      purchase: t('SHOP.PURCHASED_AT'),
      date: formattedDate,
    },
  ];

  const giftPayDetailes = [
    {
      id: '1',
      label: t('TOP_UP.TRANSFER_TO'),
      value: 'Shatha Mohammed', // TODO:replaced by api
      leftIcon: 'true',
      isAlinma: true,
    },
    { id: '2', label: t('TOP_UP.AMOUNT'), icon: null },
    { id: '3', label: t('TOP_UP.OCCASION'), value: t('TOP_UP.EIYDIAH') },
  ];

  const offerFilterDefaultValues = {
    [FiltersType.OFFER_CATEGORY]: '',
    [FiltersType.OFFER_AVAILABILITY]: '',
  };
  const contactList = [
    // TODO: List will replace by actual data
    { title: t('MENU.CALL_WITHIN_SA'), phone_number: '8004339000' },
    { title: t('MENU.CALL_OUTSIDE_SA'), phone_number: '(+966) 920000670' },
  ];
  const guideStepsToCall = [
    { title: t('ACTIVATE_BENEFICIARY.CALL_FROM_REGISTERED_NUM'), stepNumber: '1', isContactList: true },
    { title: t('ACTIVATE_BENEFICIARY.PRESS_NUMBER_4'), stepNumber: '2', pressNumber: '4' },
    {
      title: t('ACTIVATE_BENEFICIARY.PRESS_NUMBER_1_TO_ACTIVATE'),
      stepNumber: '3',
      pressNumber: '1',
      extraText: t('ACTIVATE_BENEFICIARY.TO_ACTIVATE'),
    },
  ];
  const guideToReceiveCall = [
    { title: t('ACTIVATE_BENEFICIARY.ANSWER_THE_CALL'), stepNumber: '1', isContactList: true },
    {
      title: t('ACTIVATE_BENEFICIARY.PRESS_NUMBER_1_TO_ACTIVATE'),
      stepNumber: '2',
      pressNumber: '1',
      extraText: t('ACTIVATE_BENEFICIARY.TO_ACTIVATE'),
    },
  ];

  const moiServiceProvider = [
    { id: 1, text: t('BILL_PAYMENTS.EXPATRIATE_SERVICES') },
    { id: 2, text: t('BILL_PAYMENTS.DRIVING_LICENSE') },
    { id: 3, text: t('BILL_PAYMENTS.SAUDI_PASSPORT') },
    { id: 4, text: t('BILL_PAYMENTS.TRAFFIC_VIOLATIONS') },
    { id: 5, text: t('BILL_PAYMENTS.MOTOR_VEHICLE') },
    { id: 6, text: t('BILL_PAYMENTS.LABOR_IMPORTATION') },
    { id: 7, text: t('BILL_PAYMENTS.CIVIL_REGISTRATION') },
    { id: 8, text: t('BILL_PAYMENTS.NATIONAL_PLATFORM_FOR_VIOLATION') },
    { id: 9, text: t('BILL_PAYMENTS.DEPORTATION_CONTROL') },
    { id: 10, text: t('BILL_PAYMENTS.CIVIL_DEFENSE_DIRECTORATE') },
    { id: 11, text: t('BILL_PAYMENTS.MOI_PVP') },
  ];

  const moiServiceType = [
    { id: 1, text: t('BILL_PAYMENTS.EXTEND_VISITOR_VISA') },
    { id: 2, text: t('BILL_PAYMENTS.RENEW_IQAMAH') },
    { id: 3, text: t('BILL_PAYMENTS.ISSUE_EXIT_RE_ENTRY_VISIT_SINGLE') },
    { id: 4, text: t('BILL_PAYMENTS.VISA_CANCELLATION') },
    { id: 5, text: t('BILL_PAYMENTS.TRANSFER_OF_SPONSORSHIP') },
    { id: 6, text: t('BILL_PAYMENTS.REPLACE_IQAMAH') },
    { id: 7, text: t('BILL_PAYMENTS.TRANSFER_DEPENDENT_TO_BE_HEAD_OF_HOUSEHOLD') },
    { id: 8, text: t('BILL_PAYMENTS.CHANGE_OF_OCCUPATION') },
    { id: 9, text: t('BILL_PAYMENTS.ISSUE_EXIT_RE_ENTRY_VISIT_SINGLE') },
    { id: 10, text: t('BILL_PAYMENTS.VISA_CANCELLATION') },
    { id: 11, text: t('BILL_PAYMENTS.TRANSFER_OF_SPONSORSHIP') },
  ];

  const idTypes = [
    { id: 1, text: t('BILL_PAYMENTS.IQAMA_ID') },
    { id: 2, text: t('BILL_PAYMENTS.NATIONAL_ID_NUMBER') },
  ];

  const moiPaymentDuration = [
    { id: 1, text: t('BILL_PAYMENTS.TWELVE_MONTHS') },
    { id: 2, text: t('BILL_PAYMENTS.TWENTY_FOUR_MONTHS') },
    { id: 3, text: t('BILL_PAYMENTS.THIRTY_SIX_MONTHS') },
  ];
  const billPaymentDetails = [
    {
      id: '2',
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: 'Electricity Bill',
    },
    {
      id: '3',
      label: t('PAY_BILL.ACCOUNT_NUMBER'),
      value: 'AZ00876',
    },
    {
      id: '4',
      label: t('COMMON.DATE'),
      value: '14/03/2024',
    },
    {
      id: '5',
      label: t('COMMON.REF_NUM'),
      value: 'FTA35346',
      icon: icons.copy,
    },
  ];

  const billHeaderDetail = {
    // TODO wiill be replaced by API
    title: 'My Electricity Bill',
    companyDetails: '123 - Saudi electricity co.',
    companyImage: images.electricityBill,
  };

  const billSaveDetails = [
    {
      id: '1',
      label: t('TRANSACTION_HISTORY.AMOUNT'),
      value: `300 ${t('COMMON.SAR')}`,
    },
    {
      id: '2',
      label: t('COMMON.DUE_DATE'),
      value: '05/08/2024',
    },
  ];
  const activeBillDetails = [
    {
      id: '1',
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: 'Electricity Bill',
    },
    {
      id: '2',
      label: t('PAY_BILL.ACCOUNT_NUMBER'),
      value: 'AZ00876',
    },
    {
      id: '3',
      label: t('COMMON.DUE_DATE'),
      value: '14/03/2024',
    },
    {
      id: '4',
      label: t('TOP_UP.AMOUNT'),
      value: '300 SAR',
    },
  ];

  const requestMoneyFilterData = [
    {
      id: '1',
      label: t('SEND_GIFT.RECEIVER_NAME'),
      type: FiltersType.CONTACT_NUMBER,
      searchPlaceholder: t('SEND_GIFT.SEARCH_FOR_RECEIVER'),
      icon: icons.user1,
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

  const requestMoneyBottomFilterData = [
    {
      id: '1',
      label: t('COMMON.STATUS'),
      type: FiltersType.STATUS,
      isRequired: false,
      filterValues: [
        {
          id: '1',
          key: MoneyRequestStatus.CANCEL,
          value: t('REQUEST_MONEY.CANCEL'),
        },
        {
          id: '2',
          key: MoneyRequestStatus.PAID,
          value: t('REQUEST_MONEY.PAID'),
        },
        {
          id: '3',
          key: MoneyRequestStatus.PENDING,
          value: t('REQUEST_MONEY.PENDING'),
        },
        {
          id: '3',
          key: MoneyRequestStatus.REJECTED,
          value: t('REQUEST_MONEY.REJECTED'),
        },
      ],
    },
  ];

  const requestMoneySuccess = [
    {
      isAlinma: true,
      leftIcon: true,
      id: '1',
      label: t('REQUEST_SUMMARY.FROM'),
      value: 'Ahmed Mohammed',
    },
    {
      id: '2',
      label: t('REQUEST_SUMMARY.AMOUNT'),
      value: `${3000} ${t('COMMON.SAR')}`,
    },
  ];
  const requestMoneySummary = [
    {
      isAlinma: true,
      leftIcon: true,
      id: '1',
      label: t('REQUEST_SUMMARY.FROM'),
      value: 'Ahmed Mohammed',
    },
    {
      id: '2',
      label: t('REQUEST_SUMMARY.AMOUNT'),
      value: `${3000} ${t('COMMON.SAR')}`,
    },
    {
      id: '4',
      label: t('REQUEST_SUMMARY.NOTE'),
      value: t('TRANSFER_SUMMARY.NOTE_DETAIL'),
    },
  ];
  const requestMoneySummaryNon = [
    {
      id: '1',
      label: t('TRANSFER_SUMMARY.TRANSFER_TO'),
      value: 'Esra’ Alturk', // TODO: replace with api data
      isAlinma: false,
      leftIcon: true,
    },
    { id: '2', label: t('TRANSFER_SUMMARY.AMOUNT'), value: t('TRANSFER_SUMMARY.AMOUNT_2') },
  ];

  const requestAccepted = [
    {
      id: '1',
      label: t('REQUEST_SUMMARY.PAY_TO'),
      value: 'Ahmed Mohammed', // TODO: replace with api data
      isAlinma: true,
      leftIcon: true,
    },
    {
      id: '2',
      label: t('REQUEST_SUMMARY.MOBILE_NUMBER'),
      value: '0503340494',
    },
    {
      id: '3',
      label: t('COMMON.REF_NUM'),
      value: 'FTA35346',
      icon: icons.copy,
    },
  ];
  const requestMoneyFilterDefaultValues = {
    [FiltersType.CONTACT_NUMBER]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
    [FiltersType.STATUS]: '',
  };
  const otpConfig = {
    login: { otpTimeout: 60 },
    forgetPasscode: { otpTimeout: 60 },
    transaction: { otpTimeout: 120 },
    akhtrPoints: { otpTimeout: 60 },
  };

  const allCategories = [
    // TODO: Replaced with api
    {
      id: '1',
      title: t('SHOP.PLAYSTATION'),
      image: images.playStation,
    },
    {
      id: '2',
      image: images.food,
      title: t('SHOP.FOOD'),
    },
    {
      id: '3',
      image: images.entertainment,
      title: t('SHOP.ENTERTAINMENT'),
    },
    {
      id: '4',
      image: images.shopping,
      title: t('SHOP.SHOPPING'),
    },
    {
      id: '5',
      image: images.telecom,
      title: t('SHOP.TELECOM'),
    },

    {
      id: '6',
      image: images.googlePlay,
      title: t('SHOP.GOOGLE'),
    },

    {
      id: '7',
      image: images.onlineGames,
      title: t('SHOP.GAMES'),
    },
    {
      id: '8',
      image: images.onlineStore,
      title: t('SHOP.STORE'),
    },
    {
      id: '1',
      image: images.transportation,
      title: t('SHOP.TRANSPORTATION'),
    },

    {
      id: '1',
      image: images.xbox,
      title: t('SHOP.XBOX'),
    },
    {
      id: '1',
      image: images.itunes,
      title: t('SHOP.ITUNES'),
    },
  ];
  const sortingData = [
    { id: 1, text: t('SHOP.HIGH_TO_LOW') },
    { id: 2, text: t('SHOP.LOW_TO_HIGH') },
  ];

  const offerDetailData = [
    {
      image: images.spotifyCard,
      background: colors.backgrounds.greenish,
    },
    {
      image: images.spotifyCard,
      background: colors.backgrounds.greenish,
    },
  ];

  const productDetailData = [
    {
      image: images.spotifyCard,
      background: colors.natural.natural0,
    },
    {
      image: images.spotifyCard,
      background: colors.natural.natural0,
    },
  ];
  const shopsOffers = [
    {
      id: '1',
      image: images.spotifyCard,
      title: 'SAR 20 Offer',
      description: 'Spotify Network Gift Card.',
    },
    {
      id: '2',
      image: images.spotifyCard,
      title: 'SAR 20 Offer',
      description: 'Spotify Network Gift Card.',
    },
  ];

  const contactusList = [
    { title: t('MENU.CALL_WITHIN_SA'), phone_number: '(+966)8004339000' },
    { title: t('MENU.CALL_OUTSIDE_SA'), phone_number: '(+966)920000670' },
  ];

  return {
    transferTypesData,
    billPayDetailsRefundData,
    billPaymentDetails,
    billHeaderDetail,
    transferReasonData,
    requestMoneySummaryNon,
    requestAccepted,
    giftPayDetailes,
    walletPayDetailes,
    transactionHistoryFilterData,
    transactionHistoryFilterDataWithoudCard,
    transactionHistoryFilterDefaultValues,
    transactionHistoryFilterDefaultValuesWithoudCard,
    sendGiftFilterData,
    sendGiftFilterDefaultValues,
    sendGiftBottomFilterData,
    alinmaDetails,
    nonAlinmaDetails,
    contactList,
    guideStepsToCall,
    requestMoneySuccess,
    guideToReceiveCall,
    notificationRequestFilters,
    sadadBillsCompanyData,
    sadadServiceTypeData,
    billPayDetailsData,
    applePayDetails,
    cardPayDetails,
    offerFilterData,
    requestMoneyData,
    offerFilterDefaultValues,
    requestSummaryData,
    receviedRequestMoneyData,
    sendRequestMoneyData,
    moiServiceProvider,
    moiServiceType,
    idTypes,
    moiPaymentDuration,
    declinedTransationData,
    transferHistoryFilterData,
    transferHistoryFilterDefaultValues,
    alinmaDetailsUnsaved1,
    alinmaDetailsUnsaved2,
    billSaveDetails,
    internationalTransferHistoryFilterData,
    requestMoneyFilterData,
    requestMoneyBottomFilterData,
    sendMoneyDetails,
    requestMoneySummary,
    requestMoneyFilterDefaultValues,
    otpConfig,
    allCategories,
    orderDetails,
    playstationData,
    orderHistoryFilterDefaultValues,
    allOrders,
    merchantData,
    sortingData,
    playStationPrices,
    orderSummaryData,
    offerDetailData,
    productDetailData,
    shopsOffers,
    w2WFilterData,
    w2WFilterDefaultValues,
    contactusList,
    alinmaDirectData,
    westernUnionData,
    activeBillDetails,
    localTransferReasonData,
    musanedTransferHistoryFilterData,
    salaryTypes,
  };
};

export default useConstantData;

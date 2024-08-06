import icons from '@app/assets/icons';
import images from '@app/assets/images';
import GiftStatus from '@app/enums/gift-status';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { FiltersType } from '@app/utilities/enums.util';

const useConstantData = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const date = new Date();
  const formattedDate = formatDateAndTime(date, dateTimeFormat.DateAndTime);

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
    [FiltersType.CARD]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  const OrderHistoryFilterDefaultValues = {
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
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
      isAlinma: true,
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

  const orderDetails = [
    { id: '1', label: localizationText.ORDER_SCREEN.COUPON_CODE, value: 'FTA35346', icon: icons.copy },
    { id: '2', label: localizationText.ORDER_SCREEN.PRODUCT_NAME, value: 'Subscribe on Spotify' },
    {
      id: '3',
      label: localizationText.ORDER_SCREEN.AMOUNT,
      value: `470 ${localizationText.COMMON.SAR}`,
    },
    { id: '4', label: localizationText.ORDER_SCREEN.DISCOUNT, value: '20%' },
    {
      id: '3',
      label: localizationText.ORDER_SCREEN.FEES,
      value: `0.00 ${localizationText.COMMON.SAR}`,
    },
    {
      id: '3',
      label: localizationText.ORDER_SCREEN.VAT,
      value: `00.2 ${localizationText.COMMON.SAR}`,
    },
  ];
  const allOrders = [
    //TODO: Replaced with api
    {
      id: '1',
      image: images.playstation,
      amount: '740.00',
      title: 'Sony PlayStation Network Gift Card.',
      coupon: localizationText.SHOP.COUPON_CODE,
      code: 'FTA35346',
      purchase: localizationText.SHOP.PURCHASED_AT,
      date: formattedDate,
    },
    {
      id: '2',
      image: images.xbox,
      amount: '470.00',
      title: 'Xbox Network Gift Card.',
      coupon: localizationText.SHOP.COUPON_CODE,
      code: 'FTA35346',
      purchase: localizationText.SHOP.PURCHASED_AT,
      date: formattedDate,
    },
  ];

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

  const allCategories = [
    //TODO: Replaced with api
    {
      id: '1',
      image: images.playStatuon,
      title: localizationText.SHOP.PLAYSTATION,
    },
    {
      id: '2',
      image: images.food,
      title: localizationText.SHOP.FOOD,
    },
    {
      id: '3',
      image: images.entertainment,
      title: localizationText.SHOP.ENTERTAINMENT,
    },
    {
      id: '4',
      image: images.shopping,
      title: localizationText.SHOP.SHOPPING,
    },
    {
      id: '5',
      image: images.telecom,
      title: localizationText.SHOP.TELECOM,
    },

    {
      id: '6',
      image: images.googlePlay,
      title: localizationText.SHOP.GOOGLE,
    },

    {
      id: '7',
      image: images.onlineGames,
      title: localizationText.SHOP.GAMES,
    },
    {
      id: '8',
      image: images.onlineStore,
      title: localizationText.SHOP.STORE,
    },
    {
      id: '1',
      image: images.transportation,
      title: localizationText.SHOP.TRANSPORTATION,
    },

    {
      id: '1',
      image: images.xbox,
      title: localizationText.SHOP.XBOX,
    },
    {
      id: '1',
      image: images.itunes,
      title: localizationText.SHOP.ITUNES,
    },
  ];
  const sortingData = [
    { id: 1, text: localizationText.SHOP.HIGH_TO_LOW },
    { id: 2, text: localizationText.SHOP.LOW_TO_HIGH },
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

  return {
    transferReasonData,
    allCategories,
    giftPayDetailes,
    orderDetails,
    walletPayDetailes,
    transactionHistoryFilterData,
    playstationData,
    transactionHistoryFilterDefaultValues,
    applePayDetails,
    cardPayDetails,
    OrderHistoryFilterDefaultValues,
    giftData,
    allOrders,
    merchantData,
    requestSummaryData,
    sortingData,
    playStationPrices,
    orderSummaryData,
    shopsOffers,
  };
};

export default useConstantData;

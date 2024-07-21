import useLocalization from '@app/localization/hooks/localization.hook';
import { FiltersType } from '@app/utilities/enums.util';

const useConstantData = () => {
  const localizationText = useLocalization();

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

  const transactionHistoryFilterDefaultValues = {
    [FiltersType.TRANSACTION_TYPE]: '',
    [FiltersType.CARD]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  const offerFilterDefaultValues = {
    [FiltersType.OFFER_CATEGORY]: '',
    [FiltersType.OFFER_AVAILABILITY]: '',
  };
  return {
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    offerFilterData,
    offerFilterDefaultValues,
  };
};

export default useConstantData;

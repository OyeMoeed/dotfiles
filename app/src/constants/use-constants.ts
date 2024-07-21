import icons from '@app/assets/icons';
import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';
import { FiltersType, TransactionHistoryFilter } from '@app/utilities/enums.util';

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

  const transactionHistoryFilterData: TransactionHistoryFilter[] = [
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

  const transferHistoryFilterData: TransactionHistoryFilter[] = [
    {
      id: '1',
      label: localizationText.LOCAL_TRANSFER.BENEFICIARY_NAME,
      type: FiltersType.BENEFICIARY_NAME_LIST,
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
      label: localizationText.TRANSACTION_HISTORY.BANK_NAME,
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

  const transferHistoryFilterDefaultValues = {
    [FiltersType.BENEFICIARY_NAME_LIST]: '',
    [FiltersType.BANK_NAME_LIST]: '',
    [FiltersType.AMOUNT_FROM]: '',
    [FiltersType.AMOUNT_TO]: '',
    [FiltersType.DATE_TO]: '',
    [FiltersType.DATE_FROM]: '',
  };

  return {
    transferReasonData,
    transactionHistoryFilterData,
    transactionHistoryFilterDefaultValues,
    transferHistoryFilterData,
    transferHistoryFilterDefaultValues,
  };
};

export default useConstantData;

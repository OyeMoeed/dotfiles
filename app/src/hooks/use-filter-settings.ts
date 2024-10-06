import { useState, useEffect, useCallback, useMemo } from 'react';
import { getTransactionTypes } from '@app/network/services/core/transaction/transactions.service';
import { ApiResponseStatusType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import useConstantData from '@app/constants/use-constants';
import { useTypedSelector } from '@app/store/store';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';

const useFilterSettings = (
  showTypeFilter?: boolean,
  showContactsFilter?: boolean,
  contacts?: any,
  showCardFilter?: boolean,
  showBeneficiaryFilter?: boolean,
  showGiftFilters?: boolean,
) => {
  const [transactionTypes, setTransactionTypes] = useState<ListItem[]>([]);
  const [beneficiaryData, setBeneficiaryData] = useState<ListItem[]>([]);
  const [bankList, setBankList] = useState<ListItem[]>([]);
  // // Todo: replace dummy data with real
  const { sendGiftBottomFilterData } = useConstantData();
  const giftStatus = sendGiftBottomFilterData[0].filterValues;
  const giftOccasion = sendGiftBottomFilterData[1].filterValues;

  const [isCardFilterVisible, setIsCardFilterVisible] = useState<boolean | undefined>(false);

  const cards = useTypedSelector((state) => state.cardsReducer.cards);

  const mappedCards = useMemo(
    () =>
      cards?.map((card: CardInterface) => ({
        id: card.cardIndex,
        key: card.cardIndex,
        value: card?.maskedCardNumber || '',
      })),
    [cards],
  );

  const handleSelectType = (selectedItem: string) => {
    if (showCardFilter && cards) {
      const CARD_TYPES = [
        'CIN_VISA_CASHBACK',
        'PAY_VCARD_POS_MADA',
        'PAY_VCARD_POS',
        'PAY_VCARD_POS_VISA',
        'PAY_VCARD_POS_NAQD_MADA',
        'PAY_VCARD_POS_NAQD_VISA',
        'PAY_VCARD_POS_NAQD',
        'PAY_VCARD_ECOM_MADA',
        'PAY_VCARD_ECOM_VISA',
      ];
      const foundItem: any = CARD_TYPES.find((cardType: string) => cardType === selectedItem) || null;
      setIsCardFilterVisible(!!foundItem);
    }
  };

  const onContactsList = useCallback(() => {
    if (showContactsFilter || showGiftFilters) {
      return contacts?.map((item: any, index: any) => ({
        id: index,
        key: item?.phoneNumbers[0]?.number,
        displayValue: item?.givenName,
        value: item?.phoneNumbers[0]?.number,
        description: item?.phoneNumbers[0]?.number,
      }));
    }
    return undefined;
  }, [contacts, showContactsFilter, showGiftFilters]);

  const mappedContacts = useMemo(() => onContactsList(), [onContactsList]);

  const getBeneficiariesData = async () => {
    const apiResponse: LocalTransferBeneficiariesMockProps | undefined = await getlocalTransferBeneficiaries();
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const beneficiaries = apiResponse?.response?.beneficiaries;
      if (beneficiaries?.length) {
        const beneficiariesData: ListItem[] = beneficiaries?.map((beneficiary: any) => ({
          id: beneficiary?.beneficiaryCode,
          key: beneficiary?.fullName,
          value: beneficiary?.fullName,
        }));
        setBeneficiaryData(beneficiariesData);
      }
    }
  };

  const getBankList = async () => {
    const apiResponse: LocalBeneficiaryMetaMockProps | undefined = await getlocalBeneficiaryMetaData();
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const banksList = apiResponse?.response?.localBanks;
      const banksData: ListItem[] = banksList?.map((bank: any) => ({
        key: bank?.code,
        value: bank?.desc,
        image: bank?.code,
      }));
      setBankList(banksData);
    }
  };

  const getTransactionTypesData = async () => {
    const apiResponse: any = await getTransactionTypes({ hideSpinner: false });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const transactionTypesRes = apiResponse?.response?.transactionRequestTypeRecs;
      if (transactionTypesRes?.length) {
        const types: ListItem[] = transactionTypesRes?.map((transactionType: any, index: number) => ({
          id: index,
          key: transactionType?.transactionRequestType,
          value: transactionType?.defaultDescEn,
        }));
        setTransactionTypes(types);
      }
    }
  };

  const prepareData = async () => {
    if (showTypeFilter) await getTransactionTypesData();
    if (showBeneficiaryFilter) {
      await getBeneficiariesData();
      await getBankList();
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  return {
    mappedContacts,
    mappedCards,
    transactionTypes,
    beneficiaryData,
    bankList,
    giftStatus,
    giftOccasion,
    isCardFilterVisible,
    setIsCardFilterVisible,
    handleSelectType,
  };
};

export default useFilterSettings;

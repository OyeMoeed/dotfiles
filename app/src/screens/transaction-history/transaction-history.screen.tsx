import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPaySpinner, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayFilterBottomSheet, IPayShortHandAtmCard } from '@app/components/organism';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { FilterFormDataProp, TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getTransactionTypes, getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType, FiltersType, spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { heightMapping } from '../../components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import IPayTransactionItem from './component/ipay-transaction.component';
import { IPayTransactionItemProps } from './component/ipay-transaction.interface';
import FiltersArrayProps from './transaction-history.interface';
import transactionsStyles from './transaction-history.style';

const TransactionHistoryScreen: React.FC = ({ route }: any) => {
  const { isW2WTransactions, isShowTabs = false, currentCard, cards, contacts, isShowAmount = true } = route.params;
  const { transactionHistoryFilterDefaultValues, W2WFilterData, W2WFilterDefaultValues } = useConstantData();
  const { colors } = useTheme();
  const styles = transactionsStyles(colors);
  const localizationText = useLocalization();
  const TRANSACTION_TABS = [
    localizationText.TRANSACTION_HISTORY.SEND_MONEY,
    localizationText.TRANSACTION_HISTORY.RECEIVED_MONEY,
  ];

  const [filters, setFilters] = useState<Array<string>>([]);
  const transactionRef = React.createRef<any>();
  const filterRef = useRef<bottomSheetTypes>(null);
  const [transaction, setTransaction] = useState<IPayTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [appliedFilters, setAppliedFilters] = useState<SubmitEvent | null>(null);
  const [filteredData, setFilteredData] = useState<IPayTransactionItemProps[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TRANSACTION_TABS[0]);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setIsLoadingW2W] = useState<boolean>(false);
  const [noFilterResult, setNoFilterResult] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<IPayTransactionItemProps[]>([]);
  const [transactionHistoryFilterData, setTransactionHistoryFilterData] = useState<any[]>();
  const [selectedCard, setSelectedCard] = useState<any>(currentCard);

  const openBottomSheet = (item: IPayTransactionItemProps) => {
    let calculatedSnapPoint = ['1%', '70%', isAndroidOS ? '95%' : '100%'];
    if (heightMapping[item.transactionRequestType]) {
      calculatedSnapPoint = ['1%', heightMapping[item.transactionRequestType], isAndroidOS ? '95%' : '100%'];
    }
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    transactionRef.current?.present();
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  useEffect(() => {
    setFilteredData(transactionsData);
  }, [transactionsData]);

  // Function to apply filters dynamically

  const getCardInfo = (card: string) => {
    if (cards?.length) {
      const foundCard = cards.find((item: CardInterface) => item?.maskedCardNumber === card);
      return foundCard;
    }
    return '';
  };

  const getTrxReqTypeCode = (trxTypeName: string) => {
    if (transactionHistoryFilterData) {
      const foundReqType = transactionHistoryFilterData[0]?.filterValues?.find(
        (type: any) => type?.value === trxTypeName,
      );
      return foundReqType?.key;
    }
    return '';
  };

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const getTransactionsData = async (filtersData?: any) => {
    renderSpinner(true);
    setIsLoading(true);
    try {
      const payload: TransactionsProp = {
        walletNumber,
        maxRecords: '50',
        offset: '1',
        fromDate: filtersData ? filtersData.dateFrom?.replaceAll('/', '-') : '',
        toDate: filtersData ? filtersData.dateTo?.replaceAll('/', '-') : '',
        cardIndex: selectedCard ? selectedCard?.cardIndex : '',
        trxReqType: filtersData ? getTrxReqTypeCode(filtersData.transaction_type) : '',
      };

      const apiResponse: any = await getTransactions(payload);

      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          if (apiResponse?.response?.transactions?.length) {
            setTransactionsData(apiResponse?.response?.transactions);
          } else {
            setTransactionsData([]);
            setNoFilterResult(true);
          }
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      setIsLoading(false);
      renderSpinner(false);
    } catch (error: any) {
      setIsLoading(false);
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const applyFilters = (filtersArray: FiltersArrayProps) => {
    setNoFilterResult(false);
    getTransactionsData(filtersArray);
  };

  const getW2WTransactionsData = async (trxType: 'DR' | 'CR', filterData?: FilterFormDataProp) => {
    renderSpinner(true);
    setIsLoadingW2W(true);
    setTransactionsData([]);
    setFilteredData([]);
    try {
      const payload: TransactionsProp = {
        walletNumber,
        maxRecords: '100',
        offset: '1',
        trxReqType: 'PAY_WALLET',
        trxType,
        fromDate: filterData?.dateFrom ? moment(filterData?.dateFrom, 'DD/MM/YYYY').format('DD-MM-YYYY') : '',
        toDate: filterData?.dateTo ? moment(filterData?.dateTo, 'DD/MM/YYYY').format('DD-MM-YYYY') : '',
        fromAmount: filterData?.amountFrom,
        toAmount: filterData?.amountTo,
      };
      const apiResponse: any = await getTransactions(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setTransactionsData(apiResponse?.response?.transactions);
          setFilteredData(apiResponse?.response?.transactions);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      setIsLoadingW2W(false);
      renderSpinner(false);
    } catch (error: any) {
      setIsLoadingW2W(false);
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const handleSubmit = (data: any) => {
    let filtersArray: any[] | ((prevState: string[]) => string[]) = [];
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR', data);
    } else if (Object.keys(data)?.length) {
      const transactionType = data?.transaction_type;
      const dateRange = data?.dateFrom || data?.dateTo ? `${data?.dateFrom} - ${data?.dateTo}` : '';
      const card = data?.card;
      const amountRange = data?.amount_from || data?.amount_to ? `${data?.amount_from} - ${data?.amount_to}` : '';

      if (amountRange) filtersArray.push(amountRange);

      if (transactionType) filtersArray.push(transactionType);

      if (dateRange) filtersArray.push(dateRange);

      if (card) {
        const cardInfo = getCardInfo(card);
        if (cardInfo) setSelectedCard(cardInfo);
      }
    } else {
      filtersArray = [];
    }

    setAppliedFilters(data);
    setFilters(filtersArray);

    if (!isW2WTransactions) {
      applyFilters(data);
    }
  };

  const handleFiltersShow = () => {
    filterRef.current?.showFilters();
  };

  const removeFilter = (filter: string, allFilters: FiltersArrayProps) => {
    const deletedFilter = filters.filter((value) => value !== filter);

    let updatedFilters = { ...allFilters };

    const isDateRange = filter.includes('-') && !filter.includes('SAR');

    if (isDateRange) {
      updatedFilters = {
        ...updatedFilters,
        dateFrom: '',
        dateTo: '',
      };
    } else if (allFilters.transaction_type === filter) {
      updatedFilters = {
        ...updatedFilters,
        transactionType: '',
      };
    }

    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
    setFilters(deletedFilter);
  };

  const onPressClose = (text: string) => {
    if (filters.length > 0) {
      removeFilter(text, appliedFilters);
    } else {
      setFilteredData(transactionsData);
    }
  };
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const mapFiltersTypes = (transactionTypesRes: []) => {
    let transactionTypesResMap: any = [];
    if (transactionTypesRes?.length) {
      transactionTypesResMap = transactionTypesRes?.map((transactionType: any, index: number) => ({
        id: index,
        key: transactionType?.transactionRequestType,
        value: transactionType?.defaultDescEn,
      }));
    }

    const filtersTransaction = [];

    filtersTransaction.push({
      id: '1',
      label: localizationText.TRANSACTION_HISTORY.TRANSACTION_TYPE,
      type: FiltersType.TRANSACTION_TYPE,
      filterValues: transactionTypesResMap,
    });

    if (selectedCard && cards?.length) {
      const cardsFilterMap = cards.map((card: CardInterface) => ({
        id: card.cardIndex,
        key: card.cardIndex,
        value: card?.maskedCardNumber,
      }));
      filtersTransaction.push({
        id: '2',
        label: localizationText.TRANSACTION_HISTORY.CARD,
        type: FiltersType.CARD,
        filterValues: cardsFilterMap,
      });
    }

    return filters;
  };

  const getTransactionTypesData = async () => {
    renderSpinner(true);
    const apiResponse: any = await getTransactionTypes();

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      setTransactionHistoryFilterData(mapFiltersTypes(apiResponse?.response?.transactionRequestTypeRecs));
    }

    renderSpinner(false);
  };

  useEffect(() => {
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR');
    } else if (isShowTabs) {
      applyFilters({ transactionType: selectedTab });
    }
  }, [selectedTab]);

  useEffect(() => {
    setNoFilterResult(false);
    if (isW2WTransactions) {
      setTransactionHistoryFilterData([]);
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR');
    } else {
      getTransactionTypesData();
      getTransactionsData();
    }

    return () => setNoFilterResult(false);
  }, []);

  const onContactsList = (contactsList: []) =>
    contactsList?.map((item: any, index) => ({
      id: index,
      key: index,
      displayValue: item?.displayName,
      value: item?.phoneNumbers[0]?.number,
      description: item?.phoneNumbers[0]?.number,
      heading: localizationText.WALLET_TO_WALLET.CONTACT_NAME,
    }));

  const selectedFilterData = isW2WTransactions ? W2WFilterData(onContactsList(contacts)) : transactionHistoryFilterData;

  const renderTrxsList = () => (
    <IPayView>
      <IPayFlatlist
        data={filteredData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <IPayTransactionItem transaction={item} onPressTransaction={openBottomSheet} />}
      />
    </IPayView>
  );

  const renderNoResult = () =>
    noFilterResult ? (
      <IPayNoResult
        textColor={colors.primary.primary800}
        message={localizationText.TRANSACTION_HISTORY.NO_TRANSACTIONS_RESULT_FOUND}
      />
    ) : (
      <IPayNoResult
        textColor={colors.primary.primary800}
        message={localizationText.TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY}
      />
    );

  const renderLoadingWithNoResult = () => (isLoading ? <IPaySpinner hasBackgroundColor={false} /> : renderNoResult());

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={localizationText.COMMON.TRANSACTIONS_HISTORY}
        applyFlex
        rightComponent={
          <IPayPressable onPress={() => handleFiltersShow()}>
            <IPayIcon
              icon={filters.length ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filters.length ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />

      {/* {currentCard && (
        <IPayView style={styles.cardContainerStyleParent}>
          <IPayCardDetailsBannerComponent
            cardType={currentCard.cardType}
            cardTypeName={currentCard.cardHeaderText}
            carHolderName={currentCard.name}
            cardLastFourDigit={currentCard.cardNumber}
          />
        </IPayView>
      )} */}
      {selectedCard && <IPayShortHandAtmCard cardData={selectedCard} />}

      {!!filters.length && (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((text) => (
              <IPayChip
                key={text}
                containerStyle={styles.chipContainer}
                headingStyles={styles.chipHeading}
                textValue={text}
                icon={
                  <IPayPressable onPress={() => onPressClose(text)}>
                    <IPayIcon icon={icons.CLOSE_SQUARE} size={16} color={colors.secondary.secondary500} />
                  </IPayPressable>
                }
              />
            ))}
          </IPayScrollView>
        </IPayView>
      )}
      {isShowTabs && (
        <IPaySegmentedControls
          onSelect={handleSelectedTab}
          selectedTab={selectedTab}
          tabs={TRANSACTION_TABS}
          customStyles={styles.tabs}
          unselectedTabStyle={styles.unselectedTab}
        />
      )}
      <IPayView style={styles.listContainer}>
        {filteredData && filteredData.length ? renderTrxsList() : renderLoadingWithNoResult()}
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={snapPoint}
        ref={transactionRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayTransactionHistory transaction={transaction} onCloseBottomSheet={closeBottomSheet} />
      </IPayBottomSheet>
      {selectedFilterData && (
        <IPayFilterBottomSheet
          heading={localizationText.TRANSACTION_HISTORY.FILTER}
          defaultValues={isW2WTransactions ? W2WFilterDefaultValues : transactionHistoryFilterDefaultValues}
          showAmountFilter={isShowAmount}
          showDateFilter
          ref={filterRef}
          onSubmit={handleSubmit}
          filters={selectedFilterData}
        />
      )}
      <IPayAlert
        icon={<IPayIcon icon={icons.clipboard_close} size={64} />}
        visible={noFilterResult}
        closeOnTouchOutside
        animationType="fade"
        showIcon={false}
        title={localizationText.TRANSACTION_HISTORY.NO_RESULTS}
        onClose={() => {
          setNoFilterResult(false);
        }}
        message={localizationText.TRANSACTION_HISTORY.NO_RESULTS_DETAIL}
        primaryAction={{
          text: localizationText.TRANSACTION_HISTORY.GOT_IT,
          onPress: () => {
            setNoFilterResult(false);
          },
        }}
      />
    </IPaySafeAreaView>
  );
};

export default TransactionHistoryScreen;

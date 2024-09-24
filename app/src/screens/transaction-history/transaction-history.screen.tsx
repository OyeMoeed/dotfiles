import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPaySpinner, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayFilterTransactions, IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { FilterFormDataProp, TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { heightMapping } from '../../components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import IPayTransactionItem from './component/ipay-transaction.component';
import { IPayTransactionItemProps } from './component/ipay-transaction.interface';
import FiltersArrayProps from './transaction-history.interface';
import transactionsStyles from './transaction-history.style';

const TransactionHistoryScreen: React.FC = ({ route }: any) => {
  const {
    isW2WTransactions,
    isShowTabs = false,
    currentCard,
    cards,
    contacts,
    isShowCard = false,
    isShowAmount = true,
  } = route.params;
  const { transactionHistoryFilterDefaultValues, w2WFilterData, w2WFilterDefaultValues } = useConstantData();
  const { colors } = useTheme();
  const styles = transactionsStyles(colors);
  const { t } = useTranslation();
  const TRANSACTION_TABS = [t('TRANSACTION_HISTORY.SEND_MONEY'), t('TRANSACTION_HISTORY.RECEIVED_MONEY')];

  const cardLastFourDigit = isShowCard && currentCard?.maskedCardNumber.slice(-4);

  const [filterTags, setFilterTags] = useState<Map<any, any>>();
  const transactionRef = React.createRef<any>();
  const filterRef = useRef<bottomSheetTypes>(null);
  const [transaction, setTransaction] = useState<IPayTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [appliedFilters, setAppliedFilters] = useState<FiltersArrayProps | null>(null);
  const [filteredData, setFilteredData] = useState<IPayTransactionItemProps[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TRANSACTION_TABS[0]);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setIsLoadingW2W] = useState<boolean>(false);
  const [noFilterResult, setNoFilterResult] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<IPayTransactionItemProps[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(currentCard);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState<boolean>(false);

  const headerTitle = currentCard ? 'CARDS.CARD_TRANSACTIONS_HISTORY' : 'COMMON.TRANSACTIONS_HISTORY';

  const mappedCards = useMemo(
    () =>
      cards?.map((card: CardInterface) => ({
        id: card.cardIndex,
        key: card.cardIndex,
        value: card?.maskedCardNumber || '',
      })),
    [cards],
  );

  const onContactsList = useCallback(
    () =>
      contacts?.map((item: any, index: any) => ({
        id: index,
        key: index,
        displayValue: item?.givenName,
        value: item?.phoneNumbers[0]?.number,
        description: item?.phoneNumbers[0]?.number,
        heading: t('WALLET_TO_WALLET.CONTACT_NAME'),
      })),
    [contacts, t],
  );

  const mappedContacts = useMemo(() => onContactsList(), [onContactsList]);

  const selectedFilterData = isW2WTransactions
    ? w2WFilterData(onContactsList())
    : transactionHistoryFilterDefaultValues;

  const getTransactionsData = async (filtersData?: any) => {
    setIsLoading(true);

    let cardIndex = '';
    if (currentCard) {
      cardIndex = currentCard.cardIndex;
    } else if (filtersData?.card && filtersData?.card?.length > 0) {
      cardIndex = filtersData?.card;
    }

    const payload: TransactionsProp = {
      walletNumber,
      maxRecords: '50',
      offset: '1',
      fromDate: filtersData ? filtersData.dateFrom?.replaceAll('/', '-') : '',
      toDate: filtersData ? filtersData.dateTo?.replaceAll('/', '-') : '',
      cardIndex,
      trxReqType: filtersData ? filtersData?.transactionType : '',
      fromAmount: filtersData ? filtersData?.amountFrom : '',
      toAmount: filtersData ? filtersData?.amountTo : '',
    };

    const apiResponse: any = await getTransactions(payload);

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      if (apiResponse?.response?.transactions?.length) {
        setTransactionsData(apiResponse?.response?.transactions);
      } else {
        setTransactionsData([]);
        setNoFilterResult(true);
      }
    }
    setIsLoading(false);
  };

  const getW2WTransactionsData = async (trxType: 'DR' | 'CR', filterData?: FilterFormDataProp) => {
    setIsLoadingW2W(true);
    setTransactionsData([]);
    setFilteredData([]);

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
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      setTransactionsData(apiResponse?.response?.transactions);
      setFilteredData(apiResponse?.response?.transactions);
    }

    setIsLoadingW2W(false);
  };

  const applyFilters = (filtersArray: any) => {
    setNoFilterResult(false);
    getTransactionsData(filtersArray);
  };

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

  const handleSubmit = (data: any, filterTagsToRender: Map<any, any>) => {
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR', data);
    }

    setAppliedFilters(data);

    setFilterTags(filterTagsToRender);

    if (!isW2WTransactions) {
      applyFilters(data);
    }
  };

  const handleFiltersShow = () => {
    // filterRef.current?.showFilters();
    setIsFilterSheetVisible(true);
  };

  const removeFilter = (filter: string) => {
    const filterTagKeys = filterTags;
    const deletedFilterValues = filterTagKeys?.get(filter);

    filterTagKeys?.delete(filter);

    let updatedFilters = { ...appliedFilters };

    updatedFilters = {
      ...updatedFilters,
      ...deletedFilterValues,
    };

    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
    setFilterTags(filterTagKeys);
  };

  const onPressClose = (text: string) => {
    if (filterTags && filterTags?.size > 0) {
      removeFilter(text);
    } else {
      setFilteredData(transactionsData);
    }
  };

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR');
    } else if (isShowTabs) {
      applyFilters({ transaction_type: selectedTab });
    }
  }, [selectedTab]);

  useEffect(() => {
    setNoFilterResult(false);
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR');
    } else {
      getTransactionsData();
    }
    return () => setNoFilterResult(false);
  }, []);

  useEffect(() => {
    setFilteredData(transactionsData);
  }, [transactionsData]);

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
      <IPayNoResult textColor={colors.primary.primary800} message="TRANSACTION_HISTORY.NO_TRANSACTIONS_RESULT_FOUND" />
    ) : (
      <IPayNoResult
        textColor={colors.primary.primary800}
        message="TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY"
      />
    );

  const renderLoadingWithNoResult = () => (isLoading ? <IPaySpinner hasBackgroundColor={false} /> : renderNoResult());

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={headerTitle}
        titleStyle={styles.cardTransactionsTitle}
        applyFlex
        rightComponent={
          <IPayPressable onPress={() => handleFiltersShow()}>
            <IPayIcon
              icon={filterTags && filterTags?.size > 0 ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filterTags && filterTags?.size > 0 ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />

      {currentCard && isShowCard && (
        <IPayView style={styles.cardContainerStyleParent}>
          <IPayCardDetailsBannerComponent
            cardType={currentCard.cardType}
            cardTypeName={currentCard.cardHeaderText}
            carHolderName={currentCard.name}
            cardLastFourDigit={cardLastFourDigit}
          />
        </IPayView>
      )}

      {filterTags && filterTags?.size > 0 && (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from(filterTags?.keys()).map((key) => (
              <IPayChip
                key={key as string}
                containerStyle={styles.chipContainer}
                headingStyles={styles.chipHeading}
                textValue={key as string}
                icon={
                  <IPayPressable onPress={() => onPressClose(key as string)}>
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
        heading="TRANSACTION_HISTORY.TRANSACTION_DETAILS"
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
        <>
          {/* <IPayFilterBottomSheet
            heading="TRANSACTION_HISTORY.FILTER"
            defaultValues={isW2WTransactions ? w2WFilterDefaultValues : transactionHistoryFilterDefaultValues}
            showAmountFilter={isShowAmount}
            showDateFilter
            ref={filterRef}
            onSubmit={handleSubmit}
            filters={selectedFilterData}
          /> */}

          <IPayFilterTransactions
            // ref={filterRef}
            heading="TRANSACTION_HISTORY.FILTER"
            showAmountFilter={isShowAmount}
            showDateFilter
            showCardFilter={!isW2WTransactions && !isShowCard}
            cards={mappedCards ?? []}
            showContactsFilter={isW2WTransactions}
            contacts={mappedContacts ?? []}
            showTypeFilter={!isW2WTransactions}
            onSubmit={handleSubmit}
            defaultValues={isW2WTransactions ? w2WFilterDefaultValues : transactionHistoryFilterDefaultValues}
            isVisible={isFilterSheetVisible}
            onCloseFilterSheet={() => setIsFilterSheetVisible(false)}
            setSelectedCard={(card: any) => setSelectedCard(card)}
          />
        </>
      )}
      <IPayAlert
        icon={<IPayIcon icon={icons.clipboard_close} size={64} />}
        visible={noFilterResult}
        closeOnTouchOutside
        transparentOverlay={false}
        animationType="fade"
        showIcon={false}
        title="TRANSACTION_HISTORY.NO_RESULTS"
        onClose={() => {
          setNoFilterResult(false);
        }}
        message="TRANSACTION_HISTORY.NO_RESULTS_DETAIL"
        primaryAction={{
          text: t('TRANSACTION_HISTORY.GOT_IT'),
          onPress: () => {
            setNoFilterResult(false);
          },
        }}
      />
    </IPaySafeAreaView>
  );
};

export default TransactionHistoryScreen;

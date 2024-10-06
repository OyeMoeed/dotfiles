import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/core';

import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayFilterTransactions, IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import { getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import { heightMapping } from '@app/components/templates/ipay-request-detail/ipay-request-detail.constant';

import transactionsStyles from './musaned-history.styles';

const MusanedHistoryScreen: React.FC = () => {
  const { t } = useTranslation();
  const { params } = useRoute();
  const { musnaedData, currentWalletNumber } = params || {};

  const { transactionHistoryFilterDefaultValues, salaryTypes } = useConstantData();
  const salaryTypeFilter = [
    { id: 'All', text: 'All' },
    ...salaryTypes.map((value) => ({
      ...value,
      text: t(value.text),
    })),
  ];
  const laborerNames = musnaedData
    .filter((value) => value.mobileNumber)
    .map((value) => ({ id: value.mobileNumber, text: value.name }));

  const { colors } = useTheme();
  const styles = transactionsStyles(colors);

  const [filterTags, setFilterTags] = useState<Map<any, any>>();
  const transactionRef = React.createRef<any>();
  const [transaction, setTransaction] = useState<null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [appliedFilters, setAppliedFilters] = useState<null>(null);
  const [filteredData, setFilteredData] = useState<null>(null);
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noFilterResult, setNoFilterResult] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<[]>([]);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState<boolean>(false);

  const headerTitle = 'COMMON.TRANSACTIONS_HISTORY';

  const getTransactionsData = async (filtersData?: any) => {
    setIsLoading(true);
    setFilteredData([]);

    const payload: TransactionsProp = {
      walletNumber,
      maxRecords: '50',
      offset: '1',
      fromDate: filtersData ? filtersData.dateFrom?.replaceAll('/', '-') : '',
      toDate: filtersData ? filtersData.dateTo?.replaceAll('/', '-') : '',
      trxReqType: 'COUT_MUSANED',
      fromAmount: filtersData ? filtersData?.amountFrom : '',
      toAmount: filtersData ? filtersData?.amountTo : '',
      targetWallet: currentWalletNumber,
      mobileNumber: filtersData ? filtersData?.laborerName : '',
      salaryType: filtersData ? filtersData?.salaryType : '',
    };

    const apiResponse: any = await getTransactions(payload);

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const transactionsResponse = apiResponse?.response?.transactions || [];
      if (transactionsResponse?.length) {
        setTransactionsData(transactionsResponse);
      } else {
        setTransactionsData([]);
        setNoFilterResult(true);
      }
    }
    setIsLoading(false);
  };

  const applyFilters = (filtersArray: any) => {
    setNoFilterResult(false);
    getTransactionsData(filtersArray);
  };

  const openBottomSheet = (item: any) => {
    let calculatedSnapPoint = ['1%', '70%', isAndroidOS ? '95%' : '100%'];
    const height = heightMapping[item.transactionRequestType as keyof typeof heightMapping];
    if (height) {
      calculatedSnapPoint = ['1%', height, isAndroidOS ? '95%' : '100%'];
    }
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    transactionRef.current?.present();
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  const handleSubmit = (data: any, filterTagsToRender: Map<any, any>) => {
    setAppliedFilters(data);

    setFilterTags(filterTagsToRender);

    applyFilters(data);
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

  useEffect(() => {
    setFilteredData(transactionsData);
  }, [transactionsData]);

  useEffect(() => {
    setNoFilterResult(false);

    getTransactionsData();
    return () => setNoFilterResult(false);
  }, []);

  const renderNoResult = () =>
    noFilterResult ? (
      <IPayNoResult textColor={colors.primary.primary800} message="TRANSACTION_HISTORY.NO_TRANSACTIONS_RESULT_FOUND" />
    ) : (
      <IPayNoResult
        textColor={colors.primary.primary800}
        message="TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY"
      />
    );

  const renderTrxsList = () => (
    <IPayView style={styles.listContainer}>
      <IPayFlatlist
        data={filteredData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <IPayTransactionItem transaction={item} onPressTransaction={openBottomSheet} />}
        ListEmptyComponent={
          isLoading ? (
            <IPaySkeletonBuilder isLoading={isLoading} variation={IPaySkeletonEnums.TRANSACTION_LIST} />
          ) : (
            renderNoResult()
          )
        }
      />
    </IPayView>
  );

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

      {filterTags && filterTags?.size > 0 ? (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from(filterTags?.keys()).map((key) => (
              <IPayChip
                key={`${key}`}
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
      ) : (
        <IPayView />
      )}

      {renderTrxsList()}
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

      <IPayFilterTransactions
        heading="TRANSACTION_HISTORY.FILTER"
        showAmountFilter
        showDateFilter
        onSubmit={handleSubmit}
        showMusanedFilter
        defaultValues={transactionHistoryFilterDefaultValues}
        isVisible={isFilterSheetVisible}
        onCloseFilterSheet={() => setIsFilterSheetVisible(false)}
        laborerList={laborerNames}
        salaryTypes={salaryTypeFilter}
      />

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

export default MusanedHistoryScreen;

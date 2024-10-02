import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayFilterTransactions, IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import { heightMapping } from '@app/components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import {
  BeneficiaryTransaction,
  LocalTransferReqParams,
} from '@app/network/services/local-transfer/transfer-history-api/transfer-history.interface';
import getlocalTransaction from '@app/network/services/local-transfer/transfer-history-api/transfer-history.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { dateTimeFormat } from '@app/utilities';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SNAP_POINT } from '@app/constants/constants';
import IPayTransactionItem from '../transaction-history/component/ipay-transaction.component';
import {
  BeneficiaryData,
  BeneficiaryTransactionItemProps,
  TransactionType,
} from './beneficiary-transaction-history.interface';
import transactionHistoryStyles from './beneficiary-transaction-history.style';

const BeneficiaryTransactionHistoryScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = transactionHistoryStyles(colors);
  const { transferHistoryFilterDefaultValues } = useConstantData();

  const [activeTab, setActiveTab] = useState<string>(t('COMMON.SENT'));
  const transactionRef = React.createRef<any>();
  const [transaction, setTransaction] = useState<BeneficiaryTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['100%', isAndroidOS ? '95%' : '100%']);
  const [beneficiaryHistoryData, setBeneficiaryHistoryData] = useState<BeneficiaryTransaction[] | undefined>([]);
  const [showTransactionSheet, setShowTransactionSheet] = useState<boolean>(false);
  const [filterTags, setFilterTags] = useState<Map<any, any>>();
  const [appliedFilters, setAppliedFilters] = useState<BeneficiaryData>({});
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState<boolean>(false);

  const tabOptions = [t('COMMON.SENT'), t('COMMON.RECEIVED')];
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  const openBottomSheet = (item: BeneficiaryTransactionItemProps) => {
    const calculatedSnapPoint = [heightMapping[item?.transactionType], '100%'];
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    setShowTransactionSheet(true);
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  const transactionType: TransactionType = {
    [t('COMMON.SENT')]: TransactionTypes.DR,
    [t('COMMON.RECEIVED')]: TransactionTypes.CR,
  };

  const generatedData = () => {
    if (beneficiaryHistoryData?.length) {
      return beneficiaryHistoryData
        ?.filter((item) => item?.transactionType === transactionType[activeTab as keyof TransactionType])
        ?.sort((a, b) => new Date(b?.transactionDateTime) - new Date(a?.transactionDateTime));
    }
    return [];
  };

  const handleFiltersShow = () => {
    setIsFilterSheetVisible(true);
  };

  const formatDate = (date: string) => {
    const { DateMonthYearWithoutSpace, ShortDateWithDash } = dateTimeFormat;
    if (date) {
      return moment(date, DateMonthYearWithoutSpace).format(ShortDateWithDash);
    }
    return '';
  };

  const getBeneficiariesHistory = async (trxReqType: string, transferFilters: BeneficiaryData) => {
    const payload: LocalTransferReqParams = {
      walletNumber,
      trxReqType,
      beneficiaryName: transferFilters?.beneficiaryName ?? '',
      toDate: formatDate(transferFilters?.dateTo) ?? '',
      fromDate: formatDate(transferFilters?.dateFrom) ?? '',
      fromAmount: transferFilters?.amountFrom ?? '',
      toAmount: transferFilters?.amountTo ?? '',
    };

    return getlocalTransaction(payload);
  };

  const getLocalTransactionsData = async (beneficiaryFilters: BeneficiaryData) => {
    const [alinmaResponse, sariResponse, ipsResponse] = await Promise.all([
      getBeneficiariesHistory(TransactionTypes.COUT_ALINMA, beneficiaryFilters),
      getBeneficiariesHistory(TransactionTypes.COUT_SARIE, beneficiaryFilters),
      getBeneficiariesHistory(TransactionTypes.COUT_IPS, beneficiaryFilters),
    ]);
    let alinmaTransactions = [];
    let sariTransactions = [];
    let ipsTransactions = [];
    if (alinmaResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      alinmaTransactions = alinmaResponse.response?.transactions;
    }
    if (sariResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      sariTransactions = sariResponse.response?.transactions;
    }
    if (ipsResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      ipsTransactions = ipsResponse.response?.transactions;
    }
    setBeneficiaryHistoryData([...alinmaTransactions, ...sariTransactions, ...ipsTransactions]);
  };

  useEffect(() => {
    getLocalTransactionsData({});
  }, []);

  const handleSubmit = (data: BeneficiaryData, filterTagsArray: Map<any, any>) => {
    setAppliedFilters(data);
    setFilterTags(filterTagsArray);
    getLocalTransactionsData(data);
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
    getLocalTransactionsData(updatedFilters);
  };

  const onPressClose = (text: string) => {
    if (filterTags && filterTags?.size > 0) {
      removeFilter(text);
    } else {
      getLocalTransactionsData({});
    }
  };

  const ListEmptyComponent = useCallback(
    () => (
      <IPayNoResult
        testID="no-results"
        textColor={colors.primary.primary800}
        message="TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY"
        showEmptyBox
      />
    ),
    [],
  );

  return (
    <IPaySafeAreaView testID="transaction-section" style={styles.container}>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title="COMMON.TRANSACTIONS_HISTORY"
        applyFlex
        titleStyle={styles.capitalizeTitle}
        rightComponent={
          <IPayPressable onPress={handleFiltersShow}>
            <IPayIcon
              icon={filterTags && filterTags?.size > 0 ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filterTags && filterTags?.size > 0 ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      <IPayView style={styles.contentContainer}>
        <IPayTabs onSelect={(tab) => setActiveTab(tab)} tabs={tabOptions} />
        {filterTags && filterTags?.size > 0 ? (
          <IPayView style={styles.filterWrapper}>
            <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
              <IPayView style={styles.filterScroll}>
                {Array.from(filterTags?.keys()).map(
                  (key) =>
                    key && (
                      <IPayChip
                        key={key as string}
                        containerStyle={styles.chipContainer}
                        headingStyles={styles.chipHeading}
                        textValue={key}
                        icon={
                          <IPayPressable onPress={() => onPressClose(key)}>
                            <IPayIcon icon={icons.CLOSE_SQUARE} size={16} color={colors.secondary.secondary500} />
                          </IPayPressable>
                        }
                      />
                    ),
                )}
              </IPayView>
            </IPayScrollView>
          </IPayView>
        ) : (
          <IPayView />
        )}
        <IPayFlatlist
          data={generatedData()}
          style={styles.flatlist}
          scrollEnabled
          testID="transaction-flatlist"
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <IPayTransactionItem
              onPressTransaction={(transactionItem) =>
                openBottomSheet(transactionItem as BeneficiaryTransactionItemProps)
              }
              isBeneficiaryHistory
              transaction={item}
            />
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
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
        <IPayTransactionHistory isBeneficiaryHistory transaction={transaction} onCloseBottomSheet={closeBottomSheet} />
      </IPayBottomSheet>
      <IPayPortalBottomSheet
        heading="TRANSACTION_HISTORY.TRANSACTION_DETAILS"
        onCloseBottomSheet={() => setShowTransactionSheet(false)}
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        simpleHeader
        simpleBar
        cancelBnt
        enablePanDownToClose
        bold
        isVisible={showTransactionSheet}
      >
        <IPayTransactionHistory
          isBeneficiaryHistory
          transaction={transaction}
          onCloseBottomSheet={() => setShowTransactionSheet(false)}
        />
      </IPayPortalBottomSheet>
      <IPayFilterTransactions
        heading="TRANSACTION_HISTORY.FILTER"
        showBeneficiaryFilter
        showAmountFilter
        showDateFilter
        onSubmit={handleSubmit}
        defaultValues={transferHistoryFilterDefaultValues}
        isVisible={isFilterSheetVisible}
        onCloseFilterSheet={() => setIsFilterSheetVisible(false)}
      />
    </IPaySafeAreaView>
  );
};

export default BeneficiaryTransactionHistoryScreen;

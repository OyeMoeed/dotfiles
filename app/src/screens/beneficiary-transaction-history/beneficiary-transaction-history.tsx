import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayFilterBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import { heightMapping } from '@app/components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import LocalTransferBeneficiariesMockProps from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.interface';
import getlocalTransferBeneficiaries from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.service';
import LocalBeneficiaryMetaMockProps, {
  LocalBank,
} from '@app/network/services/local-transfer/local-transfer-beneficiary-metadata/local-beneficiary-metadata.interface';
import getlocalBeneficiaryMetaData from '@app/network/services/local-transfer/local-transfer-beneficiary-metadata/local-beneficiary-metadata.service';
import {
  BeneficiaryTransaction,
  LocalTransferMockProps,
  LocalTransferReqParams,
} from '@app/network/services/local-transfer/transfer-history-api/transfer-history.interface';
import getlocalTransaction from '@app/network/services/local-transfer/transfer-history-api/transfer-history.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { dateTimeFormat } from '@app/utilities';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType, FiltersType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SNAP_POINT } from '@app/constants/constants';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import { BeneficiaryDetails } from '../local-transfer/local-transfer.interface';
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
  const filterRef = useRef<bottomSheetTypes>(null);
  const { transferHistoryFilterDefaultValues } = useConstantData();

  const [activeTab, setActiveTab] = useState<string>(t('COMMON.SENT'));
  const transactionRef = React.createRef<any>();
  const [transaction, setTransaction] = useState<BeneficiaryTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['100%', isAndroidOS ? '95%' : '100%']);
  const [beneficiaryHistoryData, setBeneficiaryHistoryData] = useState<BeneficiaryTransaction[] | undefined>([]);
  const [apiError, setAPIError] = useState<string>('');
  const [showTransactionSheet, setShowTransactionSheet] = useState<boolean>(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [appliedFilters, setAppliedFilters] = useState<BeneficiaryData>({});
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryDetails[]>([]);
  const [bankList, setBankList] = useState<LocalBank[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToastContext();

  const tabOptions = [t('COMMON.SENT'), t('COMMON.RECEIVED')];
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

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
    filterRef.current?.showFilters();
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

  const getBankList = async () => {
    const apiResponse: LocalBeneficiaryMetaMockProps = await getlocalBeneficiaryMetaData();
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      setBankList(apiResponse.response.localBanks);
    }
  };

  const getBeneficiariesData = async () => {
    try {
      const apiResponse: LocalTransferBeneficiariesMockProps = await getlocalTransferBeneficiaries();
      if (apiResponse?.successfulResponse) {
        setBeneficiaryData(apiResponse?.response?.beneficiaries);
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const getBeneficiryNamesList = () =>
    beneficiaryData?.map((item) => ({
      id: item.beneficiaryCode,
      key: item.fullName,
      value: item.fullName,
    }));

  const getLocalBankList = () =>
    bankList?.map((item) => ({
      id: item?.code,
      key: item?.code,
      value: item?.desc,
      image: item?.code,
    }));

  const filtersList = [
    {
      id: '1',
      label: t('LOCAL_TRANSFER.BENEFICIARY_NAME'),
      type: FiltersType.BENEFICIARY_NAME,
      icon: icons.user1,
      filterValues: getBeneficiryNamesList(),
    },
    {
      id: '2',
      label: t('TRANSACTION_HISTORY.BANK_NAME'),
      type: FiltersType.BANK_NAME_LIST,
      filterValues: getLocalBankList(),
    },
  ];

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
    try {
      const apiResponse: LocalTransferMockProps = await getlocalTransaction(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          if (apiResponse.response?.transactions?.length) {
            setBeneficiaryHistoryData((prevData) => [...prevData, ...apiResponse.response.transactions]);
          } else {
            setBeneficiaryHistoryData([]);
          }
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error?.error ?? '');
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const getLocalTransactionsData = async (beneficiaryFilters: BeneficiaryData) => {
    setIsLoading(true);
    await Promise.all([
      getBeneficiariesHistory(TransactionTypes.COUT_ALINMA, beneficiaryFilters),
      getBeneficiariesHistory(TransactionTypes.COUT_SARIE, beneficiaryFilters),
      getBeneficiariesHistory(TransactionTypes.COUT_IPS, beneficiaryFilters),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    getLocalTransactionsData({});
    getBeneficiariesData();
    getBankList();
  }, []);

  const handleSubmit = (data: BeneficiaryData) => {
    const beneficiaryName = data?.beneficiaryName ?? '';
    const bankName = data?.beneficiaryBankName ?? '';
    const dateRange = data?.dateFrom ? `${data?.dateFrom} - ${data?.dateTo}` : '';
    const amountRange = data?.amountFrom ? `${data?.amountFrom} - ${data?.amountTo}` : '';
    const filtersArray = [beneficiaryName, bankName, amountRange, dateRange];
    const filterValues = filtersArray.filter((item) => item !== '');
    setAppliedFilters(data);
    setFilters(filterValues);
    setBeneficiaryHistoryData([]);
    getLocalTransactionsData(data);
  };

  const removeFilter = (filter: string, allFilters: any) => {
    let updatedFilters = { ...allFilters };

    const [filterFrom, filterTo] = filter.split(' - ').map((s) => s.trim());

    if (allFilters.amountFrom === filterFrom && allFilters.amountTo === filterTo) {
      updatedFilters = {
        ...updatedFilters,
        amountFrom: '',
        amountTo: '',
      };
    }

    if (allFilters.dateFrom === filterFrom && allFilters.dateTo === filterTo) {
      updatedFilters = {
        ...updatedFilters,
        dateFrom: '',
        dateTo: '',
      };
    }

    if (updatedFilters?.beneficiaryBankName === filter) {
      updatedFilters = {
        ...updatedFilters,
        beneficiaryBankName: '',
      };
    }

    if (updatedFilters?.beneficiaryName === filter) {
      updatedFilters = {
        ...updatedFilters,
        beneficiaryName: '',
      };
    }

    setAppliedFilters(updatedFilters);
    setBeneficiaryHistoryData([]);
    getLocalTransactionsData(updatedFilters);
  };

  const onPressClose = (text: string) => {
    const deletedFilter = filters.filter((value) => value !== text);
    setFilters(deletedFilter);
    removeFilter(text, appliedFilters);
  };

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return <IPaySkeletonBuilder isLoading={isLoading} variation={IPaySkeletonEnums.TRANSACTION_LIST} />;
    }
    return (
      <IPayNoResult
        testID="no-results"
        textColor={colors.primary.primary800}
        message="TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY"
        showEmptyBox
      />
    );
  }, [colors.primary.primary800, isLoading]);

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
              icon={filters.length ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filters.length ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      <IPayView style={styles.contentContainer}>
        <IPayTabs onSelect={(tab) => setActiveTab(tab)} tabs={tabOptions} />
        {filters.length ? (
          <IPayView style={styles.filterWrapper}>
            <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
              <IPayView style={styles.filterScroll}>
                {filters.map(
                  (text, index) =>
                    text && (
                      <IPayChip
                        key={`${index + 1}`}
                        containerStyle={styles.chipContainer}
                        headingStyles={styles.chipHeading}
                        textValue={text}
                        icon={
                          <IPayPressable onPress={() => onPressClose(text)}>
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
      <IPayFilterBottomSheet
        heading="TRANSACTION_HISTORY.FILTER"
        defaultValues={transferHistoryFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        filters={filtersList}
        applySearchOn={[FiltersType.BANK_NAME_LIST]}
        onSubmit={handleSubmit}
      />
    </IPaySafeAreaView>
  );
};

export default BeneficiaryTransactionHistoryScreen;

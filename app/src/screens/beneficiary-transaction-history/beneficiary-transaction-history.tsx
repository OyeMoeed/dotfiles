import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayChip, IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayFilterBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import { heightMapping } from '@app/components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import {
  BeneficiaryTransaction,
  LocalTransferMockProps,
  LocalTransferReqParams,
} from '@app/network/services/local-transfer/transfer-history-api/transfer-history.interface';
import getlocalTransaction from '@app/network/services/local-transfer/transfer-history-api/transfer-history.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType, FiltersType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const localizationText = useLocalization();
  const filterRef = useRef<bottomSheetTypes>(null);
  const { transferHistoryFilterData, transferHistoryFilterDefaultValues } = useConstantData();

  const [activeTab, setActiveTab] = useState<string>(t('COMMON.SENT'));
  const transactionRef = React.createRef<any>();
  const [transaction, setTransaction] = useState<BeneficiaryTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['95%', isAndroidOS ? '95%' : '100%']);
  const [beneficiaryHistoryData, setBeneficiaryHistoryData] = useState<BeneficiaryTransaction[] | undefined>([]);
  const [apiError, setAPIError] = useState<string>('');
  const [showTransactionSheet, setShowTransactionSheet] = useState<boolean>(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [appliedFilters, setAppliedFilters] = useState<BeneficiaryData>({});

  const { showToast } = useToastContext();

  const tabOptions = [t('COMMON.SENT'), t('COMMON.RECEIVED')];
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const openBottomSheet = (item: BeneficiaryTransactionItemProps) => {
    const calculatedSnapPoint = [heightMapping[item?.transactionRequestType], '100%'];
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    setShowTransactionSheet(true);
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  const transactionType: TransactionType = {
    [localizationText.COMMON.SENT]: TransactionTypes.PAY_WALLET,
    [localizationText.COMMON.RECEIVED]: TransactionTypes.CIN_SARIE_REV,
  };

  const generatedData = () =>
    beneficiaryHistoryData?.filter(
      (item) => item?.transactionRequestType === transactionType[activeTab as keyof TransactionType],
    );

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

  const getBeneficiariesHistory = async () => {
    const payload: LocalTransferReqParams = {
      walletNumber,
      bankName: appliedFilters?.beneficiaryBankName,
      beneficiaryName: appliedFilters?.beneficiaryName,
      toDate: appliedFilters?.dateTo,
      fromDate: appliedFilters?.dateFrom,
      fromAmount: appliedFilters?.amountFrom,
      toAmount: appliedFilters?.amountTo,
    };
    try {
      const apiResponse: LocalTransferMockProps = await getlocalTransaction(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiaryHistoryData(apiResponse?.response?.transactions);
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

  useEffect(() => {
    getBeneficiariesHistory();
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
  };

  const removeFilter = (filter: string, allFilters: any) => {
    let updatedFilters = { ...allFilters };

    const isDateRange = filter.includes('-') && !filter.includes('SAR');

    if (isDateRange) {
      const [dateFrom, dateTo] = filter.split(' - ').map((s) => s.trim());

      if (
        moment(allFilters.dateFrom, 'DD/MM/YYYY').isSame(dateFrom, 'day') &&
        moment(allFilters.dateTo, 'DD/MM/YYYY').isSame(dateTo, 'day')
      ) {
        updatedFilters = {
          ...updatedFilters,
          dateFrom: '',
          dateTo: '',
        };
      }
    } else if (allFilters.transaction_type === filter) {
      updatedFilters = {
        ...updatedFilters,
        transaction_type: '',
      };
    }
    setAppliedFilters(updatedFilters);
  };

  const onPressClose = (text: string) => {
    const deletedFilter = filters.filter((value) => value !== text);
    setFilters(deletedFilter);
    if (deletedFilter.length > 0) {
      removeFilter(text, appliedFilters);
    }
  };

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
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={() => setShowTransactionSheet(false)}
        customSnapPoint={snapPoint}
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
        filters={transferHistoryFilterData}
        applySearchOn={[FiltersType.BANK_NAME_LIST]}
        onSubmit={handleSubmit}
      />
    </IPaySafeAreaView>
  );
};

export default BeneficiaryTransactionHistoryScreen;

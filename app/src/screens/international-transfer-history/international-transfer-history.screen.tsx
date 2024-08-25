import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayActionSheet, IPayBottomSheet, IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { LocalizationKeysMapping, TransactionsStatus } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import dateTimeFormat from '@app/utilities/date.const';
import { FiltersType, States } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RefreshControl } from 'react-native';
import IPayTransactionItem from '../transaction-history/component/ipay-transaction.component';
import EditBeneficiary from './components/edit-beneficiary.component';
import IPayInternationalTransferBeneficiries from './components/transaction-details-beneficiary.component';
import { refundTransactionData } from './components/transaction-details-data.mock';
import TransactionDetails from './components/transaction-details.component';
import TransactionRefund from './components/transaction-refund.component';
import IPayInternationalTransferDeliveryTypeComponent from './components/transcation-details-delivery-type.component';
import { TransactionDataProps } from './components/transction-details-component.interface';
import { TransactionDataFiltersProps } from './internationa-transfer-history.interface';
import internationalTransferHistoryData from './international-transfer-history.data';
import { InternationalTransferHistoryDataProps } from './international-transfer-history.interface';
import internationalTrHistoryStyles from './international-transfer-history.style';

const InternationalTransferHistory: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTrHistoryStyles(colors);
  const localizationText = useLocalization();
  const [filteredData, setFilteredData] = useState<InternationalTransferHistoryDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [appliedFilters, setAppliedFilters] = useState<TransactionDataFiltersProps | null>(null);
  const [tabFilterKey, setTabFilterKey] = useState<string>('All');
  const [category, setCategory] = useState<string>('');
  const filterRef = useRef<bottomSheetTypes>(null);
  const deliveryTypeBottomSheetRef = useRef<any>(null);
  const beneficiaryBottomSheetRef = useRef<any>(null);
  const [transaction, setTransaction] = useState<InternationalTransferHistoryDataProps | null>(null);
  const [refundTransaction, setRefundTransaction] = useState<TransactionDataProps | null>(null);
  const [beneficiaryName, setBeneficiaryName] = useState<string>('');
  const [editBeneficiaryMessage, setEditBeneficiaryMessage] = useState<string>('');
  const transactionDetailsBottomSheet = useRef<any>(null);
  const refundBottomSheetRef = useRef<any>(null);
  const transactionDetailsRef = useRef<any>(null);
  const editBeneficiaryBottomSheetRef = useRef<any>(null);
  const editBeneficiaryConfirmationActionSheet = useRef<any>(null);

  const filterTabs = constants.TRANSACTION_FILTERS;
  const { internationalTransferHistoryFilterData, transferHistoryFilterDefaultValues } = useConstantData();

  const {
    getValues,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const resetData = () => {
    setFilteredData(internationalTransferHistoryData);
    setFilters([]);
    setAppliedFilters(null);
    setTabFilterKey('All');
    setIsLoading(false);
  };

  const openBottomSheet = (transactionData: InternationalTransferHistoryDataProps) => {
    setTransaction(transactionData);
    transactionDetailsBottomSheet.current?.present();
  };

  const closeBottomSheet = () => {
    transactionDetailsBottomSheet.current?.forceClose();
  };

  const onRefresh = () => {
    resetData();
  };

  useEffect(() => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      resetData();
    });
  }, []);

  // Function to apply filters dynamically
  const applyFilters = (filtersData: TransactionDataFiltersProps) => {
    // Destructure filters for better readability
    const { amountFrom, amountTo, dateFrom, dateTo, transactionType, beneficiaryNameList, deliveryType } = filtersData;

    // Filter the internationalTransferHistoryData based on the filters
    const filteredTransactionsData = internationalTransferHistoryData.filter((item) => {
      // Extract and parse item values
      const itemAmount = parseFloat(item?.amount ?? '0');
      const itemDate = moment(item.transactionDateTime, dateTimeFormat.DayMonthYearAndTime);

      // Check amount range
      const isAmountInRange =
        amountFrom && amountTo ? itemAmount >= parseFloat(amountFrom) && itemAmount <= parseFloat(amountTo) : true;

      // Check date range
      const isDateInRange =
        dateFrom &&
        dateTo &&
        itemDate.isSameOrAfter(moment(dateFrom, dateTimeFormat.MonthDateYear)) &&
        itemDate.isSameOrBefore(moment(dateTo, dateTimeFormat.MonthDateYear));

      // Check transaction type match
      const isTransactionTypeMatch =
        !transactionType ||
        localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[item?.transaction_type ?? '']] === transactionType;

      // Check beneficiary name match
      const isNameMatch = !beneficiaryNameList || beneficiaryNameList === item?.receiver;

      // Check delivery type match
      const isTransactionMediumMatch =
        !deliveryType ||
        localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[item?.transaction_medium ?? '']] === deliveryType;

      // Return true if all conditions are met
      return isAmountInRange && isDateInRange && isTransactionTypeMatch && isNameMatch && isTransactionMediumMatch;
    });

    // Update state with filtered data
    setFilteredData(filteredTransactionsData);
  };

  // Function to apply remove filters dynamically
  const removeFilter = (filter: string, allFilters: TransactionDataFiltersProps) => {
    // Clone the existing filters to avoid mutating the original object
    const updatedFilters = { ...allFilters };

    // Check if the filter is an amount range (contains 'SAR')
    const isRangeFilter = filter.includes(' - ');
    const isAmountRange = isRangeFilter && filter.includes('SAR');

    // Regular expression to match the 'MM/DD/YYYY' format
    const dateRegex = /\b\d{2}\/\d{2}\/\d{4}\b/g;

    // Check if the filter contains dates in 'MM/DD/YYYY' format
    const isDateRange = isRangeFilter && dateRegex.test(filter);

    // Handle amount range filters
    if (isAmountRange) {
      const [amountFrom, amountTo] = filter
        .replace(' SAR', '')
        .split(' - ')
        .map((s) => s.trim());
      if (allFilters.amountFrom === amountFrom && allFilters.amountTo === amountTo) {
        updatedFilters.amountFrom = '';
        updatedFilters.amountTo = '';
      }
    }
    // Handle date range filters
    else if (isDateRange) {
      const [dateFrom, dateTo] = filter.split(' - ').map((s) => s.trim());
      if (
        moment(allFilters.dateFrom, 'MM/DD/YYYY').isSame(dateFrom, 'day') &&
        moment(allFilters.dateTo, 'MM/DD/YYYY').isSame(dateTo, 'day')
      ) {
        updatedFilters.dateFrom = '';
        updatedFilters.dateTo = '';
      }
    }
    // Handle other types of filters
    else if (allFilters.transactionType === filter) {
      updatedFilters.transactionType = '';
    } else if (allFilters.beneficiaryNameList === filter) {
      updatedFilters.beneficiaryNameList = '';
    } else if (allFilters.deliveryType === filter) {
      updatedFilters.deliveryType = '';
    }

    // Apply the updated filters and set them
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const onPressFilterTab = (filterKey: string, deletedFilters?: string[]) => {
    if (filterKey === 'All') {
      if (deletedFilters && deletedFilters.length > 0) {
        applyFilters(appliedFilters);
      } else {
        setFilteredData(internationalTransferHistoryData);
      }
    } else {
      // Apply filter based on status
      const key = filterKey.toLowerCase();
      const filterData = internationalTransferHistoryData.filter((item) => item.status === key);
      setFilteredData(filterData);
    }
    setTabFilterKey(filterKey);
  };

  const onPressFilters = () => {
    filterRef.current?.showFilters();
  };

  const onPressClose = (filterItem: string) => {
    const deletedFilter = filters.filter((value) => value !== filterItem);
    setFilters(deletedFilter);
    requestAnimationFrame(() => {
      if (deletedFilter.length > 0) {
        removeFilter(filterItem, appliedFilters);
      } else {
        onPressFilterTab(tabFilterKey, deletedFilter);
      }
    });
  };

  const onPressApplyFilters = (filtersData: TransactionDataFiltersProps) => {
    const sar = localizationText.COMMON.SAR;
    const filtersArray = Object.entries(filtersData)
      .filter(([key, value]) => value && (key.includes('amount') || key.includes('date') || value))
      .map(([key, value]) => {
        if (key === FiltersType.AMOUNT_FROM || key === FiltersType.AMOUNT_TO) {
          return `${filtersData.amountFrom} ${sar}  - ${filtersData.amountTo} ${sar}`;
        }
        if (key === FiltersType.DATE_FROM || key === FiltersType.DATE_TO) {
          return `${filtersData.dateFrom} - ${filtersData.dateTo}`;
        }
        return value;
      })
      .filter(Boolean);

    setAppliedFilters(filtersData);
    setFilters([...new Set(filtersArray)]);
    applyFilters(filtersData);
  };

  const onClearFilters = () => {
    setFilters([]);
  };

  const handleClosePress = () => {
    if (category === FiltersType.DELIVERY_TYPE) {
      deliveryTypeBottomSheetRef?.current?.close();
    } else {
      beneficiaryBottomSheetRef?.current?.close();
    }
  };

  const showDeliveryTypeBottomSheet = () => {
    deliveryTypeBottomSheetRef?.current?.present();
  };

  const showBeneficiaryNameBottomSheet = () => {
    beneficiaryBottomSheetRef?.current?.present();
  };

  const handleCallbackForFilters = (sheetName: string) => {
    setCategory(sheetName);
    if (sheetName === FiltersType.DELIVERY_TYPE) {
      showDeliveryTypeBottomSheet();
    } else {
      showBeneficiaryNameBottomSheet();
    }
  };

  const getRefundTransactionData = () => {
    const filteredTransaction: TransactionDataProps = refundTransactionData;

    (Object.keys(refundTransactionData) as (keyof TransactionDataProps)[]).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(transaction, key)) {
        if (transaction) {
          filteredTransaction[key] = transaction[key] as TransactionDataProps[keyof TransactionDataProps];
        }
      }
    });
    setRefundTransaction(filteredTransaction);
  };

  const onPressRefund = () => {
    getRefundTransactionData();
    refundBottomSheetRef?.current?.present();
  };

  const closeRefundBottomSheet = () => {
    refundBottomSheetRef?.current?.close();
  };

  const onPressRefundConfirm = () => {
    closeRefundBottomSheet();
    const updateTransactionStatus = { ...transaction, status: TransactionsStatus.REFUND };
    setTransaction(updateTransactionStatus);
    transactionDetailsRef?.current?.trigerTransactionHistoryToast();
  };

  const onPressEditBeneficiary = () => {
    editBeneficiaryBottomSheetRef?.current?.present();
  };

  const closeEditBeneficiaryBottomSheet = () => {
    editBeneficiaryBottomSheetRef?.current?.close();
  };

  const onPressConfirmEditBeneficiary = (beneficiary: string) => {
    setBeneficiaryName(beneficiary);
    requestAnimationFrame(() => {
      closeEditBeneficiaryBottomSheet();
      closeBottomSheet();
      editBeneficiaryConfirmationActionSheet?.current?.show();
    });
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0) {
      setEditBeneficiaryMessage(localizationText.INTERNATIONAL_TRANSFER.EDIT_BENEFICIARY_PENDING_MESSAGE);
    }
    editBeneficiaryConfirmationActionSheet?.current?.hide();
    transactionDetailsBottomSheet.current?.present();
  };

  const editBeneficiaryConfirmationOptions = {
    title: localizationText.INTERNATIONAL_TRANSFER.TRANSACTION_ONLY_UPDATE_MESSAGE,
    showIcon: true,
    customImage: <IPayIcon icon={icons.warning4} size={48} color={colors.warning.warning500} />,
    message: localizationText.INTERNATIONAL_TRANSFER.EDIT_BENEFICIARY_MESSAGE,
    options: [localizationText.COMMON.DONE, localizationText.COMMON.CANCEL],
    bodyStyle: styles.actionSheetView,
    btnStyle: styles.actionSheetBtn,
    cancelButtonIndex: 1,
    showCancel: true,
    onPress: handleActionSheetPress,
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={localizationText.COMMON.TRANSACTION_HISTORY}
        applyFlex
        rightComponent={
          <IPayPressable onPress={onPressFilters}>
            <IPayIcon
              icon={icons.filter}
              size={20}
              color={filters.length > 0 ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      <IPayView style={styles.container}>
        <IPayTabs tabs={filterTabs} scrollEnabled scrollable onSelect={onPressFilterTab} />
        {filters.length > 0 && (
          <IPayView style={styles.filterWrapper}>
            <IPayFlatlist
              data={filters}
              horizontal
              showsHorizontalScrollIndicator={false}
              itemSeparatorStyle={styles.filterItemSeparator}
              renderItem={({ item }) => (
                <IPayChip
                  key={item}
                  textValue={item}
                  variant={States.SEVERE}
                  icon={
                    <IPayPressable onPress={() => onPressClose(item)}>
                      <IPayIcon icon={icons.CLOSE_SQUARE} size={16} color={colors.secondary.secondary500} />
                    </IPayPressable>
                  }
                />
              )}
            />
          </IPayView>
        )}
        {isLoading && <IPaySpinner testID="spinner" />}

        <IPayView style={styles.listContainer}>
          {filteredData && filteredData.length ? (
            <IPayFlatlist
              testID="flatlist"
              refreshing={isLoading}
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
              data={filteredData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <IPayTransactionItem
                  transaction={item}
                  onPressTransaction={openBottomSheet}
                  style={styles.transactionTab}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <IPayNoResult
              testID="no-results"
              textColor={colors.primary.primary800}
              message={localizationText.TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY}
              showEmptyBox
            />
          )}
        </IPayView>
      </IPayView>
      <IPayFilterBottomSheet
        testID="filters-bottom-sheet"
        heading={localizationText.TRANSACTION_HISTORY.FILTER}
        defaultValues={transferHistoryFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        filters={internationalTransferHistoryFilterData}
        applySearchOn={[FiltersType.BENEFICIARY_NAME_LIST]}
        customFiltersValue
        onSubmit={onPressApplyFilters}
        onClearFilters={onClearFilters}
        handleCallback={handleCallbackForFilters}
      />

      <IPayBottomSheet
        testID="delivery-type"
        heading={localizationText.INTERNATIONAL_TRANSFER.DELIVERY_TYPE}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', isAndroidOS ? '71%' : '74%']}
        onCloseBottomSheet={handleClosePress}
        ref={deliveryTypeBottomSheetRef}
        bold
      >
        <Controller
          control={control}
          name={FiltersType.DELIVERY_TYPE}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <IPayInternationalTransferDeliveryTypeComponent
              deliveryTypesData={filterRef?.current?.getChildFilterType()}
              selectedListItem={value}
              selectTransactionType={getValues('transactionType')}
              onPressListItem={(title, type) => {
                onChange(title);
                if (type !== 'Digital Wallet') setValue('transactionType', type);
                filterRef?.current?.setCurrentViewAndSearch(FiltersType.DELIVERY_TYPE, title, type);
                deliveryTypeBottomSheetRef?.current?.close();
              }}
            />
          )}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        testID="benficiary-name"
        heading={localizationText.LOCAL_TRANSFER.BENEFICIARY_NAME}
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', isAndroidOS ? '51%' : '54%']}
        onCloseBottomSheet={handleClosePress}
        ref={beneficiaryBottomSheetRef}
        bold
      >
        <Controller
          control={control}
          name={FiltersType.BENEFICIARY_NAME_LIST}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <IPayInternationalTransferBeneficiries
              beneficiaries={filterRef?.current?.getChildFilterType()}
              onPressListItem={(title) => {
                onChange(title);
                filterRef?.current?.setCurrentViewAndSearch(FiltersType.BENEFICIARY_NAME_LIST, title);
                beneficiaryBottomSheetRef?.current?.close();
              }}
              selectedListItem={value}
            />
          )}
        />
      </IPayBottomSheet>
      <IPayBottomSheet
        testId="transaction-details"
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['1%', isAndroidOS ? '95%' : '100%']}
        ref={transactionDetailsBottomSheet}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <TransactionDetails
          ref={transactionDetailsRef}
          transaction={transaction}
          onCloseBottomSheet={closeBottomSheet}
          onPressRefund={onPressRefund}
          onPressEditBeneficiary={onPressEditBeneficiary}
          beneficiaryName={beneficiaryName}
          editBeneficiaryMessage={editBeneficiaryMessage}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        testId="send-money"
        heading={localizationText.TRANSACTION_HISTORY.SEND_MONEY}
        onCloseBottomSheet={closeRefundBottomSheet}
        customSnapPoint={['1%', isAndroidOS ? '80%' : '90%']}
        ref={refundBottomSheetRef}
        simpleBar
        bold
      >
        <TransactionRefund
          transactionData={refundTransaction}
          amount={transaction?.amount}
          onPressRefund={onPressRefundConfirm}
          onPressCancel={closeRefundBottomSheet}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        testId="edit-beneficiary"
        heading={localizationText.TRANSACTION_HISTORY.EDIT_BENEFICIARY}
        onCloseBottomSheet={closeEditBeneficiaryBottomSheet}
        customSnapPoint={['1%', isAndroidOS ? '40%' : '50%']}
        ref={editBeneficiaryBottomSheetRef}
        simpleBar
        bold
        cancelBnt
      >
        <EditBeneficiary
          beneficiary={transaction?.beneficiaryName}
          onPressEditBeneficiary={onPressConfirmEditBeneficiary}
        />
      </IPayBottomSheet>

      <IPayActionSheet
        ref={editBeneficiaryConfirmationActionSheet}
        testID="edit-beneficary-confirmation-action-sheet"
        title={editBeneficiaryConfirmationOptions.title}
        message={editBeneficiaryConfirmationOptions.message}
        options={editBeneficiaryConfirmationOptions.options}
        cancelButtonIndex={editBeneficiaryConfirmationOptions.cancelButtonIndex}
        showIcon={editBeneficiaryConfirmationOptions.showIcon}
        showCancel={editBeneficiaryConfirmationOptions.showCancel}
        customImage={editBeneficiaryConfirmationOptions.customImage}
        onPress={editBeneficiaryConfirmationOptions.onPress}
        bodyStyle={editBeneficiaryConfirmationOptions.bodyStyle}
        buttonStyle={editBeneficiaryConfirmationOptions.btnStyle}
      />
    </IPaySafeAreaView>
  );
};

export default InternationalTransferHistory;

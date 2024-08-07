import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { LocalizationKeysMapping } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import dateTimeFormat from '@app/utilities/date.const';
import { FiltersType, States } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import IPayTransactionItem from '../transaction-history/component/ipay-transaction.component';
import { CombinedTransactionItemProps } from '../transaction-history/component/ipay-transaction.interface';
import { TransactionDataFiltersProps } from './internationa-transfer-history.interface';
import internationalTransferHistoryData from './international-transfer-history.data';
import internationalTrHistoryStyles from './international-transfer-history.style';

const InternationalTransferHistory: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTrHistoryStyles();
  const localizationText = useLocalization();
  const [filteredData, setFilteredData] = useState<CombinedTransactionItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [appliedFilters, setAppliedFilters] = useState<TransactionDataFiltersProps | null>(null);
  const [tabFilterKey, setTabFilterKey] = useState<string>('All');
  const filterRef = useRef<bottomSheetTypes>(null);
  const filterTabs = constants.TRANSACTION_FILTERS;
  const { internationalTransferHistoryFilterData, transferHistoryFilterDefaultValues } = useConstantData();

  const resetData = () => {
    setFilteredData(internationalTransferHistoryData);
    setFilters([]);
    setAppliedFilters(null);
    setTabFilterKey('All');
    setIsLoading(false);
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
  const applyFilters = (filters: TransactionDataFiltersProps) => {
    // Destructure filters for better readability
    const {
      amount_from: amountFrom,
      amount_to: amountTo,
      date_from: dateFrom,
      date_to: dateTo,
      transaction_type: transactionType,
      beneficiary_name_list: beneficiaryNameList,
      delivery_type: deliveryType,
    } = filters;

    // Filter the internationalTransferHistoryData based on the filters
    const filteredTransactionsData = internationalTransferHistoryData.filter((item) => {
      // Extract and parse item values
      const itemAmount = parseFloat(item?.amount ?? '0');
      const itemDate = moment(item.transactionDateTime, dateTimeFormat.DayMonthYearTime);

      // Check amount range
      const isAmountInRange =
        !amountFrom || !amountTo || (itemAmount >= parseFloat(amountFrom) && itemAmount <= parseFloat(amountTo));

      // Check date range
      const isDateInRange =
        !dateFrom ||
        !dateTo ||
        (itemDate.isSameOrAfter(moment(dateFrom, dateTimeFormat.MonthDateYear)) &&
          itemDate.isSameOrBefore(moment(dateTo, dateTimeFormat.MonthDateYear)));

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
    const isAmountRange = filter.includes(' - ') && filter.includes('SAR');
    // Check if the filter is a date range (does not contain 'SAR')
    const isDateRange = filter.includes(' - ') && !filter.includes('SAR');

    // Handle amount range filters
    if (isAmountRange) {
      const [amountFrom, amountTo] = filter
        .replace(' SAR', '')
        .split(' - ')
        .map((s) => s.trim());
      if (allFilters.amount_from === amountFrom && allFilters.amount_to === amountTo) {
        updatedFilters.amount_from = '';
        updatedFilters.amount_to = '';
      }
    }
    // Handle date range filters
    else if (isDateRange) {
      const [dateFrom, dateTo] = filter.split(' - ').map((s) => s.trim());
      if (
        moment(allFilters.date_from, 'MM/DD/YYYY').isSame(dateFrom, 'day') &&
        moment(allFilters.date_to, 'MM/DD/YYYY').isSame(dateTo, 'day')
      ) {
        updatedFilters.date_from = '';
        updatedFilters.date_to = '';
      }
    }
    // Handle other types of filters
    else if (allFilters.transaction_type === filter) {
      updatedFilters.transaction_type = '';
    } else if (allFilters.beneficiary_name_list === filter) {
      updatedFilters.beneficiary_name_list = '';
    } else if (allFilters.delivery_type === filter) {
      updatedFilters.delivery_type = '';
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
    let filtersArray: any[] | ((prevState: string[]) => string[]) = [];
    const {
      amount_from: amountFrom,
      amount_to: amountTo,
      date_from: dateFrom,
      date_to: dateTo,
      bank_name_list: bankNameList,
      beneficiary_name_list: beneficiaryNameList,
      delivery_type: deliveryType,
      transaction_type: transactionType,
    } = filtersData;
    if (Object.keys(filtersData)?.length) {
      filtersArray = [
        `${amountFrom} SAR - ${amountTo} SAR`,
        `${dateFrom} - ${dateTo}`,
        bankNameList,
        beneficiaryNameList,
        deliveryType,
        transactionType,
      ].filter((value) => value && value !== '');
    } else {
      filtersArray = [];
    }

    setAppliedFilters(filtersData);
    setFilters(filtersArray);
    applyFilters(filtersData);
  };

  const onClearFilters = () => {
    setFilters([]);
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
        {!!filters.length && (
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
                <IPayTransactionItem transaction={item} onPressTransaction={() => {}} style={styles.transactionTab} />
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
      />
    </IPaySafeAreaView>
  );
};

export default InternationalTransferHistory;

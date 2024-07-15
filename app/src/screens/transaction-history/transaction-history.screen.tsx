import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayBottomSheet, IPayShortHandAtmCard } from '@app/components/organism';
import IPayFilterBottomSheet from '@app/components/organism/ipay-filter-bottom-sheet/ipay-filter-bottom-sheet.component';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { heightMapping } from '../../components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import IPayTransactionItem from './component/ipay-transaction.component';
import { IPayTransactionItemProps } from './component/ipay-transaction.interface';
import historyData from './transaction-history.constant';
import { FiltersArrayProps } from './transaction-history.interface';
import transactionsStyles from './transaction-history.style';

const TransactionHistoryScreen: React.FC = ({ route }: any) => {
  const { transactionsData, isShowCard = true, isShowTabs = false } = route.params;
  const { colors } = useTheme();
  const styles = transactionsStyles(colors);
  const localizationText = useLocalization();
  const TRANSACTION_TABS = [localizationText.HOME.SEND_MONEY, localizationText.TOP_UP.RECEIVED_MONEY];

  const [filters, setFilters] = useState<Array<string>>([]);
  const transactionRef = React.createRef<any>();
  const filterRef = useRef<any>(null);
  const [transaction, setTransaction] = useState<IPayTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<SubmitEvent | null>(null);
  const [filteredData, setFilteredData] = useState<IPayTransactionItemProps[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TRANSACTION_TABS[0]);

  const openBottomSheet = (item: IPayTransactionItemProps) => {
    const calculatedSnapPoint = ['1%', heightMapping[item.transaction_type], isAndroidOS ? '95%' : '100%'];
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    transactionRef.current?.present();
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  useState(() => {
    setFilteredData(historyData);
  });

  // Function to apply filters dynamically
  const applyFilters = (filtersArray: FiltersArrayProps) => {
    const filteredTemp = historyData.filter((item) => {
      const { amount_from, amount_to, date_from, date_to, transaction_type } = filtersArray;

      const itemAmount = parseFloat(item.amount);
      const itemDate = moment(item.transaction_date, 'DD/MM/YYYY - HH:mm');

      const isAmountInRange =
        amount_from && amount_to ? itemAmount >= parseFloat(amount_from) && itemAmount <= parseFloat(amount_to) : true;

      const isDateInRange =
        date_from && date_to
          ? itemDate.isSameOrAfter(moment(date_from, 'DD/MM/YYYY')) &&
            itemDate.isSameOrBefore(moment(date_to, 'DD/MM/YYYY'))
          : true;

      const isTransactionTypeMatch = transaction_type
        ? localizationText[item.transaction_type].toLowerCase() === transaction_type.toLowerCase()
        : true;

      return isAmountInRange && isDateInRange && isTransactionTypeMatch;
    });

    setFilteredData(filteredTemp);
  };

  const handleSubmit = (data: SubmitEvent) => {
    let filtersArray: any[] | ((prevState: string[]) => string[]) = [];
    if (Object.keys(data)?.length) {
      const transactionType = data.transaction_type;
      const amountRange = `${data.amount_from} - ${data.amount_to} ${localizationText.COMMON.SAR}`;
      const dateRange = `${data.date_from} - ${data.date_to}`;

      filtersArray = [transactionType, amountRange, dateRange];
    } else {
      filtersArray = [];
    }

    setAppliedFilters(data);
    setFilters(filtersArray);
    applyFilters(data);
  };

  const handleFiltersShow = () => {
    filterRef.current?.showFilters();
  };

  const removeFilter = (filter: string, filters: any) => {
    const isAmountRange = filter.includes('-') && filter.includes('SAR');
    const isDateRange = filter.includes('-') && !filter.includes('SAR');

    if (isAmountRange) {
      const [amountFrom, amountTo] = filter
        .replace(' SAR', '')
        .split(' - ')
        .map((s) => s.trim());
      if (filters.amount_from === amountFrom && filters.amount_to === amountTo) {
        delete filters.amount_from;
        delete filters.amount_to;
      }
    } else if (isDateRange) {
      const [dateFrom, dateTo] = filter.split(' - ').map((s) => s.trim());
      if (
        moment(filters.date_from, 'DD/MM/YYYY').isSame(dateFrom, 'day') &&
        moment(filters.date_to, 'DD/MM/YYYY').isSame(dateTo, 'day')
      ) {
        delete filters.date_from;
        delete filters.date_to;
      }
    } else if (filters.transaction_type === filter) {
      delete filters.transaction_type;
    }
    setAppliedFilters(filters);
    applyFilters(filters);
  };

  const onPressClose = (text: string) => {
    const deletedFilter = filters.filter((value) => value !== text);
    setFilters(deletedFilter);
    if (deletedFilter.length > 0) {
      removeFilter(text, appliedFilters);
    } else {
      setFilteredData(historyData);
    }
  };
  const handleSelectedTab = (tab: string, index: number) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (isShowTabs) {
      applyFilters({ transaction_type: selectedTab });
    }
  }, [selectedTab]);
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

      {isShowCard && <IPayShortHandAtmCard cardData={constants.ATM_CARD_DATA} />}

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
        {filteredData && filteredData.length ? (
          <IPayFlatlist
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <IPayTransactionItem transaction={item} onPressTransaction={openBottomSheet} />}
          />
        ) : (
          <IPayNoResult
            textColor={colors.primary.primary800}
            message={localizationText.TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY}
            showEmptyBox
          />
        )}
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
      <IPayFilterBottomSheet ref={filterRef} onSubmit={handleSubmit} />
      <IPayAlert
        icon={<IPayIcon icon={icons.clipboard_close} size={64} />}
        visible={alertVisible}
        closeOnTouchOutside
        animationType="fade"
        showIcon={false}
        title={localizationText.TRANSACTION_HISTORY.NO_RESULTS}
        onClose={() => {
          setAlertVisible(false);
        }}
        message={localizationText.TRANSACTION_HISTORY.NO_RESULTS_DETAIL}
        primaryAction={{
          text: localizationText.TRANSACTION_HISTORY.GOT_IT,
          onPress: () => {
            setAlertVisible(false);
          },
        }}
      />
    </IPaySafeAreaView>
  );
};

export default TransactionHistoryScreen;

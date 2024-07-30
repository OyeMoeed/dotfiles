import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayFilterBottomSheet, IPayShortHandAtmCard } from '@app/components/organism';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { LocalizationKeysMapping } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { TransactionsProp } from '@app/network/services/core/transaction/transaction.interface';
import getTransactions from '@app/network/services/core/transaction/transactions.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { heightMapping } from '../../components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import IPayTransactionItem from './component/ipay-transaction.component';
import { IPayTransactionItemProps } from './component/ipay-transaction.interface';
import FiltersArrayProps from './transaction-history.interface';
import transactionsStyles from './transaction-history.style';

const TransactionHistoryScreen: React.FC = ({ route }: any) => {
  const { isShowCard = true, isShowTabs = false } = route.params;
  const { transactionHistoryFilterData, transactionHistoryFilterDefaultValues } = useConstantData();
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
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<SubmitEvent | null>(null);
  const [filteredData, setFilteredData] = useState<IPayTransactionItemProps[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TRANSACTION_TABS[0]);
  const [transactionsData, setTransactionsData] = useState<IPayTransactionItemProps[]>([]);
  const [apiError, setAPIError] = useState<string>('');

  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const openBottomSheet = (item: IPayTransactionItemProps) => {
    const calculatedSnapPoint = ['1%', heightMapping[item.transactionRequestType], isAndroidOS ? '95%' : '100%'];
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    transactionRef.current?.present();
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  useState(() => {
    setFilteredData(transactionsData);
  });

  // Function to apply filters dynamically
  const applyFilters = (filtersArray: FiltersArrayProps) => {
    const filteredTemp = transactionsData.filter((item) => {
      const { amountFrom, amountTo, dateFrom, dateTo, transactionType } = filtersArray;
      const itemAmount = parseFloat(item.amount);
      const itemDate = moment(item.transaction_date, 'DD/MM/YYYY - HH:mm');

      const isAmountInRange =
        amountFrom && amountTo ? itemAmount >= parseFloat(amountFrom) && itemAmount <= parseFloat(amountTo) : true;

      const isDateInRange =
        dateFrom && dateTo
          ? itemDate.isSameOrAfter(moment(dateFrom, 'DD/MM/YYYY')) &&
            itemDate.isSameOrBefore(moment(dateTo, 'DD/MM/YYYY'))
          : true;
      const isTransactionTypeMatch = transactionType
        ? localizationText.TRANSACTION_HISTORY[LocalizationKeysMapping[item?.transaction_type]] === transactionType
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

  const removeFilter = (filter: string, allFilters: FiltersArrayProps) => {
    let updatedFilters = { ...allFilters };

    const isAmountRange = filter.includes('-') && filter.includes('SAR');
    const isDateRange = filter.includes('-') && !filter.includes('SAR');

    if (isAmountRange) {
      const [amountFrom, amountTo] = filter
        .replace(' SAR', '')
        .split(' - ')
        .map((s) => s.trim());

      if (allFilters.amount_from === amountFrom && allFilters.amount_to === amountTo) {
        updatedFilters = {
          ...updatedFilters,
          amount_from: '',
          amount_to: '',
        };
      }
    } else if (isDateRange) {
      const [dateFrom, dateTo] = filter.split(' - ').map((s) => s.trim());

      if (
        moment(allFilters.date_from, 'DD/MM/YYYY').isSame(dateFrom, 'day') &&
        moment(allFilters.date_to, 'DD/MM/YYYY').isSame(dateTo, 'day')
      ) {
        updatedFilters = {
          ...updatedFilters,
          date_from: '',
          date_to: '',
        };
      }
    } else if (allFilters.transaction_type === filter) {
      updatedFilters = {
        ...updatedFilters,
        transaction_type: '',
      };
    }

    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const onPressClose = (text: string) => {
    const deletedFilter = filters.filter((value) => value !== text);
    setFilters(deletedFilter);
    if (deletedFilter.length > 0) {
      removeFilter(text, appliedFilters);
    } else {
      setFilteredData(transactionsData);
    }
  };
  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
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

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getTransactionsData = async () => {
    renderSpinner(true);
    try {
      const payload: TransactionsProp = {
        walletNumber,
        maxRecords: '3',
        offset: '1',
      };
      const apiResponse: any = await getTransactions(payload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        setTransactionsData(apiResponse?.data?.transactions);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    if (isShowTabs) {
      applyFilters({ transactionType: selectedTab });
    }
  }, [selectedTab]);

  useEffect(() => {
    getTransactionsData();
  }, []);

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
      <IPayFilterBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.FILTER}
        defaultValues={transactionHistoryFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        onSubmit={handleSubmit}
        filters={transactionHistoryFilterData}
      />
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

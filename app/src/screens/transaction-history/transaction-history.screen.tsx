import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPaySpinner, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayFilterBottomSheet, IPayShortHandAtmCard } from '@app/components/organism';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import {
    CardsProp,
    FilterFormDataProp,
    TransactionsProp,
} from '@app/network/services/core/transaction/transaction.interface';
import {
    getCards,
    getTransactionTypes,
    getTransactions,
} from '@app/network/services/core/transaction/transactions.service';
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
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';

const TransactionHistoryScreen: React.FC = ({ route }: any) => {
  const {
    isW2WTransactions,
    isShowCard,
    isShowTabs = false,
    currentCard,
    contacts,
    isShowAmount = true,
  } = route.params;
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
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<SubmitEvent | null>(null);
  const [filteredData, setFilteredData] = useState<IPayTransactionItemProps[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TRANSACTION_TABS[0]);
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingW2W, setIsLoadingW2W] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<IPayTransactionItemProps[]>([]);
  const [cardsData, setCardssData] = useState<IPayTransactionItemProps[]>([]);
  const [transactionHistoryFilterData, setTransactionHistoryFilterData] = useState<any[]>();
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
  const applyFilters = (filtersArray: FiltersArrayProps) => {
    getTransactionsData(filtersArray);
  };

  const handleSubmit = (data: SubmitEvent) => {
    let filtersArray: any[] | ((prevState: string[]) => string[]) = [];
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR', data);
    } else if (Object.keys(data)?.length) {
      const transactionType = data.transaction_type;
      const dateRange = `${data.dateFrom} - ${data.dateTo}`;
      if (isShowAmount) {
        const amountRange = `${data.amountFrom} - ${data.amountTo}`;
        filtersArray = [transactionType, amountRange, dateRange];
      } else {
        filtersArray = [transactionType, dateRange];
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

  const getCardsData = async () => {
    renderSpinner(true);
    try {
      const payload: CardsProp = {
        walletNumber,
      };
      const apiResponse: any = await getCards(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setCardssData(apiResponse?.response?.cards);
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
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const getTrxReqTypeCode = (trxTypeName: string) => {
    console.log(trxTypeName);
    if (transactionHistoryFilterData) {
      let foundReqType = transactionHistoryFilterData[0]?.filterValues?.find((type: any) => {
        return type?.value == trxTypeName;
      });
      return foundReqType?.key;
    } else {
      return '';
    }
  };

  const getTransactionsData = async (filtersData?: any) => {
    renderSpinner(true);
    setIsLoading(true);
    try {
      const payload: TransactionsProp = {
        walletNumber,
        maxRecords: '50',
        offset: '1',
        fromDate: filtersData ? filtersData['dateFrom']?.replaceAll('/', '-') : '',
        toDate: filtersData ? filtersData['dateTo'].replaceAll('/', '-') : '',
        cardIndex: currentCard ? currentCard?.cardIndex : '',
        trxReqType: filtersData ? getTrxReqTypeCode(filtersData['transaction_type']) : '',
      };

      const apiResponse: any = await getTransactions(payload);

      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setTransactionsData(apiResponse?.response?.transactions);

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

  const mapFiltersTypes = (transactionTypesRes: []) => {
    const transactionTypesResMap = transactionTypesRes.map((transactionType: any, index: number) => ({
      id: index,
      key: transactionType?.transactionRequestType,
      value: transactionType?.defaultDescEn,
    }));

    return [
      {
        id: '1',
        label: localizationText.TRANSACTION_HISTORY.TRANSACTION_TYPE,
        type: FiltersType.TRANSACTION_TYPE,
        filterValues: transactionTypesResMap,
      },
    ];
  };

  const getTransactionTypesData = async () => {
    renderSpinner(true);
    try {
      const apiResponse: any = await getTransactionTypes();
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setTransactionHistoryFilterData(mapFiltersTypes(apiResponse?.response?.transactionRequestTypeRecs));
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
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    if (isW2WTransactions) {
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR');
    } else if (isShowTabs) {
      applyFilters({ transactionType: selectedTab });
    }
  }, [selectedTab]);

  useEffect(() => {
    if (isW2WTransactions) {
      setTransactionHistoryFilterData([]);
      getW2WTransactionsData(selectedTab === TRANSACTION_TABS[0] ? 'DR' : 'CR');
    } else {
      getTransactionTypesData();
      getTransactionsData();
    }
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

      {currentCard && (
        <IPayView style={styles.cardContainerStyleParent}>
          <IPayCardDetailsBannerComponent
            cardType={currentCard.cardType}
            cardTypeName={currentCard.cardHeaderText}
            carHolderName={currentCard.name}
            cardLastFourDigit={currentCard.cardNumber}
          />
        </IPayView>
      )}

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
          renderTrxsList()
        ) : (
          <>
            {!isLoading ? (
              <IPayNoResult
                textColor={colors.primary.primary800}
                message={localizationText.TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY}
              />
            ) : (
              <IPaySpinner hasBackgroundColor={false} />
            )}
          </>
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

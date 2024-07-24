import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import IPayTransactionItem from '../transaction-history/component/ipay-transaction.component';
import { CombinedTransactionItemProps } from '../transaction-history/component/ipay-transaction.interface';
import TransactionDetails from './components/transaction-details.component';
import internationalTransferHistoryData from './international-transfer-history.data';
import internationalTrHistoryStyles from './international-transfer-history.style';

const InternationalTransferHistory: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTrHistoryStyles();
  const localizationText = useLocalization();
  const [filteredData, setFilteredData] = useState<CombinedTransactionItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<CombinedTransactionItemProps | null>(null);
  const transactionDetailsBottomSheet = useRef<any>(null);
  const filterTabs = constants.TRANSACTION_FILTERS;

  const openBottomSheet = (item: CombinedTransactionItemProps) => {
    setTransaction(item);
    transactionDetailsBottomSheet.current?.present();
  };

  const closeBottomSheet = () => {
    transactionDetailsBottomSheet.current?.forceClose();
  };

  const onRefresh = () => {
    setFilteredData(internationalTransferHistoryData);
  };

  useEffect(() => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      setFilteredData(internationalTransferHistoryData);
      setIsLoading(false);
    });
  }, []);

  const onPressFilterTab = (filterKey: string) => {
    if (filterKey === 'All') {
      setFilteredData(internationalTransferHistoryData);
    } else {
      const key = filterKey.toLowerCase();
      const filterData = internationalTransferHistoryData.filter((item) => item.status === key);
      setFilteredData(filterData);
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={localizationText.COMMON.TRANSACTION_HISTORY}
        applyFlex
        rightComponent={
          <IPayPressable onPress={() => {}}>
            <IPayIcon icon={icons.filter} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.container}>
        <IPayTabs tabs={filterTabs} scrollEnabled scrollable onSelect={onPressFilterTab} />
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
      <IPayBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['1%', isAndroidOS ? '95%' : '100%']}
        ref={transactionDetailsBottomSheet}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <TransactionDetails transaction={transaction} onCloseBottomSheet={closeBottomSheet} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferHistory;

import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import IPayTransactionItem from '../transaction-history/component/ipay-transaction.component';
import { IPayTransactionItemProps } from '../transaction-history/component/ipay-transaction.interface';
import internationalTransferHistoryData from './international-transfer-history.data';
import internationalTrHistoryStyles from './international-transfer-history.style';

const InternationalTransferHistory: React.FC = () => {
  const { colors } = useTheme();
  const styles = internationalTrHistoryStyles();
  const localizationText = useLocalization();
  const [filteredData, setFilteredData] = useState<IPayTransactionItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const filterTabs = constants.TRANSACTION_FILTERS;

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
        {isLoading && <IPaySpinner />}

        <IPayView style={styles.listContainer}>
          {filteredData && filteredData.length ? (
            <IPayFlatlist
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
              textColor={colors.primary.primary800}
              message={localizationText.TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY}
              showEmptyBox
            />
          )}
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferHistory;

import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { transactionDateFormate } from '@app/components/organism/helper';
import IPayFilterBottomSheet from '@app/components/organism/ipay-filter-bottom-sheet/ipay-filter-bottom-sheet.component';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import { transactionOperations, transactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import React, { useRef, useState } from 'react';
import { heightMapping } from '../../components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import IPayTransactionItem from './component/ipay-transaction.component';
import { IPayTransactionItemProps } from './component/ipay-transaction.interface';
import transactionsStyles from './transaction-history.style';
import historyData from './transaction-history.constant';

const TransactionHistory: React.FC = ({ route }: any) => {
  const { transactionsData } = route.params;
  const { colors } = useTheme();
  const styles = transactionsStyles(colors);
  const localizationText = useLocalization();
  const [filters, setFilters] = useState<Array<string>>([]);
  const onPressClose = (text: string) => {
    setFilters(filters.filter((value) => value !== text));
  };
  const transactionRef = React.createRef<any>();
  const filterRef = useRef<any>(null);
  const [transaction, setTransaction] = useState<IPayTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const openBottomSheet = (item: IPayTransactionItemProps) => {
    const calculatedSnapPoint = ['1%', heightMapping[item.transaction_type], isAndroidOS ? '95%' : '100%'];
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    transactionRef.current?.present();
  };

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  const handleSubmit = (data: SubmitEvent) => {
    if (Object.keys(data)?.length) {
      const transactionType = data.transaction_type;
      const amountRange = `${data.amount_from} - ${data.amount_to} ${localizationText.sar}`;
      const dateRange = `${data.date_from} - ${data.date_to}`;

      const filtersArray = [transactionType, amountRange, dateRange];
      setFilters(filtersArray);
    } else {
      setFilters([]);
    }
  };
  const handleFiltersShow = () => {
    filterRef.current?.showFilters();
  };
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={localizationText.transactions_history}
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
      <IPayView style={styles.listContainer}>
        {historyData.length ? (
          <IPayFlatlist
            data={historyData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <IPayTransactionItem transaction={item} onPressTransaction={openBottomSheet} />}
          />
        ) : (
          <IPayNoResult
            textColor={colors.primary.primary800}
            message={localizationText.no_records_transactions_history}
            showEmptyBox
          />
        )}
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.transaction_details}
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
        title={localizationText.no_results}
        onClose={() => {
          setAlertVisible(false);
        }}
        message={localizationText.no_results_detail}
        primaryAction={{
          text: localizationText.got_it,
          onPress: () => {
            setAlertVisible(false);
          },
        }}
      />
    </IPaySafeAreaView>
  );
};

export default TransactionHistory;

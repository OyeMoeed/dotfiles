import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet, IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView, IPayTransactionHistory } from '@app/components/templates';
import { heightMapping } from '@app/components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import useConstantData from '@app/constants/use-constants';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { FiltersType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import IPayTransactionItem from '../transaction-history/component/ipay-transaction.component';
import beneficiaryHistoryData from './beneficiary-transaction-history.constants';
import { BeneficiaryTransactionItemProps, TransactionType } from './beneficiary-transaction-history.interface';
import transactionHistoryStyles from './beneficiary-transaction-history.style';

const BeneficiaryTransactionHistoryScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = transactionHistoryStyles();
  const localizationText = useLocalization();
  const filterRef = useRef<bottomSheetTypes>(null);
  const { transferHistoryFilterData, transferHistoryFilterDefaultValues } = useConstantData();

  const [activeTab, setActiveTab] = useState<string>(localizationText.COMMON.SENT);
  const transactionRef = React.createRef<any>();
  const [transaction, setTransaction] = useState<BeneficiaryTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);

  const tabOptions = [localizationText.COMMON.SENT, localizationText.COMMON.RECEIVED];

  const openBottomSheet = (item: BeneficiaryTransactionItemProps) => {
    const calculatedSnapPoint = ['1%', heightMapping[item.transactionRequestType], isAndroidOS ? '95%' : '100%'];
    setSnapPoint(calculatedSnapPoint);
    setTransaction(item);
    transactionRef.current?.present();
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

  return (
    <IPaySafeAreaView testID="transaction-section" style={styles.container}>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={localizationText.COMMON.TRANSACTIONS_HISTORY}
        applyFlex
        titleStyle={styles.capitalizeTitle}
        rightComponent={
          <IPayPressable onPress={handleFiltersShow}>
            <IPayIcon icon={icons.filter} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.contentContainer}>
        <IPayTabs onSelect={(tab) => setActiveTab(tab)} tabs={tabOptions} />
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
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
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
      <IPayFilterBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.FILTER}
        defaultValues={transferHistoryFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        filters={transferHistoryFilterData}
        applySearchOn={[FiltersType.BANK_NAME_LIST]}
      />
    </IPaySafeAreaView>
  );
};

export default BeneficiaryTransactionHistoryScreen;

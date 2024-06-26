import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayScrollView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayTransactionItem from './component/ipay-transaction.component';
import historyData from './transaction-history.constant';
import transactionsStyles from './transaction-history.style';

const TransactionHistory: React.FC = () => {
  const { colors } = useTheme();
  const styles = transactionsStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView style={styles.container} linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title={localizationText.transactions_history}
        applyFlex
        rightComponent={
          <IPayPressable>
            <IPayIcon testID="transaction-icon" icon={icons.filter} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayScrollView style={styles.listContainer}>
        {historyData.map((item) => (
          <IPayTransactionItem key={item.transaction_date} transaction={item} />
        ))}
      </IPayScrollView>
    </IPaySafeAreaView>
  );
};

export default TransactionHistory;

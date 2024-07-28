import { IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import useBillPaymentConfirmation from './traffic-violation-payment.hook';
import billPaymentStyles from './traffic-violation-payment.styles';

const TrafficViolationPaymentScreen: React.FC = () => {
  const { localizationText, billPayDetailes, headerData, balanceData } = useBillPaymentConfirmation();
  const { availableBalance, balance, calculatedBill } = balanceData;
  const { colors } = useTheme();
  const styles = billPaymentStyles(colors);
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.PAY_BILL.HEADER} backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayAccountBalance availableBalance={availableBalance} showRemainingAmount balance={balance} />
        <IPayBillDetailsOption data={billPayDetailes} />
      </IPayView>
      <SadadFooterComponent
        style={styles.margins}
        totalAmount={calculatedBill}
        btnText={localizationText.COMMON.CONFIRM}
        disableBtnIcons
      />
    </IPaySafeAreaView>
  );
};

export default TrafficViolationPaymentScreen;

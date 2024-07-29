import { IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import useBillPaymentConfirmation from './traffic-violation-payment.hook';
import billPaymentStyles from './traffic-violation-payment.styles';

const TrafficViolationPaymentScreen: React.FC = () => {
  const { localizationText, billPayDetailes, extraDetails, balanceData } = useBillPaymentConfirmation();
  const { availableBalance, balance, calculatedBill } = balanceData;
  const { colors } = useTheme();
  const styles = billPaymentStyles();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.PAY_BILL.HEADER} backBtn applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayAccountBalance availableBalance={availableBalance ?? 0} showRemainingAmount balance={balance ?? 0} />
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <>
            <IPayBillDetailsOption showHeader={false} data={billPayDetailes} />
            <IPayBillDetailsOption showHeader={false} data={extraDetails} style={styles.listBottomView} />
          </>
        </IPayScrollView>
      </IPayView>
      <SadadFooterComponent
        style={styles.margins}
        totalAmount={calculatedBill ?? 0}
        btnText={localizationText.COMMON.PAY}
        disableBtnIcons
        backgroundGradient={colors.appGradient.buttonBackground}
      />
    </IPaySafeAreaView>
  );
};

export default TrafficViolationPaymentScreen;

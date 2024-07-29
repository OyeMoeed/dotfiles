import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import React from 'react';
import moiPaymentStyls from './moi-payment.styles';
import useMoiPayment from './moi-payments-details.hook';

const MoiPaymentScreen: React.FC = () => {
  const styles = moiPaymentStyls();
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { availableBalance, currentBalance } = walletInfo;
  const { moiPaymentDetailes } = useMoiPayment();
  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.BILL_PAYMENTS.MOI_PAYMENT}
        titleStyle={styles.screenTitle}
      />
      <IPayView style={styles.container}>
        <IPayAccountBalance balance={availableBalance} availableBalance={currentBalance} showRemainingAmount />
        <IPayBillDetailsOption data={moiPaymentDetailes} optionsStyles={styles.moiPaymentDetailesTab} />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          btnText={localizationText.SADAD.COMPLETE_PAYMENT}
          warning={localizationText.BILL_PAYMENTS.INSUFFICIENT_BALANCE}
          btnRightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MoiPaymentScreen;

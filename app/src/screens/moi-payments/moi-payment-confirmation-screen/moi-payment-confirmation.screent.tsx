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
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import moiPaymentConfirmationStyls from './moi-payment-confirmation.styles';

const MoiPaymentConfirmationScreen: React.FC = () => {
  const styles = moiPaymentConfirmationStyls();
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { availableBalance, currentBalance } = walletInfo;
  const { moiPaymentDetailes } = useMoiPaymentConfirmation();

  // temporary TODO
  const totalAmount = '500';

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
        <IPayBillDetailsOption
          data={moiPaymentDetailes}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          btnText={localizationText.SADAD.COMPLETE_PAYMENT}
          totalAmount={totalAmount}
          btnRightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MoiPaymentConfirmationScreen;

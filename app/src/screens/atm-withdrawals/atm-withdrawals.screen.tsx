import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayProgressBar,
  IPayScrollView,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayBottomSheet, IPayNearestAtmComponent, IPayRemainingAccountBalance } from '@app/components/organism';
import IPayAtmWithdrawalTurtorials from '@app/components/organism/ipay-atm-withdrawal-tutorial/ipay-atm-withdrawal-tutorial.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-comma-helper.util';
import React, { useRef } from 'react';
import atmWithdrawalsStyles from './atm-withdrawals.style';

const AtmWithdrawals: React.FC = ({ route }: any) => {
  const { hideBalance } = route.params;
  const { colors } = useTheme();
  const styles = atmWithdrawalsStyles(colors);
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { limitsDetails, availableBalance, currentBalance } = walletInfo;
  const { monthlyRemainingOutgoingAmount } = limitsDetails;
  const withdrawTutorialsRef = useRef<any>(null);

  const currentBalanceValue: string = ` ${localizationText.of} ${hideBalance ? '*****' : formatNumberWithCommas(currentBalance)}`;
  const monthlyRemainingOutgoingBalance: string = hideBalance
    ? '*****'
    : formatNumberWithCommas(monthlyRemainingOutgoingAmount);

  const onPressNearetAtm = () => {
    navigate(screenNames.NEAREST_ATM);
  };

  const onPressLearnWithdrawalSteps = () => {
    withdrawTutorialsRef?.current?.present();
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.ATM_Withdrawals} applyFlex />

      <IPayView style={styles.container}>
        <IPayView style={styles.accountBalanceView}>
          <IPayView style={styles.commonContainer}>
            <IPayView>
              <IPayFootnoteText text={localizationText.accountBalance} />

              <IPayView style={styles.balanceContainer}>
                <IPayTitle2Text
                  style={styles.balanceTextStyle}
                  text={hideBalance ? '*****' : `${formatNumberWithCommas(availableBalance)}`}
                />
                <IPayFootnoteText style={styles.currencyStyle} text={localizationText.sar} />
              </IPayView>
            </IPayView>
            <IPayButton
              onPress={() => {}}
              medium
              btnType={buttonVariants.OUTLINED}
              leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
              btnText={localizationText.topUp}
            />
          </IPayView>
          <IPayView style={styles.gap}>
            <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
          </IPayView>

          <IPayView style={[styles.gap, styles.commonContainer]}>
            <IPayCaption2Text text={localizationText.remainingAmount} />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text style={styles.textBold} text={monthlyRemainingOutgoingBalance} />
              <IPayCaption2Text text={currentBalanceValue} />
            </IPayView>
          </IPayView>
        </IPayView>
        <IPayScrollView>
          <IPayRemainingAccountBalance
            walletInfo={walletInfo}
            topUpBtnVariant={buttonVariants.OUTLINED}
            showProgress={false}
            showIcon={false}
            qrScanBtn
          />
          <IPayNearestAtmComponent
            style={styles.nearestAtmView}
            onPressNearetAtm={onPressNearetAtm}
            onPressLearnWithdrawalSteps={onPressLearnWithdrawalSteps}
          />
        </IPayScrollView>
      </IPayView>

      <IPayBottomSheet
        heading={localizationText.ATM_WITHDRAWAL.WITHDRAW_TUTORIAL}
        customSnapPoint={['20%', '80%']}
        ref={withdrawTutorialsRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayAtmWithdrawalTurtorials />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default AtmWithdrawals;

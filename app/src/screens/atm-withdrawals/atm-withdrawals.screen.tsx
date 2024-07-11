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
import { buttonVariants, payChannel } from '@app/utilities/enums.util';

import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { useMemo, useRef, useState } from 'react';
import atmWithdrawalsStyles from './atm-withdrawals.style';

const AtmWithdrawalsScreen: React.FC = ({ route }: any) => {
  const { hideBalance } = route.params;
  const { colors } = useTheme();
  const styles = atmWithdrawalsStyles(colors);
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { limitsDetails, availableBalance, currentBalance } = walletInfo;
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [chipValue, setChipValue] = useState<string>('');
  const withdrawTutorialsRef = useRef<any>(null);

  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, dailyOutgoingLimit, monthlyOutgoingLimit } =
    limitsDetails;

  const currentBalanceFormatted: string = ` ${localizationText.HOME.OF} ${hideBalance ? '*****' : formatNumberWithCommas(currentBalance)}`;
  const monthlyRemainingOutgoingBalanceFormatted: string = hideBalance
    ? '*****'
    : formatNumberWithCommas(limitsDetails.monthlyRemainingOutgoingAmount);

  const onPressNearetAtm = () => {
    navigate(screenNames.NEAREST_ATM);
  };

  const onPressLearnWithdrawalSteps = () => {
    withdrawTutorialsRef?.current?.present();
  };

  const isQrBtnDisabled = useMemo(
    () =>
      !(
        monthlyRemainingOutgoingAmount !== '0' &&
        topUpAmount.length > 0 &&
        topUpAmount <= availableBalance &&
        (dailyRemainingOutgoingAmount || topUpAmount <= monthlyRemainingOutgoingAmount)
      ),
    [topUpAmount, walletInfo],
  );
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.HOME.ATM_WITHDRAWALS} applyFlex />

      <IPayView style={styles.container}>
        <IPayView style={styles.accountBalanceView}>
          <IPayView style={styles.commonContainer}>
            <IPayView>
              <IPayFootnoteText text={localizationText.HOME.ACCOUNT_BALANCE} />

              <IPayView style={styles.balanceContainer}>
                <IPayTitle2Text
                  style={styles.balanceTextStyle}
                  text={hideBalance ? '*****' : `${formatNumberWithCommas(availableBalance)}`}
                />
                <IPayFootnoteText style={[styles.currencyStyle]} text={localizationText.COMMON.SAR} />
              </IPayView>
            </IPayView>
            <IPayButton
              onPress={() => {}}
              medium
              btnType={buttonVariants.OUTLINED}
              leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
              btnText={localizationText.COMMON.TOP_UP}
            />
          </IPayView>
          <IPayView style={styles.gap}>
            <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
          </IPayView>

          <IPayView style={[styles.gap, styles.commonContainer]}>
            <IPayCaption2Text text={localizationText.HOME.REMAINING_AMOUNT} />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text style={styles.textBold} text={monthlyRemainingOutgoingBalanceFormatted} />
              <IPayCaption2Text text={currentBalanceFormatted} />
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
            payChannelType={payChannel.ATM}
            showQuickAmount
            isQrBtnDisabled={isQrBtnDisabled}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
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

export default AtmWithdrawalsScreen;

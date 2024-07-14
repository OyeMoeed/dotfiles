import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayIcon, IPayProgressBar, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';

import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayBalanceBoxProps } from './ipay-topup-box.interface';
import topUpBoxStyles from './ipay-topup-box.styles';

const IPayTopUpBox: React.FC<IPayBalanceBoxProps> = ({
  availableBalance,
  currentBalance,
  monthlyRemainingOutgoingBalance,
  isShowProgressBar,
  isShowRemaining,
  isShowTopup,
  testID,
  onTopUpPress,
}: IPayBalanceBoxProps) => {
  const { colors } = useTheme();
  const styles = topUpBoxStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView testID={`${testID}-balance-box`} style={styles.container}>
      <IPayView style={styles.accountBalanceView}>
        <IPayView style={styles.commonContainer}>
          <IPayView>
            <IPayCaption2Text text={localizationText.TOPUP_CONFIRMATION.ACCOUNT_BALANCE} />
            <IPayView style={styles.balanceContainer}>
              <IPaySubHeadlineText style={styles.balanceTextStyle} text={availableBalance} />
              <IPaySubHeadlineText regular style={[styles.currencyStyle]} text={localizationText.COMMON.SAR} />
            </IPayView>
          </IPayView>
          {isShowTopup && (
            <IPayButton
              onPress={onTopUpPress}
              small
              btnType="outline"
              leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
              btnText={localizationText.TOPUP_CONFIRMATION.TOP_UP}
            />
          )}
        </IPayView>
        {isShowProgressBar && (
          <IPayView style={[styles.gap]}>
            <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
          </IPayView>
        )}
        {isShowRemaining && (
          <IPayView style={[styles.gap, styles.commonContainer]}>
            <IPayCaption2Text text={localizationText.TOPUP_CONFIRMATION.REMAINING_AMOUNT} />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text regular={false} text={monthlyRemainingOutgoingBalance} />
              <IPayCaption2Text text={currentBalance} />
            </IPayView>
          </IPayView>
        )}
      </IPayView>
    </IPayView>
  );
};

export default IPayTopUpBox;

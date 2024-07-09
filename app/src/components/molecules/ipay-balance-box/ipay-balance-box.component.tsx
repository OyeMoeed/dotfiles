import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayProgressBar,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView
} from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { IPayBalanceBoxProps } from '@app/components/organism/ipay-balance/ipay-balance-box.interface';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayBalanceBoxStyles from './ipay-balance-box.styles';

const IPayTopUpBox: React.FC<IPayBalanceBoxProps> = ({
  availableBalance,
  currentBalance,
  monthlyRemainingOutgoingBalance,
  isShowProgressBar,
  isShowRemaining,
  isShowTopup
}: any) => {
  const { colors } = useTheme();
  const styles = IPayBalanceBoxStyles(colors);
  const localizationText = useLocalization();


  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.accountBalanceView}>
        <IPayView style={styles.commonContainer}>
          <IPayView>
            <IPayCaption2Text text={localizationText.accountBalance} />

            <IPayView style={styles.balanceContainer}>
              <IPaySubHeadlineText
                style={styles.balanceTextStyle}
                text={availableBalance}
              />
              <IPaySubHeadlineText regular style={[styles.currencyStyle]} text={localizationText.sar} />
            </IPayView>
          </IPayView>
          {isShowTopup && (
            <IPayButton
              onPress={() => { }}
              medium
              btnType='outline'
              leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
              btnText={localizationText.topUp}
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
            <IPayCaption2Text text={localizationText.remainingAmount} />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text style={styles.textBold} text={monthlyRemainingOutgoingBalance} />
              <IPayCaption2Text text={currentBalance} />
            </IPayView>
          </IPayView>

        )}
      </IPayView>
    </IPayView>
  );
};

export default IPayTopUpBox;

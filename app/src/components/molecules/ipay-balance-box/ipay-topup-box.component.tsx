import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayIcon, IPayProgressBar, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';

import useTheme from '@app/styles/hooks/theme.hook';
import { balancePercentage, formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@app/utilities';
import { IPayBalanceBoxProps } from './ipay-topup-box.interface';
import topUpBoxStyles from './ipay-topup-box.styles';

const IPayTopUpBox: React.FC<IPayBalanceBoxProps> = ({
  availableBalance,
  isShowProgressBar,
  isShowRemaining,
  isShowTopup,
  testID,
  monthlyRemainingIncommingAmount,
  monthlyIncomingLimit,
  onTopUpPress,
}: IPayBalanceBoxProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = topUpBoxStyles(colors);
  const remainingTopupLimit = parseFloat(String(monthlyRemainingIncommingAmount));
  const monthlyTopupLimit = parseFloat(monthlyIncomingLimit);

  return (
    <IPayView testID={`${testID}-balance-box`} style={styles.container}>
      <IPayView style={styles.accountBalanceView}>
        <IPayView style={styles.commonContainer}>
          <IPayView>
            <IPayCaption2Text color={colors.primary.primary900} text="TOPUP_CONFIRMATION.ACCOUNT_BALANCE" />
            <IPayView style={styles.balanceContainer}>
              <IPaySubHeadlineText
                color={colors.primary.primary900}
                style={styles.balanceTextStyle}
                text={`${availableBalance}`}
                shouldTranslate={false}
              />
              <IPaySubHeadlineText
                color={colors.primary.primary900}
                regular
                style={styles.currencyStyle}
                text="COMMON.SAR"
              />
            </IPayView>
          </IPayView>
          {isShowTopup && (
            <IPayButton
              btnStyle={styles.topUpButtonStyle}
              onPress={onTopUpPress}
              btnType={buttonVariants.OUTLINED}
              leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.primary.primary500} />}
              btnText="TOPUP_CONFIRMATION.TOP_UP"
            />
          )}
        </IPayView>
        {isShowProgressBar && (
          <IPayView style={styles.gap}>
            <IPayProgressBar
              gradientWidth={`${balancePercentage(monthlyTopupLimit, remainingTopupLimit)}%`}
              colors={colors.gradientSecondary}
            />
          </IPayView>
        )}
        {isShowRemaining && (
          <IPayView style={[styles.gap, styles.commonContainer]}>
            <IPayCaption2Text text="TOPUP_CONFIRMATION.REMAINING_AMOUNT" />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text regular={false} text={formatNumberWithCommas(remainingTopupLimit)} />
              <IPayCaption2Text text={` ${t('HOME.OF')} ${formatNumberWithCommas(monthlyTopupLimit)}`} />
            </IPayView>
          </IPayView>
        )}
      </IPayView>
    </IPayView>
  );
};

export default IPayTopUpBox;

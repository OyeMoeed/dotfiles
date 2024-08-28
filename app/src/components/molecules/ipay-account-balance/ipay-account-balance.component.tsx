import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayIcon, IPayProgressBar, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React from 'react';
import { IPayAccountBalanceProps } from './ipay-account-balance.interface';
import ipayAccountBalanceStyles from './ipay-account-balance.style';

const IPayAccountBalance: React.FC<IPayAccountBalanceProps> = ({
  style,
  balance,
  availableBalance,
  hideBalance,
  showRemainingAmount = false,
  onPressTopup,
  accountBalanceTextStyle,
  currentBalanceTextStyle,
  currencyTextStyle,
  remainingAmountTextStyle,
  currentAvailableTextStyle,
  totalAvailableTextStyle,
  gradientWidth,
  gradientColors,
  gradientBgStyle,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = ipayAccountBalanceStyles(colors);

  const currentAvailableBalance = hideBalance ? '*****' : `${formatNumberWithCommas(balance)}`;
  const totalAvailableBalance = hideBalance ? '*****' : `${formatNumberWithCommas(availableBalance || '0')}`;

  return (
    <IPayView testID="account-balance-component" style={[styles.container, style]}>
      <IPayView style={styles.accountBalanceView}>
        <IPayView style={styles.textContainer}>
          <IPayCaption2Text
            color={colors.primary.primary900}
            text={localizationText.HOME.ACCOUNT_BALANCE}
            style={[styles.textColor, accountBalanceTextStyle]}
          />
          <IPayView style={styles.balanceContainer}>
            <IPaySubHeadlineText
              color={colors.primary.primary900}
              testID="balance-text"
              style={[styles.textColor, currentBalanceTextStyle]}
              text={currentAvailableBalance}
            />
            <IPaySubHeadlineText
              color={colors.primary.primary900}
              style={[styles.textColor, currencyTextStyle]}
              regular
              text={` ${localizationText.COMMON.SAR}`}
            />
          </IPayView>
        </IPayView>

        <IPayButton
          testID="topup-button"
          onPress={onPressTopup}
          medium
          btnType={buttonVariants.OUTLINED}
          leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.primary.primary500} />}
          btnText={localizationText.COMMON.TOP_UP}
          textColor={colors.primary.primary500}
          btnStyle={styles.topUpButton}
        />
      </IPayView>

      {showRemainingAmount && (
        <IPayView>
          <IPayView style={styles.gap}>
            <IPayProgressBar
              gradientWidth={gradientWidth || '60%'}
              colors={gradientColors || colors.gradientTertiary}
              style={gradientBgStyle}
            />
          </IPayView>

          <IPayView style={[styles.gap, styles.commonContainer]}>
            <IPayCaption2Text
              color={colors.natural.natural700}
              style={remainingAmountTextStyle}
              text={localizationText.HOME.REMAINING_AMOUNT}
            />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text regular={false} style={currentAvailableTextStyle} text={currentAvailableBalance} />
              <IPayCaption2Text style={totalAvailableTextStyle} text={` ${localizationText.HOME.OF} `} />
              <IPayCaption2Text text={totalAvailableBalance} />
            </IPayView>
          </IPayView>
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayAccountBalance;

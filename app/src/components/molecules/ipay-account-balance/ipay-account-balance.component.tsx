import React from 'react';
import { useTranslation } from 'react-i18next';

import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayIcon, IPayProgressBar, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';

import { IPayAccountBalanceProps } from './ipay-account-balance.interface';
import ipayAccountBalanceStyles from './ipay-account-balance.style';

const IPayAccountBalance: React.FC<IPayAccountBalanceProps> = ({
  style,
  balance,
  availableBalance,
  monthlyIncomingLimit,
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
  topUpBtnStyle = {},
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = ipayAccountBalanceStyles(colors);

  const currentAvailableBalance = hideBalance ? '*****' : `${formatNumberWithCommas(balance)}`;
  const monthlyAvailableBalance = hideBalance ? '*****' : `${formatNumberWithCommas(monthlyIncomingLimit)}`;
  const totalAvailableBalance = hideBalance ? '*****' : `${formatNumberWithCommas(availableBalance || '0')}`;

  return (
    <IPayView testID="account-balance-component" style={[styles.container, style]}>
      <IPayView style={styles.accountBalanceView}>
        <IPayView style={styles.textContainer}>
          <IPayCaption2Text
            color={colors.primary.primary900}
            text="HOME.ACCOUNT_BALANCE"
            style={[styles.textColor, accountBalanceTextStyle]}
          />
          <IPayView style={styles.balanceContainer}>
            <IPaySubHeadlineText
              color={colors.primary.primary900}
              testID="balance-text"
              style={[styles.textColor, currentBalanceTextStyle]}
              text={`${currentAvailableBalance} `}
              shouldTranslate={false}
            />
            <IPaySubHeadlineText
              color={colors.primary.primary900}
              style={[styles.textColor, currencyTextStyle]}
              regular
              text="COMMON.SAR"
            />
          </IPayView>
        </IPayView>

        <IPayButton
          testID="topup-button"
          onPress={onPressTopup}
          small
          btnStyle={[styles.topupButton, topUpBtnStyle]}
          btnType={buttonVariants.OUTLINED}
          leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.primary.primary500} />}
          btnText="COMMON.TOP_UP"
          textColor={colors.primary.primary500}
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
              text="HOME.REMAINING_AMOUNT"
            />
            <IPayView style={styles.remainingBalanceView}>
              <IPayCaption2Text
                regular={false}
                style={currentAvailableTextStyle}
                text={monthlyAvailableBalance}
                shouldTranslate={false}
              />
              <IPayCaption2Text
                style={totalAvailableTextStyle}
                color={colors.natural.natural500}
                text={` ${t('HOME.OF')} `}
                shouldTranslate={false}
              />
              <IPayCaption2Text
                text={totalAvailableBalance}
                color={colors.natural.natural500}
                shouldTranslate={false}
              />
            </IPayView>
          </IPayView>
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayAccountBalance;

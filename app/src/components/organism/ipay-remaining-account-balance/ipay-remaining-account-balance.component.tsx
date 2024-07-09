import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayProgressBar, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayButton, IPayChip } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import calculateProgress from '@app/utilities/calculate-progress.util';
import { payChannel, variants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/numberComma-helper.util';
import React, { useEffect, useMemo, useState } from 'react';
import ipayRemainingAccountBalanceStyles from './ipay-remaining-account-balance.component.styles';
import { IPayRemainingBalanceProps } from './ipay-remaining-account-balance.interface';

const IPayRemainingAccountBalance: React.FC<IPayRemainingBalanceProps> = ({
  testID,
  walletInfo,
  showProgress = true,
  payChannelType = payChannel.ATM,
}) => {
  const { colors } = useTheme();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [chipValue, setChipValue] = useState('');
  const styles = ipayRemainingAccountBalanceStyles(colors);
  const localizationText = useLocalization();

  const handleTopUp = (text: number) => {
    const newAmount = text;
    setTopUpAmount(newAmount.toString());
  };

  const limitsDetails = walletInfo.limitsDetails;

  const handleAmountChange = (text: number) => {
    const newAmount = text;
    setTopUpAmount(newAmount.toString());
  };

  useEffect(() => {
    const monthlyRemaining = parseFloat(limitsDetails.monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(limitsDetails.dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));

    if (monthlyRemaining === 0) {
      setChipValue(localizationText.TOP_UP.LIMIT_REACHED);
    } else if (updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining) {
      setChipValue(localizationText.TOP_UP.DAILY_LIMIT);
    } else if (updatedTopUpAmount > monthlyRemaining) {
      setChipValue(localizationText.TOP_UP.AMOUNT_EXCEEDS_CURRENT);
    } else {
      setChipValue('');
    }
  }, [
    topUpAmount,
    limitsDetails.monthlyRemainingOutgoingAmount,
    limitsDetails.dailyRemainingOutgoingAmount,
    localizationText,
  ]);

  const remainingProgress: string = useMemo(() => {
    return calculateProgress(
      parseFloat(limitsDetails.monthlyRemainingOutgoingAmount),
      parseFloat(limitsDetails.monthlyOutgoingLimit),
    );
  }, [limitsDetails.monthlyRemainingOutgoingAmount, limitsDetails.monthlyOutgoingLimit]);

  const quickAmounts = payChannelType === payChannel.ATM ? constants.QUICK_AMOUNT_ATM : constants.QUICK_AMOUNT_CARD;

  return (
    <IPayView testID={`${testID}-remaining-balane`} style={styles.cardContainer}>
      <IPayFootnoteText text={localizationText.TOP_UP.ENTER_AMOUNT} color={colors.natural.natural700} />

      <IPayAmountInput
        showIcon
        amount={topUpAmount}
        onAmountChange={handleAmountChange}
        disabled={limitsDetails.monthlyRemainingOutgoingAmount !== '0'}
      />

      {chipValue && (
        <IPayChip
          textValue={chipValue}
          variant={variants.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={<IPayIcon icon={icons.warning} color={colors.critical.critical800} size={16} />}
        />
      )}

      {showProgress && (
        <>
          <IPayProgressBar
            style={styles.progressStyles}
            gradientWidth={remainingProgress}
            colors={colors.gradientPrimary}
          />

          <IPayView style={styles.topUpContainer}>
            <IPayCaption2Text text={localizationText.TOP_UP.REMAINING} style={styles.naturalStyles} />
            <IPayView style={styles.amountValues}>
              <IPayCaption2Text style={styles.totalAmount} regular={false}>
                {formatNumberWithCommas(limitsDetails.monthlyRemainingOutgoingAmount)}
              </IPayCaption2Text>
              <IPayCaption2Text
                style={styles.naturalStyles}
                text={` ${localizationText.of} ${formatNumberWithCommas(walletInfo.limitsDetails.monthlyOutgoingLimit)}`}
              />
            </IPayView>
          </IPayView>
        </>
      )}

      <IPayView style={styles.buttonContainer}>
        {quickAmounts.map((amountItem, index) => (
          <IPayButton
            key={index}
            btnText={`${amountItem.text} ${localizationText.COMMON.SAR}`}
            btnType="primary"
            btnIconsDisabled
            btnStyle={[
              styles.buttonBg,
              {
                backgroundColor:
                  limitsDetails.monthlyRemainingOutgoingAmount === '0'
                    ? colors.natural.natural200
                    : colors.secondary.secondary100,
              },
            ]}
            textColor={colors.secondary.secondary800}
            onPress={() => handleTopUp(amountItem.value)}
            disabled={limitsDetails.monthlyRemainingOutgoingAmount === '0'}
          />
        ))}
      </IPayView>
    </IPayView>
  );
};

export default IPayRemainingAccountBalance;

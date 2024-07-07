import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayProgressBar, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayButton, IPayChip } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import calculateProgress from '@app/utilities/calculate-progress.util';
import { buttonVariants, payChannel, variants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/numberComma-helper.util';
import { removeCommas } from '@utilities/number-helper.util';
import React, { useEffect, useMemo, useState } from 'react';
import ipayRemainingAccountBalanceStyles from './ipay-remaining-account-balance.component.styles';
import { IPayRemainingBalanceProps } from './ipay-remaining-account-balance.interface';

const IPayRemainingAccountBalance: React.FC<IPayRemainingBalanceProps> = ({
  testID,
  walletInfo,
  showProgress = true,
  payChannelType = payChannel.ATM,
  showIcon,
  qrScanBtn,
}) => {
  const { colors } = useTheme();
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [chipValue, setChipValue] = useState<string>('');
  const styles = ipayRemainingAccountBalanceStyles(colors);
  const localizationText = useLocalization();

  const handleTopUp = (text: number) => {
    const newAmount = text;
    setTopUpAmount(newAmount.toString());
  };

  const { limitsDetails } = walletInfo;

  const handleAmountChange = (text: string) => {
    const newAmount = removeCommas(text);
    const reg = regex.NUMBERS_ONLY; // Matches an empty string or any number of digits
    if (reg.test(newAmount.toString())) {
      setTopUpAmount(newAmount.toString());
    }
  };

  useEffect(() => {
    const monthlyRemaining = parseFloat(limitsDetails.monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(limitsDetails.dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));
    const dailyOutgoingLimit = parseFloat(limitsDetails?.dailyOutgoingLimit);

    if (monthlyRemaining === 0) {
      setChipValue(localizationText.limit_reached);
    } else if (updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining) {
      setChipValue(`${localizationText.daily_limit}${dailyOutgoingLimit} ${localizationText.SAR}`);
    } else if (updatedTopUpAmount > monthlyRemaining) {
      setChipValue(localizationText.amount_exceeds_current);
    } else {
      setChipValue('');
    }
  }, [
    topUpAmount,
    limitsDetails.monthlyRemainingOutgoingAmount,
    limitsDetails.dailyRemainingOutgoingAmount,
    localizationText,
  ]);

  const remainingProgress: string = useMemo(
    () =>
      calculateProgress(
        parseFloat(limitsDetails.monthlyRemainingOutgoingAmount),
        parseFloat(limitsDetails.monthlyOutgoingLimit),
      ),
    [limitsDetails.monthlyRemainingOutgoingAmount, limitsDetails.monthlyOutgoingLimit],
  );

  const quickAmounts = payChannelType === payChannel.ATM ? constants.QUICK_AMOUNT_ATM : constants.QUICK_AMOUNT_CARD;

  const isQrBtnDisabled = useMemo(() => {
    return !(
      limitsDetails.monthlyRemainingOutgoingAmount !== '0' &&
      topUpAmount.length > 0 &&
      topUpAmount <= walletInfo.availableBalance &&
      (limitsDetails.dailyRemainingOutgoingAmount || topUpAmount <= limitsDetails.monthlyRemainingOutgoingAmount)
    );
  }, [limitsDetails, topUpAmount, walletInfo]);

  return (
    <IPayView testID={`${testID}-remaining-balane`} style={styles.cardContainer}>
      <IPayFootnoteText text={localizationText.enter_amount} color={colors.natural.natural700} />

      <IPayAmountInput
        showIcon={showIcon}
        amount={topUpAmount}
        onAmountChange={handleAmountChange}
        disabled={limitsDetails.monthlyRemainingOutgoingAmount !== '0'}
      />

      {chipValue ? (
        <IPayChip
          textValue={chipValue}
          variant={variants.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={<IPayIcon icon={icons.warning} color={colors.critical.critical800} size={16} />}
        />
      ) : (
        <IPayCaption2Text
          regular={false}
          text={localizationText.amount_should_be_multiple_of_hundred}
          color={colors.natural.natural700}
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
            <IPayCaption2Text text={localizationText.remaining} style={styles.naturalStyles} />
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
            btnText={`${amountItem.text} ${localizationText.sar}`}
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

      {qrScanBtn && (
        <IPayButton
          disabled={isQrBtnDisabled}
          btnType={buttonVariants.PRIMARY}
          large
          btnText={localizationText.scan_qr_code}
          leftIcon={
            <IPayIcon
              icon={icons.scan}
              size={20}
              color={isQrBtnDisabled ? colors.natural.natural300 : colors.natural.natural0}
            />
          }
          btnStyle={styles.scanBtn}
        />
      )}
    </IPayView>
  );
};

export default IPayRemainingAccountBalance;

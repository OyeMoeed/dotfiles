import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayButton, IPayCardSelector, IPayChip } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import { States, TopUpStates, buttonVariants, payChannel } from '@app/utilities/enums.util';
import { isMultipleOfHundred, removeCommas } from '@app/utilities/number-helper.util';
import React from 'react';
import IPayBalanceProgressbar from '../ipay-balance-progressbar/ipay-balance-progressbar.component';
import IPayQuickActions from '../ipay-quick-actions/ipay-quick-actions.component';
import ipayRemainingAccountBalanceStyles from './ipay-remaining-account-balance.component.styles';
import IPayRemainingBalanceProps from './ipay-remaining-account-balance.interface';

const IPayRemainingAccountBalance: React.FC<IPayRemainingBalanceProps> = ({
  testID,
  showProgress = true,
  topUpAmount = 0,
  setTopUpAmount,
  walletInfo,
  onPressAddCards,
  chipValue,
  payChannelType = payChannel.ATM,
  openPressExpired,
  currentState,
  handleCardSelect,
  showQuickAmount,
  showIcon,
  isEditable = true,
  onPressIcon,
  qrScanBtn,
  isQrBtnDisabled,
  onPressQR,
  currencyStyle,
  inputStyles,
  defaultValue = '0',
  balanceType = 'Outgoing',
}) => {
  const { colors } = useTheme();
  const styles = ipayRemainingAccountBalanceStyles(colors);
  const localizationText = useLocalization();
  const { limitsDetails } = walletInfo;

  const handleAmountChange = (text: string) => {
    const newAmount = removeCommas(text);
    const reg = regex.NUMBERS_ONLY; // Matches an empty string or any number of digits
    if (reg.test(newAmount.toString())) {
      setTopUpAmount?.(newAmount.toString());
    }
  };

  return (
    <IPayView testID={`${testID}-remaining-balance`} style={styles.cardContainer}>
      <IPayView style={styles.centerAlign}>
        <IPayFootnoteText
          text={
            currentState === TopUpStates.SAVED_CARD
              ? localizationText.TRANSACTION_HISTORY.AMOUNT
              : localizationText.TOP_UP.ENTER_AMOUNT
          }
          color={colors.natural.natural700}
        />
        <IPayAmountInput
          currentState={currentState}
          showIcon={showIcon}
          currencyStyle={currencyStyle}
          inputStyles={inputStyles}
          defaultValue={defaultValue}
          amount={topUpAmount}
          onAmountChange={handleAmountChange}
          disabled={limitsDetails.monthlyRemainingOutgoingAmount !== '0'}
          isEditable={isEditable}
          handleIconPress={onPressIcon}
        />
      </IPayView>
      {chipValue && (
        <IPayChip
          textValue={chipValue}
          variant={States.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={
            <IPayIcon
              icon={chipValue === localizationText.TOP_UP.LIMIT_REACHED ? icons.warning : icons.shield_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      )}
      {!isMultipleOfHundred(Number(topUpAmount)) && payChannelType === payChannel.ATM && (
        <IPayCaption2Text
          regular={false}
          text={localizationText.ATM.MULTIPLE_OF_HUNDERED}
          color={colors.natural.natural700}
          style={styles.chipContainer}
        />
      )}
      {(currentState === TopUpStates.INITAL_STATE || showQuickAmount) && (
        <>
          {showProgress && (
            <IPayBalanceProgressbar
              monthlyRemainingOutgoingAmount={
                balanceType === 'Outgoing'
                  ? limitsDetails.monthlyRemainingOutgoingAmount
                  : limitsDetails.monthlyRemainingIncomingAmount
              }
              monthlyOutgoingLimit={
                balanceType === 'Outgoing' ? limitsDetails.monthlyOutgoingLimit : limitsDetails.monthlyIncomingLimit
              }
            />
          )}
          <IPayQuickActions
            payChannelType={payChannelType}
            setTopUpAmount={setTopUpAmount}
            monthlyRemainingOutgoingAmount={limitsDetails.monthlyRemainingOutgoingAmount}
          />
        </>
      )}

      {currentState === TopUpStates.SAVED_CARD && (
        <IPayCardSelector
          openPressExpired={openPressExpired}
          onPressAddCard={onPressAddCards}
          onCardSelect={handleCardSelect}
        />
      )}

      {qrScanBtn && (
        <IPayButton
          onPress={onPressQR}
          disabled={isQrBtnDisabled || chipValue !== ''}
          btnType={buttonVariants.PRIMARY}
          large
          btnText={localizationText.ATM_WITHDRAWAL.SCAN_QR_CODE}
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

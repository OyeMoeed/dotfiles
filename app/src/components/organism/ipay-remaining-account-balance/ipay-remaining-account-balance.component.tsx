import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayButton, IPayCardSelector, IPayChip } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { regex } from '@app/styles/typography.styles';
import { States, TopUpStates, buttonVariants, PayChannel } from '@app/utilities/enums.util';
import { isMultipleOfHundred, removeCommas } from '@app/utilities/number-helper.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  payChannelType = PayChannel.ATM,
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
  channel,
  onSelectCard,
}) => {
  const { colors } = useTheme();
  const styles = ipayRemainingAccountBalanceStyles(colors);
  const { t } = useTranslation();
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
          text={currentState === TopUpStates.SAVED_CARD ? 'TRANSACTION_HISTORY.AMOUNT' : 'TOP_UP.ENTER_AMOUNT'}
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
              icon={chipValue === t('TOP_UP.LIMIT_REACHED') ? icons.warning : icons.shield_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      )}
      {!isMultipleOfHundred(Number(topUpAmount)) && payChannelType === PayChannel.ATM && (
        <IPayCaption2Text
          regular={false}
          text="ATM.MULTIPLE_OF_HUNDERED"
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
            channel={channel}
            payChannelType={payChannelType}
            setTopUpAmount={setTopUpAmount}
            onSelectCard={onSelectCard}
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
          btnText="ATM_WITHDRAWAL.SCAN_QR_CODE"
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

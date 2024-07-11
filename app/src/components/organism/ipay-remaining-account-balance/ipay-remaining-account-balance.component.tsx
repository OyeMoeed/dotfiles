import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayButton, IPayCardSelector, IPayChip } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { TopUpStates, buttonVariants, payChannel, variants } from '@app/utilities/enums.util';
import React from 'react';
import IPayBalanceProgressbar from '../ipay-balance-progressbar/ipay-balance-progressbar.component';
import IPayQuickActions from '../ipay-quick-actions/ipay-quick-actions.component';
import ipayRemainingAccountBalanceStyles from './ipay-remaining-account-balance.component.styles';
import { IPayRemainingBalanceProps } from './ipay-remaining-account-balance.interface';

const IPayRemainingAccountBalance: React.FC<IPayRemainingBalanceProps> = ({
  testID,
  topUpAmount,
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
  onPressQrScan,
  isQrBtnDisabled,
}) => {
  const { colors } = useTheme();

  const styles = ipayRemainingAccountBalanceStyles(colors);
  const localizationText = useLocalization();
  const { limitsDetails } = walletInfo;
  const handleAmountChange = (text: number) => {
    const newAmount = text;
    setTopUpAmount(newAmount.toString());
  };

  return (
    <IPayView testID={`${testID}-remaining-balane`} style={styles.cardContainer}>
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
          variant={variants.WARNING}
          isShowIcon
          containerStyle={styles.chipContainer}
          icon={
            <IPayIcon
              icon={chipValue === localizationText.TOP_UP.LIMIT_REACHED ? icons.warning : icons.sheild_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      )}
      {(currentState === TopUpStates.INITAL_STATE || showQuickAmount) && (
        <>
          <IPayBalanceProgressbar
            monthlyRemainingOutgoingAmount={limitsDetails.monthlyRemainingOutgoingAmount}
            monthlyOutgoingLimit={limitsDetails.monthlyOutgoingLimit}
          />
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
          onPress={onPressQrScan}
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

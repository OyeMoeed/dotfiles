import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayCardSelector, IPayChip } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { TopUpStates, payChannel, variants } from '@app/utilities/enums.util';
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
}) => {
  const { colors } = useTheme();

  const styles = ipayRemainingAccountBalanceStyles(colors);
  const localizationText = useLocalization();

  const limitsDetails = walletInfo.limitsDetails;

  const handleAmountChange = (text: number) => {
    const newAmount = text;
    setTopUpAmount(newAmount.toString());
  };

  return (
    <IPayView testID={`${testID}-remaining-balane`} style={styles.cardContainer}>
      <IPayView style={styles.centerAlign}>
        <IPayFootnoteText
          text={currentState === TopUpStates.SAVED_CARD ? localizationText.amount : localizationText.enter_amount}
          color={colors.natural.natural700}
        />
        <IPayAmountInput
          currentState={currentState}
          showIcon={currentState !== TopUpStates.INITAL_STATE}
          amount={topUpAmount}
          onAmountChange={handleAmountChange}
          disabled={limitsDetails.monthlyRemainingOutgoingAmount !== '0'}
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
              icon={chipValue === localizationText.limit_reached ? icons.warning : icons.sheild_cross}
              color={colors.critical.critical800}
              size={16}
            />
          }
        />
      )}

      {currentState === TopUpStates.INITAL_STATE && (
        <>
          <IPayBalanceProgressbar
            monthlyRemainingOutgoingAmount={limitsDetails.monthlyRemainingOutgoingAmount}
            monthlyOutgoingLimit={limitsDetails.monthlyOutgoingLimit}
          />
          <IPayQuickActions
            setTopUpAmount={setTopUpAmount}
            monthlyRemainingOutgoingAmount={limitsDetails.monthlyRemainingOutgoingAmount}
          />
        </>
      )}

      {currentState === TopUpStates.SAVED_CARD && (
        <IPayCardSelector openPressExpired={openPressExpired} onPressAddCard={onPressAddCards} />
      )}
    </IPayView>
  );
};

export default IPayRemainingAccountBalance;

import icons from '@app/assets/icons';
import { IPayComponentHeader, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayToast } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { TopUpStates, payChannel, topupStatus } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import IPayRemainingAccountBalance from '../ipay-remaining-account-balance/ipay-remaining-account-balance.component';
import IPayAmountProps from './ipay-amount-component.interface';
import amountStyles from './ipay-amount-component.styles';

const IPayAmount: React.FC<IPayAmountProps> = ({ channel, onPressAddCards, openPressExpired, walletInfo }) => {
  const { colors } = useTheme();
  const [currentState, setCurrentState] = useState(TopUpStates.INITAL_STATE);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isTopUpNextEnable, setIsTopUpNextEnable] = useState(true);
  const [isCardSaved, setIsCardSaved] = useState(true); // State to toggle saved card view
  const [chipValue, setChipValue] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [processToast, setProcessToast] = useState(false);
  const [isCardExpired, setIsCardExpired] = useState(false);
  const localizationText = useLocalization();
  const styles = amountStyles(colors);

  const handleCardSelect = (cardKey: number | null) => {
    setSelectedCard(cardKey);
  };

  const handlePressPay = () => {
    setProcessToast(false);
    setSelectedCard(false);
    if (channel === payChannel.APPLE) {
      setTopUpAmount('');
      navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: payChannel.APPLE, topupStatus: topupStatus.SUCCESS });
    } else {
      navigate(screenNames.CARD_VERIFICATION);
    }
  };

  //new added code
  const limitsDetails = walletInfo.limitsDetails;
  useEffect(() => {
    const monthlyRemaining = parseFloat(limitsDetails.monthlyRemainingOutgoingAmount);
    const dailyRemaining = parseFloat(limitsDetails.dailyRemainingOutgoingAmount);
    const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));

    if (monthlyRemaining === 0) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.limit_reached);
    } else if (updatedTopUpAmount > dailyRemaining && updatedTopUpAmount < monthlyRemaining) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.daily_limit);
    } else if (updatedTopUpAmount > monthlyRemaining) {
      setIsTopUpNextEnable(false);
      setChipValue(localizationText.amount_exceeds_current);
    } else {
      if (topUpAmount == '' || topUpAmount == '0') {
        setIsTopUpNextEnable(false);
      } else {
        setIsTopUpNextEnable(true);
      }
      setChipValue('');
    }
  }, [
    topUpAmount,
    limitsDetails.monthlyRemainingOutgoingAmount,
    limitsDetails.dailyRemainingOutgoingAmount,
    localizationText,
  ]);

  const handleNextPress = () => {
    if (isCardSaved) {
      setCurrentState(TopUpStates.SAVED_CARD);
    } else {
      setCurrentState(TopUpStates.NEW_CARD);
    }
  };

  const renderToast = () =>
    showToast && (
      <IPayToast
        testID="cvv_does_not_match"
        title={localizationText.entered_cvv_does_not_match}
        isShowButton
        borderColor={colors.error.error25}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />}
        viewText=""
        onPress={() => setShowToast(false)}
        containerStyle={styles.toast}
      />
    );
  const processnotCompleteToast = () =>
    processToast && (
      <IPayToast
        testID="cvv_does_not_match"
        title={localizationText.process_not_completed}
        isShowButton
        borderColor={colors.error.error25}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />}
        viewText=""
        onPress={() => setProcessToast(false)}
        containerStyle={styles.toast}
      />
    );
  const cardExpiredToast = () =>
    processToast && (
      <IPayToast
        testID="cvv_does_not_match"
        title={localizationText.process_not_completed}
        isShowButton
        borderColor={colors.error.error25}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />}
        viewText=""
        onPress={() => setIsCardExpired(false)}
        containerStyle={styles.toast}
      />
    );

  return (
    <IPayView style={styles.safeAreaView}>
      {channel === payChannel.APPLE ? (
        <IPayComponentHeader icon={icons.apple_pay} title={localizationText.apple_pay} showCardIcons={false} />
      ) : (
        <IPayComponentHeader icon={icons.cards} title={localizationText.card_title} />
      )}
      <IPayRemainingAccountBalance
        currentState={currentState}
        topUpAmount={topUpAmount}
        setTopUpAmount={setTopUpAmount}
        chipValue={chipValue}
        setChipValue={setChipValue}
        walletInfo={walletInfo}
        payChannelType={payChannel.CARD}
        openPressExpired={openPressExpired}
        onCardSelect={handleCardSelect}
        onPressAddCards={onPressAddCards}
        initialSelectedCard={selectedCard}
      />

      {channel === payChannel.APPLE ? (
        <IPayButton
          large
          btnStyle={[
            styles.payButton,
            { backgroundColor: isTopUpNextEnable ? colors.natural.natural1000 : colors.natural.natural300 },
          ]}
          btnType="primary"
          leftIcon={<IPayIcon icon={icons.apple_pay} size={40} color={colors.natural.natural0} />}
          onPress={handlePressPay}
          disabled={!isTopUpNextEnable}
        />
      ) : (
        <IPayButton
          large
          btnType="primary"
          btnIconsDisabled
          btnText={currentState === TopUpStates.SAVED_CARD ? localizationText.pay : localizationText.next}
          onPress={currentState === TopUpStates.SAVED_CARD ? handlePressPay : handleNextPress}
          disabled={!isTopUpNextEnable}
        />
      )}

      {renderToast()}
      {processnotCompleteToast()}
      {cardExpiredToast()}
    </IPayView>
  );
};

export default IPayAmount;

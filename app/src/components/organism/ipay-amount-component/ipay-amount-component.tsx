import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayComponentHeader,
  IPayFootnoteText,
  IPayIcon,
  IPayMaskedInput,
  IPayPressable,
  IPayProgressBar,
  IPayView,
} from '@app/components/atoms';
import {
  IPayAmountInput,
  IPayAnimatedTextInput,
  IPayButton,
  IPayCardSelector,
  IPayChip,
  IPayTextInput,
  IPayToast,
  IPayToggleButton,
} from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { payChannel, topupStatus, variants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/numberComma-helper.util';
import { parseInt } from 'lodash';
import React, { useState } from 'react';
import IPayAmountProps from './ipay-amount-component.interface';
import amountStyles from './ipay-amount-component.styles';

const IPayAmount: React.FC<IPayAmountProps> = ({
  amounts,
  channel,
  expiryOnPress,
  cvvPress,
  selectedDate,
  onPressAddCards,
  openExpiredDateBottomSheet,
  openPressExpired,
}) => {
  const { colors } = useTheme();
  const [isSaveCardEnabled, setIsSaveCardEnabled] = useState(true);
  const [isCardSaved, setIsCardSaved] = useState(true); // State to toggle saved card view
  const [isCvvError, setIsCvvError] = useState(false); // State to manage CVV error
  const [isCardExpanded, setIsCardExpanded] = useState(false); // State for expansion
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [processToast, setProcessToast] = useState(false);
  const [isCardExpired, setIsCardExpired] = useState(false);

  const localizationText = useLocalization();
  const styles = amountStyles(colors);

  const totalAmount = 20000;
  const currentAmount = 14800;
  const dailyLimit = 3000;

  const remainingAmount = totalAmount - currentAmount;
  const remainingProgress = (remainingAmount / totalAmount) * 100;

  const handleInputChange = (num: number) => {
    const parsedAmount = parseInt(num, 10);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setAmount(num);
    } else {
      setAmount('');
    }
  };

  const addAmount = (value: number) => {
    const newAmount = value;
    setAmount(newAmount.toString());
  };

  const handleCardSelect = (cardKey: number | null) => {
    setSelectedCard(cardKey);
  };

  const handleCvvChange = (text: string) => {
    setCvv(text);
    setIsCvvError(text.length !== 3); // Assuming CVV must be exactly 3 characters long
    setShowToast(true);
  };

  const handleCardNumberChange = (num: string) => {
    const text = num.replace(/\s+/g, ''); // Remove spaces from input
    const formattedCardNumber = text.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
    setCardNumber(formattedCardNumber);
    const isValidCardNumber = text.length === 16; // Check if the card number has 16 digits
    setCardNumberError(!isValidCardNumber);
  };

  const handleSaveCardToggle = () => {
    setIsSaveCardEnabled(!isSaveCardEnabled);
  };

  const handlePressPay = () => {
    if (amount < 500) {
      // Show a toast indicating the amount is below the daily limit
      setProcessToast(true);
    } else {
      // Reset the amount and collapse the card section
      setAmount('');
      setProcessToast(false)
      setIsCardExpanded(false);
      setSelectedCard(false)
      // Navigate based on the payment channel
      if (channel === payChannel.APPLE) {
        navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: payChannel.APPLE, topupStatus: topupStatus.SUCCESS });
      } else {
        navigate(screenNames.CARD_VERIFICATION);
      }
    }
  };
  const handleNextPress = () => {
    if (isCardSaved) {
      setIsCardExpanded(!isCardExpanded); // Toggle card expansion
    } else {
      setIsCardExpanded(true); // Always expand if card is not saved
    }
  };

  const nextButtonEnabled = !isCardExpanded && (parseInt(amount) > dailyLimit || amount > currentAmount);
  const isPayButtonEnabled =
    (isCardExpanded && cardNumber.replace(/\s+/g, '').length === 16 && cvv.length === 3) || selectedCard !== null; // Enable if a card is selected

  const determineButtonColor = () => {
    if (isCardExpanded || nextButtonEnabled) {
      return isPayButtonEnabled ? colors.primary.primary500 : colors.natural.natural200;
    }
    return amount.length > 0 ? colors.primary.primary500 : colors.natural.natural200;
  };

  const determineTextColor = () => {
    if (isCardExpanded || nextButtonEnabled) {
      return isPayButtonEnabled ? colors.natural.natural0 : colors.natural.natural300;
    }
    return amount.length > 0 ? colors.natural.natural0 : colors.natural.natural300;
  };

  const determinApplePayButtonColor = () => {
    if (amount.length > 0 || nextButtonEnabled) {
      return colors.natural.natural1000;
    }
    return colors.natural.natural300;
  };
  const renderChip = () => {
    const parsedAmount = parseInt(amount, 10) || 0;

    if (currentAmount === 0) {
      return (
        <IPayChip
          textValue={localizationText.limit_reached}
          variant={variants.WARNING}
          isShowIcon={true}
          containerStyle={styles.chipContainer}
          icon={<IPayIcon icon={icons.warning} color={colors.critical.critical800} size={scaleSize(12)} />}
        />
      );
    }

    if (parsedAmount > currentAmount) {
      return (
        <IPayChip
          textValue={localizationText.amount_exceeds_current}
          variant={variants.WARNING}
          isShowIcon={true}
          containerStyle={styles.chipContainer}
          icon={<IPayIcon icon={icons.sheild_cross} color={colors.critical.critical800} size={scaleSize(12)} />}
        />
      );
    }
    if (parsedAmount > dailyLimit) {
      return (
        <IPayChip
          textValue={localizationText.daily_limit}
          variant={variants.WARNING}
          isShowIcon={true}
          containerStyle={styles.chipContainer}
          icon={<IPayIcon icon={icons.sheild_cross} color={colors.critical.critical800} size={scaleSize(12)} />}
        />
      );
    }

    return null;
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
        <IPayComponentHeader icon={icons.apple_pay} iconSize={scaleSize(20)} title={localizationText.apple_pay} />
      ) : (
        <IPayComponentHeader
          icon={icons.cards}
          title={localizationText.card_title}
          iconSize={20}
          showCardIcons
          cardIcon1={icons.visa}
          cardIcon2={icons.master_card}
          cardIcon3={icons.mada}
        />
      )}

      <IPayView style={styles.cardContainer}>
        <IPayView style={styles.amountContainer}>
          {isCardExpanded ? (
            <>
              <IPayView>
                <IPayFootnoteText text={localizationText.amount} />
              </IPayView>
              <IPayAmountInput
                defaultValue="0"
                showIcon
                maxLength={6}
                amount={amount}
                onAmountChange={handleInputChange}
                style={[
                  styles.textAmount,
                  { color: amount.length > 0 ? colors.natural.natural1000 : colors.natural.natural300 }
                ]}
                currencyStyle={{
                  color: amount.length > 0 ? colors.natural.natural1000 : colors.natural.natural300
                }}
              />
            </>
          ) : (
            <>
              <IPayView>
                <IPayFootnoteText text={localizationText.enter_amount} />
              </IPayView>
              <IPayAmountInput
                amount={amount}
                defaultValue="0"
                maxLength={6}
                onAmountChange={handleInputChange}
                style={[
                  styles.textAmount,
                  { color: amount.length > 0 ? colors.natural.natural1000 : colors.natural.natural300 }
                ]}
                currencyStyle={{
                  color: amount.length > 0 ? colors.natural.natural1000 : colors.natural.natural300
                }}
              />
            </>
          )}
          <IPayView style={styles.chipContainer}>{renderChip()}</IPayView>
        </IPayView>

        {isCardExpanded && isCardSaved && (
          <IPayCardSelector
            openPressExpired={openPressExpired}
            onCardSelect={handleCardSelect}
            onPressPay={onPressAddCards}
            initialSelectedCard={selectedCard}
          />
        )}
        {!isCardExpanded && (
          <>
            <IPayView>
              <IPayCaption2Text style={styles.amount} text={localizationText.multiple} />
            </IPayView>

            {!isCardExpanded && (
              <>
                <IPayProgressBar
                  style={styles.progressBar}
                  gradientWidth={`${remainingProgress}%`}
                  colors={colors.gradientPrimary}
                />
                <IPayView style={styles.topUpContainer}>
                  <IPayCaption2Text text={localizationText.remaining} />
                  <IPayView style={styles.amountValues}>
                    <IPayCaption2Text style={styles.totalAmount}>
                      {formatNumberWithCommas(currentAmount)}
                    </IPayCaption2Text>
                    <IPayCaption2Text>
                      {localizationText.HOME.OF} {formatNumberWithCommas(totalAmount)}
                    </IPayCaption2Text>
                  </IPayView>
                </IPayView>
                <IPayView style={styles.buttonContainer}>
                  {amounts.map((amountItem, index) => (
                    <IPayButton
                      key={index}
                      btnText={`${amountItem.text} ${localizationText.sar}`}
                      btnType="primary"
                      btnIconsDisabled
                      btnStyle={[
                        styles.buttonBg,
                        {
                          backgroundColor:
                            currentAmount === 0 ? colors.natural.natural200 : colors.secondary.secondary100,
                        },
                      ]}
                      textColor={colors.secondary.secondary800}
                      onPress={() => addAmount(amountItem.value)}
                      disabled={currentAmount === 0}
                    />
                  ))}
                </IPayView>
              </>
            )}
          </>
        )}

        {channel === payChannel.CARD && isCardExpanded && (
          <>
            <IPayView style={styles.expandedContainer}>
              {!isCardSaved && (
                <>
                  <IPayFootnoteText text={localizationText.enter_card_details} style={styles.enterCardDetailsText} />
                  <IPayMaskedInput
                    label={localizationText.card_number}
                    containerStyle={[styles.inputField, cardNumberError && { borderColor: colors.error.error500 }]}
                    assistiveText={cardNumberError ? localizationText.incorrect_card_number : ''}
                    isError={cardNumberError}
                    rightIcon={<IPayIcon icon={icons.master_card} size={scaleSize(22)} />}
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                  />

                  <IPayView style={styles.inputRow}>
                    <IPayPressable onPress={openExpiredDateBottomSheet}>
                      <IPayTextInput
                        onFocus={openExpiredDateBottomSheet}
                        onChangeText={openExpiredDateBottomSheet}
                        label={localizationText.date}
                        containerStyle={styles.inputField3}
                        text={selectedDate}
                        showLeftIcon
                        leftIcon={
                          <IPayPressable onPress={expiryOnPress}>
                            <IPayIcon icon={icons.infoIcon2} color={colors.natural.natural500} />
                          </IPayPressable>
                        }
                      />
                    </IPayPressable>
                    <IPayAnimatedTextInput
                      label={localizationText.cvv}
                      showLeftIcon
                      icon={icons.infoIcon}
                      value={cvv}
                      keyboardType="numeric"
                      containerStyle={[styles.inputField2, isCvvError && { borderColor: colors.error.error500 }]}
                      showRightIcon
                      customIcon={
                        <IPayPressable onPress={cvvPress}>
                          <IPayIcon icon={icons.infoIcon2} color={colors.natural.natural500} />
                        </IPayPressable>
                      }
                      isError={isCvvError}
                      assistiveText={isCvvError ? localizationText.incorrect_cvv : ''}
                      onChangeText={handleCvvChange}
                    />
                  </IPayView>
                  <IPayView style={styles.inputToggle}>
                    <IPayView>
                      <IPayFootnoteText text={localizationText.save_card} />
                      <IPayCaption1Text text={localizationText.saveSubtitle} style={styles.enterCardDetailsText} />
                    </IPayView>
                    <IPayToggleButton onToggleChange={handleSaveCardToggle} toggleState={!isSaveCardEnabled} />
                  </IPayView>
                  {!isSaveCardEnabled && (
                    <IPayAnimatedTextInput
                      label={localizationText.card_name}
                      value={cardName}
                      containerStyle={styles.cardNameInput}
                      showRightIcon
                      customIcon={<IPayIcon icon={icons.CLOSE_SQUARE} color={colors.natural.natural500} />}
                      onChangeText={setCardName}
                    />
                  )}
                </>
              )}
            </IPayView>
          </>
        )}
      </IPayView>

      {channel === payChannel.APPLE ? (
        <IPayButton
          btnStyle={[styles.payButton, { backgroundColor: determinApplePayButtonColor() }]}
          btnType="primary"
          leftIcon={<IPayIcon icon={icons.apple_pay} size={scaleSize(40)} color={colors.natural.natural0} />}
          showIcon
          onPress={handlePressPay}
          disabled={amount.length === 0 || amount === '' || amount === '0' || nextButtonEnabled}
        />
      ) : (
        <IPayButton
          btnType="primary"
          btnStyle={[
            styles.payButton2,
            { backgroundColor: determineButtonColor() }, // Use the new function here
          ]}
          textColor={determineTextColor()}
          btnIconsDisabled
          btnText={isCardExpanded ? localizationText.pay : localizationText.next}
          onPress={isCardExpanded ? handlePressPay : handleNextPress}
          disabled={amount.length === 0 || (isCardExpanded && !isPayButtonEnabled) || nextButtonEnabled}
        />
      )}

      {renderToast()}
      {processnotCompleteToast()}
      {cardExpiredToast()}
    </IPayView>
  );
};

export default IPayAmount;

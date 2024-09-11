import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayMaskedInput,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import {
  IPayAnimatedTextInput,
  IPayButton,
  IPaySupportedCards,
  IPayTextInput,
  IPayToggleButton,
} from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { JSX, useState } from 'react';
import { buttonVariants } from '@app/utilities/enums.util';
import { IPayAddCardBottomsheetProps } from './ipay-addcard-bottomsheet.interface';
import addCardBottomSheetStyles from './ipay-addcard-bottomsheet.styles'; // Adjust the path as per your project structure

const IPayAddCardBottomsheet: React.FC<IPayAddCardBottomsheetProps> = ({
  testID,
  isEditingMode,
  cvvPress,
  selectedDate,
  openExpiredDateBottomSheet,
  closeBottomSheet,
  selectedCard,
  containerStyles,
  savedScreen,
  expiryOnPress,
}: IPayAddCardBottomsheetProps): JSX.Element => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = addCardBottomSheetStyles(colors);
  const [cardNumber, setCardNumber] = useState(selectedCard?.cardNumber);
  const [cvv, setCvv] = useState('');
  const [isSaveCardEnabled, setSaveCardEnabled] = useState(false);
  const [cardNamePrimary, setCardNamePrimary] = useState('');
  const [cardNameSecondary, setCardNameSecondary] = useState('');
  const [isCardNumberError, setIsCardNumberError] = useState(false);
  const [isCvvError, setIsCvvError] = useState(false);

  const handleCardNumberChange = (num: string) => {
    const text = num.replace(/\s+/g, '');
    const formattedCardNumber = text.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
    setCardNumber(formattedCardNumber);
    const isValidCardNumber = text.length === 16;
    setIsCardNumberError(!isValidCardNumber);
  };

  const handlePrimaryCardNameChange = (name: string) => {
    setCardNamePrimary(name);
  };

  const handleSecondaryCardNameChange = (name: string) => {
    setCardNameSecondary(name);
  };

  const handleCvvChange = (text: string) => {
    setCvv(text);
    setIsCvvError(text.length !== 3); // Assuming CVV must be exactly 3 characters long
  };

  const handleSaveCardToggle = () => {
    setSaveCardEnabled(!isSaveCardEnabled);
  };

  const buttonColor = (type: 'button' | 'text') => {
    const hasCardNumberError = isCardNumberError || cardNumber === '';
    const hasCvvError = isCvvError || cvv === '';
    const needsCardName = isSaveCardEnabled && cardNamePrimary === '';

    const hasErrors = hasCardNumberError || needsCardName || !cardNamePrimary || (!isEditingMode && hasCvvError);

    switch (type) {
      case 'button':
        return hasErrors ? colors.natural.natural200 : colors.primary.primary500;
      case 'text':
        return hasErrors ? colors.natural.natural300 : colors.natural.natural0;
      default:
        return colors.natural.natural100;
    }
  };

  return (
    <IPayView testID={`${testID}-IPayAddCardBottomsheet`} style={[styles.container, containerStyles]}>
      <IPayView style={styles.headerRow}>
        <IPayView style={styles.cardRow}>
          <IPayIcon icon={icons.cards} color={colors.primary.primary900} />
          <IPayFootnoteText
            text={isEditingMode ? localizationText.MENU.EDIT_CARD : localizationText.CARDS.ENTER_CARD_DETAILS}
            style={styles.icongap}
          />
        </IPayView>
        <IPaySupportedCards />
      </IPayView>

      <IPayView style={styles.cardContainer}>
        <IPayAnimatedTextInput
          label={localizationText.COMMON.CARD_NAME}
          value={cardNamePrimary}
          containerStyle={styles.cardNameInput}
          editable
          onChangeText={handlePrimaryCardNameChange}
          customIcon={
            <IPayPressable onPress={() => setCardNamePrimary('')}>
              <IPayIcon icon={icons.CLOSE_SQUARE} color={colors.natural.natural500} />
            </IPayPressable>
          }
          showRightIcon
        />
        <IPayMaskedInput
          type="credit-card"
          label={localizationText.COMMON.CARD_NUMBER}
          containerStyle={[styles.inputField, isCardNumberError && { borderColor: colors.error.error500 }]}
          assistiveText={isCardNumberError ? localizationText.TOP_UP.INCORRECT_CARD_NUMBER : ''}
          maxLength={19}
          isError={isCardNumberError}
          rightIcon={<IPayIcon icon={icons.master_card} size={22} />}
          value={cardNumber}
          showRightIcon
          customIcon={!isEditingMode && <IPayIcon icon={icons.camera} color={colors.natural.natural500} />}
          editable={!isEditingMode}
          onChangeText={handleCardNumberChange}
        />

        <IPayView style={styles.inputRow}>
          <IPayPressable onPress={openExpiredDateBottomSheet}>
            <IPayView>
              <IPayTextInput
                editable={false}
                onFocus={openExpiredDateBottomSheet}
                caretHidden
                onChangeText={openExpiredDateBottomSheet}
                label={localizationText.TOP_UP.EXPIRY_DATE}
                containerStyle={[isEditingMode ? styles.inputFieldEditing : styles.inputField3]}
                showLeftIcon
                text={selectedDate}
                leftIcon={
                  <IPayPressable onPress={expiryOnPress}>
                    <IPayIcon icon={icons.infoIcon2} color={colors.natural.natural500} />
                  </IPayPressable>
                }
                style={styles.inputStyle}
              />
            </IPayView>
          </IPayPressable>

          {!isEditingMode && (
            <IPayAnimatedTextInput
              label={localizationText.COMMON.CVV}
              maxLength={3}
              showLeftIcon
              icon={icons.infoIcon}
              value={cvv}
              containerStyle={[styles.inputField2, isCvvError && { borderColor: colors.error.error500 }]}
              showRightIcon
              customIcon={
                <IPayPressable onPress={cvvPress}>
                  <IPayIcon icon={icons.infoIcon2} color={colors.natural.natural500} />
                </IPayPressable>
              }
              editable
              isError={isCvvError}
              assistiveText={isCvvError ? localizationText.TOP_UP.INVALID_CVV : ''}
              onChangeText={handleCvvChange}
            />
          )}
        </IPayView>

        {!isEditingMode && (
          <IPayView style={styles.inputToggle}>
            <IPayView>
              <IPayFootnoteText text="TOP_UP.SAVE_CARD" color={colors.natural.natural900} />
              <IPayCaption1Text text="TOP_UP.SAVE_SUBTITLE" color={colors.natural.natural500} />
            </IPayView>
            <IPayToggleButton onToggleChange={handleSaveCardToggle} toggleState={isSaveCardEnabled} />
          </IPayView>
        )}

        {isSaveCardEnabled && (
          <IPayAnimatedTextInput
            label={localizationText.COMMON.CARD_NAME}
            value={cardNameSecondary}
            containerStyle={styles.cardNameInput}
            editable
            onChangeText={handleSecondaryCardNameChange}
            customIcon={
              <IPayPressable onPress={() => setCardNameSecondary('')}>
                <IPayIcon icon={icons.CLOSE_SQUARE} color={colors.natural.natural500} />
              </IPayPressable>
            }
            showRightIcon
          />
        )}
      </IPayView>

      <IPayButton
        btnType={buttonVariants.PRIMARY}
        btnText={savedScreen ? localizationText.TOP_UP.PAY : localizationText.COMMON.SAVE}
        btnColor={buttonColor('button')}
        textColor={buttonColor('text')}
        large
        btnIconsDisabled
        onPress={closeBottomSheet}
      />
    </IPayView>
  );
};

export default IPayAddCardBottomsheet;

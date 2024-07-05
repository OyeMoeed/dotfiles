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
import { useState } from 'react';
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

  const determineButtonColor = () => {
    const hasCardNumberError = isCardNumberError || cardNumber === '';
    const hasCvvError = isCvvError || cvv === '';
    const needsCardName = isSaveCardEnabled && cardNamePrimary === '';

    if (hasCardNumberError || hasCvvError || needsCardName) {
      return colors.natural.natural200;
    }
    return colors.primary.primary500;
  };

  const determineTextColor = () => {
    const hasCardNumberError = isCardNumberError || cardNumber === '';
    const hasCvvError = isCvvError || cvv === '';
    const needsCardName = isSaveCardEnabled && cardNamePrimary === '';

    if (hasCardNumberError || hasCvvError || needsCardName) {
      return colors.natural.natural300;
    }
    return colors.natural.natural0;
  };

  return (
    <IPayView style={[styles.container, containerStyles]}>
      <IPayView style={styles.headerRow}>
        <IPayView style={styles.cardRow}>
          <IPayIcon icon={icons.cards} color={colors.primary.primary900} />
          <IPayFootnoteText
            text={isEditingMode ? localizationText.edit_card : localizationText.add_card}
            style={styles.icongap}
          />
        </IPayView>
        <IPaySupportedCards />
      </IPayView>

      <IPayView style={styles.cardContainer}>
        <IPayAnimatedTextInput
          label={localizationText.card_name}
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
          type={'credit-card'}
          label={localizationText.card_number}
          containerStyle={[styles.inputField, isCardNumberError && { borderColor: colors.error.error500 }]}
          assistiveText={isCardNumberError ? localizationText.incorrect_card_number : ''}
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
                label={localizationText.date}
                containerStyle={[isEditingMode ? styles.inputFieldEditing : styles.inputField3]}
                showLeftIcon
                text={selectedDate}
                leftIcon={
                  <IPayPressable onPress={expiryOnPress}>
                    <IPayIcon icon={icons.infoIcon2} color={colors.natural.natural500} />
                  </IPayPressable>
                }
              />
            </IPayView>
          </IPayPressable>

          {!isEditingMode && (
            <IPayAnimatedTextInput
              label={localizationText.cvv}
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
              assistiveText={isCvvError ? localizationText.invalid_cvv : ''}
              onChangeText={handleCvvChange}
            />
          )}
        </IPayView>

        {!isEditingMode && (
          <IPayView style={styles.inputToggle}>
            <IPayView>
              <IPayFootnoteText text={localizationText.save_card} color={colors.natural.natural900} />
              <IPayCaption1Text text={localizationText.saveSubtitle} color={colors.natural.natural500} />
            </IPayView>
            <IPayToggleButton onToggleChange={handleSaveCardToggle} toggleState={isSaveCardEnabled} />
          </IPayView>
        )}

        {isSaveCardEnabled && (
          <IPayAnimatedTextInput
            label={localizationText.card_name}
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
        btnType="primary"
        btnText={savedScreen ? localizationText.pay : localizationText.save}
        btnColor={determineButtonColor()}
        textColor={determineTextColor()}
        large
        btnIconsDisabled
        onPress={closeBottomSheet}
      />
    </IPayView>
  );
};

export default IPayAddCardBottomsheet;

import icons from '@app/assets/icons';
import { Alinma, NonAlinma } from '@app/assets/svgs';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayButton, IPayChip, IPayList } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IPayTransferInformationProps } from './ipay-transfer-information.interface';
import transferInfoStyles from './ipay-transfer-information.style';

const IPayTransferInformation: React.FC<IPayTransferInformationProps> = ({
  testID,
  style,
  amount,
  setAmount,
  isEditable,
  currencyStyle,
  showReason = true,
  openReason,
  setSelectedItem,
  selectedItem,
  notes,
  setNotes,
  showRemoveFormOption,
  showRemoveBtn,
  transferInfo,
  chipValue,
  transferInfoData,
  showCount = true,
  maxLength = 70,
  subtitle,
  hasWallet,
  inputFieldStyle,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = transferInfoStyles(colors);

  const [isFocused, setIsFocused] = useState(false);

  const notesText = t('TRANSACTION_HISTORY.NOTE');
  const optionalText = t('COMMON.OPTIONAL');
  const notesLabel = `${notesText} ${transferInfo ? `(${optionalText})` : ''}`;
  const defaultValue: string = '0.00';

  const getLetterCount = () => `${notes?.length}/${maxLength}`;

  const validateAmountInput = (value: string) => {
    // Split the value by the decimal point
    const [integerPart, decimalPart] = value.split('.');

    if (integerPart?.length > 5) {
      return amount;
    }

    if (decimalPart?.length > 2) {
      return amount;
    }

    // If both checks pass, return the new value
    return value;
  };

  return (
    <IPayView testID={`${testID}-transfer-information`} style={[styles.gradientView, style]}>
      {!hasWallet && (
        <IPayView style={styles.chipContainerNotWallet}>
          <IPayChip
            containerStyle={styles.chipColors}
            icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
            textValue="TRANSFER_SUMMARY.CHIP_TITLE"
            headingStyles={styles.chipColors}
          />
        </IPayView>
      )}
      <IPayView>
        {transferInfo ? (
          <IPayView style={styles.headingView}>
            <IPayIcon icon={transferInfoData?.icon} size={30} />
            <IPayView style={styles.bankDetailsView}>
              <IPayView style={styles.bankTitleView}>
                <IPayFootnoteText regular={false} text={transferInfoData?.title} color={colors.natural.natural900} />
                <IPayCaption2Text regular text={` | ${transferInfoData?.bankName}`} color={colors.natural.natural900} />
              </IPayView>
              <IPayCaption1Text text={transferInfoData?.accountNumber} color={colors.natural.natural500} />
            </IPayView>
          </IPayView>
        ) : (
          <IPayList
            textStyle={styles.titleText}
            title="SEND_MONEY_FORM.RECIPIENT"
            subTextStyle={StyleSheet.flatten(styles.subtitleText)}
            isShowSubTitle
            subTitle={subtitle}
            isShowLeftIcon
            leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
            isShowIcon
            containerStyle={StyleSheet.flatten(styles.headerContainer)}
            icon={hasWallet ? <Alinma /> : <NonAlinma />}
          />
        )}
      </IPayView>
      <IPayView style={styles.inputContainer}>
        <IPayFootnoteText regular style={styles.text} text="TOP_UP.ENTER_AMOUNT" color={colors.natural.natural700} />
        <IPayAmountInput
          carretHidden={false}
          style={styles.amountInput}
          inputStyles={styles.inputText}
          currencyStyle={[styles.currencyStyle, currencyStyle]}
          defaultValue={defaultValue}
          amount={amount}
          maxLength={null}
          onAmountChange={(value) => setAmount(validateAmountInput(value))}
          isEditable={isEditable}
        />
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
      </IPayView>
      {showReason ? (
        <IPayPressable onPress={openReason} style={styles.reasonsView}>
          <IPayAnimatedTextInput
            onChangeText={setSelectedItem}
            containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
            labelColor={colors.natural.natural500}
            label="COMMON.REASON_OF_TRANSFER"
            value={selectedItem}
            editable={false}
            showRightIcon
            customIcon={
              <IPayPressable onPress={openReason}>
                <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
              </IPayPressable>
            }
          />
        </IPayPressable>
      ) : (
        <IPayView />
      )}
      <IPayAnimatedTextInput
        containerStyle={[StyleSheet.flatten(styles.inputField), isFocused && styles.focusedField, inputFieldStyle]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectionColor={colors.primary.primary500}
        label={notesLabel}
        value={notes}
        maxLength={maxLength}
        onChangeText={setNotes}
      />

      {showCount && <IPayCaption1Text text={getLetterCount()} style={styles.letterCount} />}

      {showRemoveBtn && (
        <IPayView style={styles.btn}>
          <IPayButton
            small
            textStyle={styles.btnText}
            btnText="PROFILE.REMOVE"
            hasRightIcon
            rightIcon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} size={14} />}
            btnType={buttonVariants.LINK_BUTTON}
            onPress={showRemoveFormOption}
          />
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayTransferInformation;

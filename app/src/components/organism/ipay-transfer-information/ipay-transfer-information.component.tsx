import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayButton, IPayChip, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { StyleSheet } from 'react-native';
import { IPayTransferInformationProps } from './ipay-transfer-information.interface';
import transferInfoStyles from './ipay-transfer-information.style';

const IPayTransferInformation: React.FC<IPayTransferInformationProps> = ({
  testID,
  style,
  amount,
  setAmount,
  isEditable,
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
  subtitle,
}) => {
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);

  const localizationText = useLocalization();

  const notesText = localizationText.TRANSACTION_HISTORY.NOTE;
  const optionalText = localizationText.COMMON.OPTIONAL;
  const notesLabel = `${notesText} ${transferInfo ? `(${optionalText})` : ''}`;
  const maxLength: number = 70;

  const getLetterCount = () => `${notes?.length}/${maxLength}`;

  return (
    <IPayView testID={`${testID}-transfer-information`} style={[styles.gradientView, style]}>
      <IPayView>
        {transferInfo ? (
          <IPayView style={styles.headingView}>
            <IPayImage image={transferInfoData?.icon} style={styles.bankLogo} />
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
            title={localizationText.SEND_MONEY_FORM.RECIPIENT}
            subTextStyle={StyleSheet.flatten(styles.subtitleText)}
            isShowSubTitle
            subTitle={subtitle}
            isShowLeftIcon
            leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
            isShowIcon
            containerStyle={StyleSheet.flatten(styles.headerContainer)}
            icon={<IPayImage image={images.alinmaP} style={styles.alinmaLogo} resizeMode="contain" />}
          />
        )}
      </IPayView>
      <IPayView style={styles.inputContainer}>
        <IPayFootnoteText regular style={styles.text} text={localizationText.TOP_UP.ENTER_AMOUNT} color={colors.natural.natural700} />
        <IPayAmountInput
          carretHidden={false}
          style={styles.amountInput}
          inputStyles={styles.inputText}
          currencyStyle={styles.currencyStyle}
          amount={amount}
          onAmountChange={setAmount}
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
                icon={chipValue === localizationText.TOP_UP.LIMIT_REACHED ? icons.warning : icons.shield_cross}
                color={colors.critical.critical800}
                size={16}
              />
            }
          />
        )}
      </IPayView>
      <IPayPressable onPress={openReason} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          onChangeText={setSelectedItem}
          containerStyle={StyleSheet.flatten(styles.inputField)}
          labelColor={colors.natural.natural500}
          label={localizationText.TRANSACTION_HISTORY.TRANSFER_REASON}
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
      <IPayAnimatedTextInput
        containerStyle={StyleSheet.flatten(styles.inputField)}
        label={notesLabel}
        value={notes}
        maxLength={maxLength}
        onChangeText={setNotes}
      />
      <IPayCaption1Text text={getLetterCount()} style={styles.letterCount} />
      {showRemoveBtn && (
        <IPayView style={styles.btn}>
          <IPayButton
            small
            textStyle={styles.btnText}
            btnText={localizationText.PROFILE.REMOVE}
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

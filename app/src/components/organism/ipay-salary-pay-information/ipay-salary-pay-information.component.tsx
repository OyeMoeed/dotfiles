import React from 'react';
import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayChip, IPayList } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import IPaySalaryPayInformationProps from './ipay-salary-pay-information.interface';
import transferInfoStyles from './ipay-salary-pay-information.style';

const IPaySalaryPayInformation: React.FC<IPaySalaryPayInformationProps> = ({
  testID,
  style,
  amount,
  setAmount,
  isEditable,
  currencyStyle,
  openReason,
  setSelectedItem,
  selectedItem,
  transferInfo,
  chipValue,
  subtitle,
  inputFieldStyle,
  fullName,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = transferInfoStyles(colors);

  const notesText = t('TRANSACTION_HISTORY.NOTE');
  const optionalText = t('COMMON.OPTIONAL');
  const notesLabel = `${notesText} ${transferInfo ? `(${optionalText})` : ''}`;
  const defaultValue: string = '0.00';

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
      <IPayView>
        <IPayList
          textStyle={styles.titleText}
          title={fullName}
          subTextStyle={StyleSheet.flatten(styles.subtitleText)}
          isShowSubTitle
          subTitle={subtitle}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
          containerStyle={StyleSheet.flatten(styles.headerContainer)}
        />
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
                icon={chipValue === t('TOP_UP.LIMIT_REACHED ? icons.warning : icons.shield_cross')}
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
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.SALARY_TYPE"
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
      <IPayPressable onPress={openReason} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          onChangeText={setSelectedItem}
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.SALARY_TYPE"
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
    </IPayView>
  );
};

export default IPaySalaryPayInformation;

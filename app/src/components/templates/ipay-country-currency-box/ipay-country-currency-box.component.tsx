import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayCheckbox,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayImage,
  IPayInput,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayChip } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import CountryCurrencyBoxProps from './ipay-country-currency-box.interface';
import countryCurrencyStyles from './ipay-country-currency-box.style';

/**
 * Properties for the CountryCurrencyBox component.
 * @param {ConverterItemProps} item - The item containing country and currency details.
 * @param {boolean} [isChecked] - Optional boolean to indicate if the box is checked.
 * @param {string} [senderValue] - Optional value for the sender's input field.
 * @param {string} [receiverValue] - Optional value for the receiver's input field.
 * @param {function} [onSenderChange] - Optional callback function for when the sender's value changes.
 * @param {function} [onReceiverChange] - Optional callback function for when the receiver's value changes.
 * @param {function} [onCheckChange] - Optional callback function for when the checked state changes.
 */
const IPayCountryCurrencyBox: React.FC<CountryCurrencyBoxProps> = ({
  item,
  isChecked,
  onSenderChange,
  onReceiverChange,
  senderValue,
  receiverValue,
  onCheckChange,
}) => {
  const { colors } = useTheme();
  const styles = countryCurrencyStyles(colors);
  const localizationText = useLocalization();
  const { bankName, bankImage, sar, egp, fee, balance, senderCurrency, converterCurrency } = item;

  const showGradientBorder = isChecked ? colors.appGradient.gradientSecondary50 : colors.sheetGradientPrimary10;

  return (
    <IPayLinearGradientView style={styles.gradientBox} locations={[0, 1, 1, 1]} gradientColors={showGradientBorder}>
      <IPayView style={styles.conversionContainer}>
        <IPayView style={styles.converterMainWrapper}>
          <IPayView style={styles.converterBalanceWrapper}>
            <IPayView>
              <IPayView style={styles.bankNameWrapper}>
                <IPayImage image={bankImage} style={styles.bankImg} />
                <IPayFootnoteText color={colors.natural.natural900} regular={false} text={bankName} />
              </IPayView>
            </IPayView>
            <IPayView style={styles.checkIconBalanceWrapper}>
              {!isChecked && (
                <IPayView style={styles.rightBalanceWrapper}>
                  <IPaySubHeadlineText color={colors.primary.primary900} text={balance} regular={false} />
                  <IPayCaption1Text text={converterCurrency} style={styles.balance} color={colors.primary.primary900} />
                </IPayView>
              )}
              <IPayCheckbox isCheck={isChecked} onPress={onCheckChange} />
            </IPayView>
          </IPayView>
          <IPayView style={styles.chipWrapper}>
            <IPayChip
              containerStyle={styles.chipStyle}
              isShowIcon={false}
              textElement={
                <IPayCaption2Text
                  color={colors.natural.natural700}
                  text={`${sar} ${senderCurrency} = ${egp} ${converterCurrency}`}
                />
              }
            />
            <IPayChip
              containerStyle={styles.chipStyle}
              isShowIcon={false}
              textElement={
                <IPayCaption2Text
                  color={colors.natural.natural700}
                  text={`${localizationText.LOCAL_TRANSFER.FEES}: ${fee} ${senderCurrency}`}
                />
              }
            />
          </IPayView>
        </IPayView>
        {isChecked && (
          <>
            <IPayLinearGradientView
              style={styles.gradientDivider}
              locations={[0, 1, 1, 1]}
              gradientColors={colors.appGradient.gradientSecondary50}
            />
            <IPayView style={styles.pointsAmountConversion}>
              <IPayView>
                <IPayFootnoteText
                  color={colors.natural.natural700}
                  text={localizationText.COMMON.YOU_SEND}
                  style={styles.amountInputLabel}
                />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="sender-input"
                    text={senderValue ?? ''}
                    placeholder="0"
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.inputTextAmount, senderValue ? styles.darkStyle : {}]}
                    keyboardType="numeric"
                    editable
                    onChangeText={onSenderChange}
                  />
                  <IPayHeadlineText style={[styles.currencyText, senderValue ? styles.darkStyle : {}]}>
                    {senderCurrency}
                  </IPayHeadlineText>
                </IPayView>
              </IPayView>
              <IPayView>
                <IPayLinearGradientView
                  style={styles.gradientLine}
                  locations={[0, 0.3, 0.6, 1]}
                  gradientColors={colors.appGradient.gradientSecondary50}
                />
                <IPayPressable style={styles.revertCycleIcon}>
                  <IPayGradientIcon icon={icons.repeat} />
                </IPayPressable>
              </IPayView>
              <IPayView>
                <IPayFootnoteText
                  color={colors.natural.natural700}
                  text={localizationText.COMMON.THEY_RECEIVE}
                  style={styles.amountInputLabel}
                />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="receiver-input"
                    text={receiverValue ?? ''}
                    placeholder="0"
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.inputTextAmount, receiverValue ? styles.darkStyle : {}]}
                    keyboardType="numeric"
                    editable
                    onChangeText={onReceiverChange}
                  />
                  <IPayHeadlineText style={[styles.currencyText, receiverValue ? styles.darkStyle : {}]}>
                    {localizationText.COMMON.EGP}
                  </IPayHeadlineText>
                </IPayView>
              </IPayView>
            </IPayView>
          </>
        )}
      </IPayView>
    </IPayLinearGradientView>
  );
};

export default IPayCountryCurrencyBox;

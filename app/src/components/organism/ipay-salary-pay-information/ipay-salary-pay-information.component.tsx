import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayText,
  IPayView,
} from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayChip, IPayList } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities';

import IPaySalaryPayInformationProps from './ipay-salary-pay-information.interface';
import transferInfoStyles from './ipay-salary-pay-information.style';

const IPaySalaryPayInformation: React.FC<IPaySalaryPayInformationProps> = ({
  testID,
  style,
  openReason,
  selectedItem,
  subtitle,
  inputFieldStyle,
  fullName,
  onPressDatePicker,
  onPressDeductFlag,
  onPressPayExtraFlag,
  deductFlag,
  payExtraFlag,
  amount,
  selectedDate,
  onPressDeductionShow,
  deductionAmount,
  setDeductionAmount,
  payExtraAmount,
  setPayExtraAmount,
  selectedDeductionReason,
  payExtraNote,
  setPayExtraNote,
}) => {
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);
  const { t } = useTranslation();
  const [chipValue, setChipValue] = useState(false);

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

  useEffect(() => {
    if (Number(deductionAmount) >= Number(amount)) {
      setChipValue(true);
    } else {
      setChipValue(false);
    }
  }, [amount, deductionAmount]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const DeductExtraComponent = () =>
    deductFlag ? (
      <IPayView style={styles.deductInputContainer}>
        <IPayView style={styles.deductAmountInput}>
          <IPayFootnoteText
            regular
            style={styles.text}
            text="MUSANED.ENTER_DEDUCTION_AMOUNT"
            color={colors.natural.natural700}
          />
          <IPayAmountInput
            carretHidden={false}
            style={styles.amountInput}
            inputStyles={styles.inputText}
            currencyStyle={[styles.currencyStyle]}
            defaultValue={defaultValue}
            amount={deductionAmount}
            onAmountChange={(value) => setDeductionAmount(validateAmountInput(value))}
            isEditable
          />
        </IPayView>
        {chipValue && (
          <IPayChip
            textValue="MUSANED.DEDUCTION_AMOUNT_NOTE"
            variant={States.WARNING}
            isShowIcon
            fullWidth
            containerStyle={styles.deductChipContainer}
            icon={<IPayIcon icon={icons.shield_cross} color={colors.critical.critical800} size={16} />}
          />
        )}
        <IPayPressable onPress={onPressDeductionShow} style={styles.reasonsView}>
          <IPayAnimatedTextInput
            pointerEvents="none"
            containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
            labelColor={colors.natural.natural500}
            label="MUSANED.DEDUCTION_REASON"
            value={t(selectedDeductionReason?.text || '')}
            editable={false}
            showRightIcon
            customIcon={
              <IPayPressable onPress={onPressDeductionShow}>
                <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
              </IPayPressable>
            }
          />
        </IPayPressable>
      </IPayView>
    ) : null;

  // eslint-disable-next-line react/no-unstable-nested-components
  const PayExtraComponent = () =>
    payExtraFlag ? (
      <IPayView style={styles.deductInputContainer}>
        <IPayView style={styles.deductAmountInput}>
          <IPayFootnoteText
            regular
            style={styles.text}
            text="MUSANED.ENTER_DEDUCTION_AMOUNT"
            color={colors.natural.natural700}
          />
          <IPayAmountInput
            carretHidden={false}
            style={styles.amountInput}
            inputStyles={styles.inputText}
            currencyStyle={[styles.currencyStyle]}
            defaultValue={defaultValue}
            amount={payExtraAmount}
            onAmountChange={(value) => setPayExtraAmount(validateAmountInput(value))}
            isEditable
          />
        </IPayView>
        {payExtraAmount && (
          <IPayChip
            textValue={`${t('MUSANED.PAY_SALARY')} ${Number(amount) + Number(payExtraAmount)}`}
            variant={States.NATURAL}
            isShowIcon={false}
            fullWidth
            headingStyles={styles.payExtraChipContainer}
          />
        )}
        <IPayAnimatedTextInput
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.NOTE"
          value={payExtraNote}
          onChange={setPayExtraNote}
        />
      </IPayView>
    ) : null;

  return (
    <IPayView testID={`${testID}-transfer-information`} style={[styles.gradientView, style]}>
      <IPayList
        textStyle={styles.titleText}
        title={fullName}
        subTextStyle={StyleSheet.flatten(styles.subtitleText)}
        isShowSubTitle
        subTitle={subtitle}
        isShowLeftIcon
        rightText={
          <IPayView>
            <IPayCaption1Text text="MUSANED.BASIC_SALARY" />
            <IPayText text={`${amount} ${t('COMMON.SAR')}`} />
          </IPayView>
        }
        leftIcon={<IPayIcon icon={icons.user_filled} color={colors.primary.primary500} />}
        containerStyle={StyleSheet.flatten(styles.headerContainer)}
      />

      <IPayPressable onPress={openReason} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.SALARY_TYPE"
          value={t(selectedItem || '')}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={openReason}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
        />
      </IPayPressable>
      <IPayPressable onPress={onPressDatePicker} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.SELECT_MONTH"
          value={selectedDate}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={onPressDatePicker}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
          rightIcon={<IPayIcon fill="currentColor" icon={icons.calendar} size={22} color={colors.primary.primary500} />}
        />
      </IPayPressable>

      <IPayPressable onPress={onPressDeductFlag} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents={deductFlag ? 'auto' : 'none'}
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.DEDUCT_FROM_AMOUNT"
          value={selectedItem}
          editable={false}
          showRightIcon
          customIcon={<IPayCheckbox isCheck={deductFlag} onPress={onPressDeductFlag} />}
          extraComponent={<DeductExtraComponent />}
        />
      </IPayPressable>
      <IPayPressable onPress={onPressPayExtraFlag} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          pointerEvents={payExtraFlag ? 'auto' : 'none'}
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.PAY_EXTRA"
          value={selectedItem}
          editable={false}
          showRightIcon
          customIcon={<IPayCheckbox isCheck={payExtraFlag} onPress={onPressPayExtraFlag} />}
          extraComponent={<PayExtraComponent />}
        />
      </IPayPressable>
    </IPayView>
  );
};

export default IPaySalaryPayInformation;

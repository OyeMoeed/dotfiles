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
import { SalaryCategories } from '@app/screens/musaned/musaned-pay-salary/musaned-pay-salary.interface';
import { getColorsStyle } from '@app/components/molecules/ipay-chip/ipay-chip.style';
import { isArabic } from '@app/utilities/constants';

import IPaySalaryPayInformationProps from './ipay-salary-pay-information.interface';
import salaryPayInformation from './ipay-salary-pay-information.style';
import IPaySalaryPayDateSelector from './ipay-salary-pay-date-selector.component';

const IPaySalaryPayInformation: React.FC<IPaySalaryPayInformationProps> = ({
  testID,
  style,
  openReason,
  salaryType,
  salaryId,
  subtitle,
  inputFieldStyle,
  fullName,
  onPressDatePicker,
  onPressDeductFlag,
  onPressPayExtraFlag,
  deductFlag,
  payExtraFlag,
  amount,
  selectedFromDate,
  selectedToDate,
  onPressDeductionShow,
  deductionAmount,
  setDeductionAmount,
  payExtraAmount,
  setPayExtraAmount,
  selectedDeductionReason,
  payExtraNote,
  setPayExtraNote,
  bonusAmount,
  setBonusAmount,
  setDeductionReasonsTypes,
  setBonusAmountNote,
  bonusAmountNote,
  isToDateLessThanFromDate,
  isToDateMoreThan6,
  dateFromNow,
}) => {
  const { colors } = useTheme();
  const styles = salaryPayInformation(colors);
  const { t } = useTranslation();
  const [chipValue, setChipValue] = useState(false);

  const defaultValue: string = '0.00';
  const isAdvanceSalary = salaryId === SalaryCategories.Advanced_Salary;
  const isBonusSalary = salaryId === SalaryCategories.Bonus_Salary;

  const validateAmountInput = (value: string | number = '') => {
    // Split the value by the decimal point
    const [integerPart, decimalPart] = String(value).split('.');

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

  useEffect(() => {
    if (!deductFlag) {
      setDeductionAmount(0);
      setDeductionReasonsTypes({});
    }
  }, [deductFlag]);

  useEffect(() => {
    if (!payExtraFlag) {
      setPayExtraAmount(0);
      setPayExtraNote('');
    }
  }, [payExtraFlag]);

  const { textStyle, backgroundStyle } = getColorsStyle(colors, States.NATURAL);
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

        {chipValue ? (
          <IPayChip
            textValue={chipValue ? 'MUSANED.DEDUCTION_AMOUNT_NOTE' : ''}
            variant={chipValue ? States.WARNING : States.NATURAL}
            isShowIcon={chipValue}
            fullWidth
            containerStyle={styles.deductChipContainer}
            icon={<IPayIcon icon={icons.shield_cross} color={colors.critical.critical800} size={16} />}
          />
        ) : (
          <IPayList
            title="MUSANED.PAID_SALARY"
            isShowIcon
            isShowDetail
            textStyle={{
              ...styles.titleStyle,
              ...textStyle,
            }}
            containerStyle={backgroundStyle}
            detailTextStyle={styles.listTextStyle}
            detailText={`${Number(amount) - Number(deductionAmount)} ${t('COMMON.SAR')}`}
            detailIconDisabled
            shouldTranslateSubTitle={false}
          />
        )}

        <IPayPressable onPress={onPressDeductionShow} style={styles.reasonsView}>
          <IPayAnimatedTextInput
            pointerEvents="none"
            containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
            labelColor={colors.natural.natural500}
            label="MUSANED.DEDUCTION_REASON"
            value={t(selectedDeductionReason?.text || '')}
            textAlign={isArabic ? 'right' : 'left'}
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
          <IPayFootnoteText regular style={styles.text} text="MUSANED.EXTRA_AMOUNT" color={colors.natural.natural700} />
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

        <IPayList
          title="MUSANED.PAID_SALARY"
          isShowIcon
          isShowDetail
          textStyle={{
            ...styles.titleStyle,
            ...textStyle,
          }}
          containerStyle={backgroundStyle}
          detailTextStyle={styles.listTextStyle}
          detailText={`${Number(amount) + Number(payExtraAmount)} ${t('COMMON.SAR')}`}
          detailIconDisabled
          shouldTranslateSubTitle={false}
        />
        <IPayAnimatedTextInput
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.NOTE"
          value={payExtraNote}
          onChangeText={(text) => setPayExtraNote(text)}
          textAlign={isArabic ? 'right' : 'left'}
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
          value={t(salaryType || '')}
          editable={false}
          showRightIcon
          textAlign={isArabic ? 'right' : 'left'}
          customIcon={
            <IPayPressable onPress={openReason}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
        />
      </IPayPressable>

      {isBonusSalary ? (
        <IPayView>
          <IPayView style={styles.deductAmountInput}>
            <IPayFootnoteText
              regular
              style={styles.text}
              text="MUSANED.ENTER_BONUS_AMOUNT"
              color={colors.natural.natural700}
            />
            <IPayAmountInput
              carretHidden={false}
              style={styles.amountInput}
              inputStyles={styles.inputText}
              currencyStyle={[styles.currencyStyle]}
              defaultValue={defaultValue}
              amount={bonusAmount}
              onAmountChange={(value) => setBonusAmount(validateAmountInput(value))}
              isEditable
            />
          </IPayView>
          <IPayAnimatedTextInput
            containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
            labelColor={colors.natural.natural500}
            label="MUSANED.NOTE"
            value={bonusAmountNote}
            onChange={(value) => setBonusAmountNote(String(value))}
            textAlign={isArabic ? 'right' : 'left'}
          />
        </IPayView>
      ) : (
        <>
          <IPaySalaryPayDateSelector
            selectedDate={selectedFromDate}
            selectedToDate={selectedToDate}
            isAdvanceSalary={isAdvanceSalary}
            onPressDatePicker={onPressDatePicker}
            amount={amount}
            isMainScreen
            isToDateLessThanFromDate={isToDateLessThanFromDate}
            isToDateMoreThan6={isToDateMoreThan6}
            dateFromNow={dateFromNow}
          />
          <IPayPressable onPress={onPressDeductFlag} style={styles.reasonsView}>
            <IPayAnimatedTextInput
              pointerEvents={deductFlag ? 'auto' : 'none'}
              containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
              labelColor={colors.natural.natural500}
              label="MUSANED.DEDUCT_FROM_AMOUNT"
              editable={false}
              showRightIcon
              customIcon={<IPayCheckbox isCheck={deductFlag} onPress={onPressDeductFlag} />}
              extraComponent={<DeductExtraComponent />}
              textAlign={isArabic ? 'right' : 'left'}
            />
          </IPayPressable>
          <IPayPressable onPress={onPressPayExtraFlag} style={styles.reasonsView}>
            <IPayAnimatedTextInput
              pointerEvents={payExtraFlag ? 'auto' : 'none'}
              containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
              labelColor={colors.natural.natural500}
              label="MUSANED.PAY_EXTRA"
              editable={false}
              showRightIcon
              customIcon={<IPayCheckbox isCheck={payExtraFlag} onPress={onPressPayExtraFlag} />}
              extraComponent={<PayExtraComponent />}
              textAlign={isArabic ? 'right' : 'left'}
            />
          </IPayPressable>
        </>
      )}
    </IPayView>
  );
};

export default IPaySalaryPayInformation;

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayCheckbox, IPayIcon, IPayPressable, IPayText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayList } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities';
import { SalaryCategories } from '@app/screens/musaned/musaned-pay-salary/musaned-pay-salary.interface';
import { getColorsStyle } from '@app/components/molecules/ipay-chip/ipay-chip.style';
import { isArabic } from '@app/utilities/constants';

import IPaySalaryPayInformationProps from './ipay-salary-pay-information.interface';
import salaryPayInformation from './ipay-salary-pay-information.style';
import IPaySalaryPayDateSelector from './ipay-salary-pay-date-selector.component';
import payExtraComponent from './ipay-pay-extra.component';
import deductExtraComponent from './ipay-deduct-extra.component';
import IPayBonesSalarySection from './ipay-bouns-salary-section.component';

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
  comingMonthsCount,
}) => {
  const { colors } = useTheme();
  const styles = salaryPayInformation(colors);
  const { t } = useTranslation();
  const [chipValue, setChipValue] = useState(false);

  const comingMonthsNow = comingMonthsCount === 0 ? 1 : comingMonthsCount;
  const defaultValue: string = '0.00';
  const isAdvanceSalary = salaryId === SalaryCategories.Advanced_Salary;
  const isBonusSalary = salaryId === SalaryCategories.Bonus_Salary;

  useEffect(() => {
    setChipValue(Number(deductionAmount) >= Number(amount));
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

  const extraComponentPayExtra = payExtraComponent({
    payExtraFlag,
    defaultValue,
    payExtraAmount,
    setPayExtraAmount,
    textStyle,
    backgroundStyle,
    amount,
    inputFieldStyle,
    payExtraNote,
    setPayExtraNote,
    t,
    colors,
    styles,
  });

  const extraComponentDeductExtra = deductExtraComponent({
    deductFlag,
    defaultValue,
    deductionAmount,
    setDeductionAmount,
    amount,
    chipValue,
    comingMonthsNow,
    onPressDeductionShow,
    backgroundStyle,
    inputFieldStyle,
    textStyle,
    selectedDeductionReason,
    styles,
    colors,
    t,
  });

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
          withExtraPadding={false}
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
        <IPayBonesSalarySection
          amount={amount}
          bonusAmount={bonusAmount}
          bonusAmountNote={bonusAmountNote}
          defaultValue={defaultValue}
          inputFieldStyle={inputFieldStyle}
          setBonusAmount={setBonusAmount}
          setBonusAmountNote={setBonusAmountNote}
        />
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
            comingMonthsCount={comingMonthsCount}
          />
          <IPayPressable onPress={onPressDeductFlag} style={styles.reasonsView}>
            <IPayAnimatedTextInput
              withExtraPadding={false}
              pointerEvents={deductFlag ? 'auto' : 'none'}
              containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
              labelColor={colors.natural.natural500}
              label="MUSANED.DEDUCT_FROM_AMOUNT"
              editable={false}
              showRightIcon
              customIcon={<IPayCheckbox isCheck={deductFlag} onPress={onPressDeductFlag} />}
              extraComponent={extraComponentDeductExtra}
              textAlign={isArabic ? 'right' : 'left'}
            />
          </IPayPressable>
          <IPayPressable onPress={onPressPayExtraFlag} style={styles.reasonsView}>
            <IPayAnimatedTextInput
              withExtraPadding={false}
              pointerEvents={payExtraFlag ? 'auto' : 'none'}
              containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
              labelColor={colors.natural.natural500}
              label="MUSANED.PAY_EXTRA"
              editable={false}
              showRightIcon
              customIcon={<IPayCheckbox isCheck={payExtraFlag} onPress={onPressPayExtraFlag} />}
              extraComponent={extraComponentPayExtra}
              textAlign={isArabic ? 'right' : 'left'}
            />
          </IPayPressable>
        </>
      )}
    </IPayView>
  );
};

export default IPaySalaryPayInformation;

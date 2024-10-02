import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IPayCaption1Text, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayAnimatedTextInput, IPayList } from '@app/components/molecules';
import icons from '@app/assets/icons';

import salaryPayInformation from './ipay-salary-pay-information.style';
import { IPaySalaryPayDateSelectorProps } from './ipay-salary-pay-information.interface';

const IPaySalaryPayDateSelector: FC<IPaySalaryPayDateSelectorProps> = ({
  inputFieldStyleFromDate,
  inputFieldStyleToDate,
  isAdvanceSalary,
  onPressDatePicker,
  selectedDate,
  selectedToDate,
  isMainScreen = false,
  amount = 0,
  isToDateLessThanFromDate,
  isToDateMoreThan6,
  dateFromNow,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = salaryPayInformation(colors);

  const toDateError = selectedToDate ? isToDateMoreThan6 || isToDateLessThanFromDate : false;
  const errorMessage = isToDateMoreThan6 ? 'MUSANED.MAXIMUM_DURATION_MESSAGE' : 'MUSANED.ENSURE_CORRECT_DATE';

  const onPressDatePickerData = (value: 'FROM_DATE' | 'TO_DATE') => {
    onPressDatePicker(value);
  };

  return (
    <IPayView style={styles.datePickerContainer}>
      <IPayPressable
        onPress={() => onPressDatePickerData('FROM_DATE')}
        style={[styles.reasonsView, isAdvanceSalary ? styles.width50 : styles.width100]}
      >
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyleFromDate]}
          labelColor={colors.natural.natural500}
          label={isAdvanceSalary ? 'MUSANED.FROM_DATE' : 'MUSANED.SELECT_MONTH'}
          value={String(selectedDate)}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={() => onPressDatePickerData('FROM_DATE')}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
          rightIcon={
            isAdvanceSalary ? (
              <IPayView />
            ) : (
              <IPayIcon fill="currentColor" icon={icons.calendar} size={22} color={colors.primary.primary500} />
            )
          }
        />
      </IPayPressable>
      {isAdvanceSalary ? (
        <IPayPressable onPress={() => onPressDatePickerData('TO_DATE')} style={[styles.reasonsView, styles.width50]}>
          <IPayAnimatedTextInput
            pointerEvents="none"
            containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyleToDate]}
            labelColor={colors.natural.natural500}
            label="MUSANED.TO_DATE"
            value={String(selectedToDate)}
            editable={false}
            showRightIcon
            customIcon={
              <IPayPressable onPress={() => onPressDatePickerData('TO_DATE')}>
                <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
              </IPayPressable>
            }
          />
          {toDateError ? <IPayCaption1Text color={colors.error.error500} text={errorMessage} /> : <IPayView />}
        </IPayPressable>
      ) : null}
      {isAdvanceSalary && selectedToDate && dateFromNow > 0 && dateFromNow < 7 ? (
        <IPayList
          title="MUSANED.SELECTED_MONTH"
          isShowIcon
          isShowDetail
          textStyle={styles.titleStyle}
          detailTextStyle={styles.listTextStyle}
          detailText={`${dateFromNow} ${t('MUSANED.MONTHS')}`}
          detailIconDisabled
          shouldTranslateSubTitle={false}
        />
      ) : null}
      {dateFromNow && isMainScreen && isAdvanceSalary ? (
        <IPayList
          title="MUSANED.TOTAL_SALARY"
          isShowIcon
          isShowDetail
          textStyle={styles.titleStyle}
          detailTextStyle={styles.listTextStyle}
          detailText={`${dateFromNow * Number(amount)} ${t('COMMON.SAR')}`}
          detailIconDisabled
          shouldTranslateSubTitle={false}
        />
      ) : null}
    </IPayView>
  );
};

export default IPaySalaryPayDateSelector;

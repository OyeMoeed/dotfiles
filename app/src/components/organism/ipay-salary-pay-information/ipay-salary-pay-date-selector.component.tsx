import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayAnimatedTextInput, IPayList } from '@app/components/molecules';
import icons from '@app/assets/icons';

import salaryPayInformation from './ipay-salary-pay-information.style';
import { IPaySalaryPayDateSelectorProps } from './ipay-salary-pay-information.interface';

const IPaySalaryPayDateSelector: FC<IPaySalaryPayDateSelectorProps> = ({
  onPressDatePicker,
  isAdvanceSalary,
  selectedDate,
  inputFieldStyleFromDate,
  inputFieldStyleToDate,
  selectedToDate,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = salaryPayInformation(colors);

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
        {/* <IPayCaption1Text text="asd" /> */}
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
          {/* <IPayCaption1Text text="asd" /> */}
        </IPayPressable>
      ) : null}
      <IPayList
        title="MUSANED.SELECTED_MONTH"
        isShowIcon
        isShowDetail
        textStyle={styles.titleStyle}
        detailTextStyle={styles.listTextStyle}
        detailText={`1 ${t('MUSANED.MONTHS')}`}
        detailIconDisabled
        shouldTranslateSubTitle={false}
      />
    </IPayView>
  );
};

export default IPaySalaryPayDateSelector;

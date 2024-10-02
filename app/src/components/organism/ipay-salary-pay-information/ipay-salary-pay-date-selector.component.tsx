import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import icons from '@app/assets/icons';

import salaryPayInformation from './ipay-salary-pay-information.style';
import { IPaySalaryPayDateSelectorProps } from './ipay-salary-pay-information.interface';

const IPaySalaryPayDateSelector: FC<IPaySalaryPayDateSelectorProps> = ({
  onPressDatePicker,
  isAdvanceSalary,
  selectedDate,
  inputFieldStyle,
  selectedToDate,
}) => {
  const { colors } = useTheme();
  const styles = salaryPayInformation(colors);

  return (
    <IPayView style={styles.datePickerContainer}>
      <IPayPressable
        onPress={onPressDatePicker}
        style={[styles.reasonsView, isAdvanceSalary ? styles.width50 : styles.width100]}
      >
        <IPayAnimatedTextInput
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label={isAdvanceSalary ? 'MUSANED.FROM_DATE' : 'MUSANED.SELECT_MONTH'}
          value={String(selectedDate)}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={onPressDatePicker}>
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
        <IPayPressable onPress={onPressDatePicker} style={[styles.reasonsView, styles.width50]}>
          <IPayAnimatedTextInput
            pointerEvents="none"
            containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
            labelColor={colors.natural.natural500}
            label="MUSANED.TO_DATE"
            value={String(selectedToDate)}
            editable={false}
            showRightIcon
            customIcon={
              <IPayPressable onPress={onPressDatePicker}>
                <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
              </IPayPressable>
            }
          />
        </IPayPressable>
      ) : (
        <IPayView />
      )}
    </IPayView>
  );
};

export default IPaySalaryPayDateSelector;

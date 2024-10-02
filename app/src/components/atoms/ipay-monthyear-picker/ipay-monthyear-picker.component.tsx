import constants from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatYearToLastTwoDigits } from '@app/utilities/date-helper.util';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayMonthYearPickerProps } from './ipay-monthyear-picker.interface';
import datePickerStyles from './ipay-monthyear-picker.styles';

/**
 * A component to display and date picker text.
 * @param {IPayMonthYearPickerProps} props - The props for the IPayMonthYearPickerProps component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {object} [props.style] - Additional styles for the date picker component.
 * @param {object} [props.androidStyle] - Additional android styles for the date picker component.
 * @param {string} [props.mode] - Mode for the date picker component
 * @param {string} [props.display] - Display style of date picker
 * @param {function} [props.onDateChange] - Callback function invoked when the date picker's date changes.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayMonthYearPicker: React.FC<IPayMonthYearPickerProps> = ({
  androidStyle,
  onDateChange,
  value,
  testID,
  withYear20 = false,
}) => {
  const { colors } = useTheme();

  const generateYears = (startYear: number) => {
    const endYear = 2040;
    const years = [];
    // eslint-disable-next-line no-plusplus
    for (let year = startYear; year <= endYear; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const initialDate = (value || '')?.split('/');
  const years = generateYears(2024);
  const [selectedMonth, setSelectedMonth] = useState(initialDate[0]);
  const [selectedYear, setSelectedYear] = useState(`20${initialDate[1]}`);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    onDateChange?.(`${month}/${formatYearToLastTwoDigits(selectedYear)}`);
  };

  const handleYearChange = (year: string) => {
    const formattedYear = formatYearToLastTwoDigits(year);
    const formattedYearText = withYear20 ? `20${formattedYear}` : `${formattedYear}`;
    setSelectedYear(formattedYearText);
    onDateChange?.(`${selectedMonth}/${formattedYearText}`);
  };

  const styles = datePickerStyles(colors);

  return (
    <IPayView testID={`${testID}-monthyearPicker`} style={styles.pickerContainer}>
      <Picker
        style={[styles.picker, Platform.OS !== 'ios' && androidStyle]}
        selectedValue={selectedMonth}
        pickerData={constants.monthsString}
        onValueChange={(index: string) => handleMonthChange(index)}
        textColor={colors.primary.primary500}
        accentColor={colors.primary.primary500}
        itemStyle={styles.itemSize}
        textSize={20}
      />
      <Picker
        textSize={20}
        itemStyle={styles.itemSize}
        selectedValue={selectedYear}
        pickerData={years}
        onValueChange={(index: string) => handleYearChange(index)}
        textColor={colors.primary.primary500}
        accentColor={colors.primary.primary500}
        style={[styles.picker, Platform.OS !== 'ios' && androidStyle]}
      />
    </IPayView>
  );
};

export default IPayMonthYearPicker;

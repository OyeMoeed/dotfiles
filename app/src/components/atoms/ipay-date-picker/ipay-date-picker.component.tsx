import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { Platform } from 'react-native';
import { DatePicker } from 'react-native-wheel-pick';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayDatePickerProps } from './ipay-date-picker.interface';

/**
 * A component to display and date picker text.
 * @param {IPayDatePickerProps} props - The props for the IPayDatePickerProps component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {object} [props.style] - Additional styles for the date picker component.
 * @param {object} [props.androidStyle] - Additional android styles for the date picker component.
 * @param {string} [props.mode] - Mode for the date picker component
 * @param {string} [props.display] - Display style of date picker
 * @param {function} [props.onDateChange] - Callback function invoked when the date picker's date changes.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayDatePicker: React.FC<IPayDatePickerProps> = ({
  androidStyle,
  style,
  onDateChange,
  value,
  testID,
  display = 'spinner',
  mode = 'date',
  ...rest
}) => {
  const { colors } = useTheme();
  return (
    <IPayView style={style}>
      <DatePicker
        testID={`${testID} - dateTimePicker`}
        onDateChange={onDateChange}
        mode={mode}
        display={display}
        style={Platform.OS !== 'ios' && androidStyle}
        is24Hour={false}
        value={value || new Date()}
        textColor={colors.primary.primary500}
        accentColor={colors.primary.primary500}
        {...rest}
      />
    </IPayView>
  );
};

export default IPayDatePicker;

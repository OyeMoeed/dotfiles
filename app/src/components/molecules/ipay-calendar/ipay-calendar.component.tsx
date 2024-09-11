import icons from '@app/assets/icons';
import { IPayDatePicker, IPayIcon } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import moment, { MomentInput } from 'moment';
import React, { useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import IPayPressable from '../../atoms/ipay-pressable/ipay-pressable.component';
import IPayText from '../../atoms/ipay-text/ipay-base-text/ipay-text.component';
import IPayView from '../../atoms/ipay-view/ipay-view.component';
import { IPayCalendarProps } from './ipay-calendar.interface';
import CalendarStyles from './ipay-calendar.style';

/**
 * @param {function} [props.onDateSelected] - Callback function invoked when the IPayCalendar date changes.
 */

const IPayCalendar: React.FC<IPayCalendarProps> = ({ onDateSelected }) => {
  const { colors } = useTheme();
  const styles = CalendarStyles(colors);
  const [currentDate, setCurrentDate] = useState<MomentInput>(moment());
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<MomentInput>(moment());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const goPrevMonth = () => {
    setCurrentDate((prev) => moment(prev).subtract(1, 'month').format('YYYY-MM-DD'));
  };

  const goNextMonth = () => {
    setCurrentDate((prev) => moment(prev).add(1, 'month').format('YYYY-MM-DD'));
  };
  const openDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const renderHeader = () => (
    <IPayView style={styles.calenderHeaderWrapper}>
      <IPayView style={styles.chevrons}>
        <IPayPressable onPress={goPrevMonth} testID="previous-month">
          <IPayIcon icon={icons.ARROW_LEFT_DEFAULT} color={colors.primary.primary500} />
        </IPayPressable>
        <IPayPressable style={styles.monthYearTextView} onPress={openDatePicker} testID="show-date-changer">
          <IPayText style={styles.month}>{moment(currentDate).format('MMMM YYYY')}</IPayText>
          {showDatePicker ? (
            <IPayIcon icon={icons.arrowDown} color={colors.primary.primary500} />
          ) : (
            <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} color={colors.primary.primary500} />
          )}
        </IPayPressable>
        <IPayPressable onPress={goNextMonth} testID="next-month">
          <IPayIcon icon={icons.ARROW_RIGHT_DEFAULT} color={colors.primary.primary500} />
        </IPayPressable>
      </IPayView>
    </IPayView>
  );

  const onMonthChange = (date: DateData) => {
    setCurrentDate((prev) => moment(date?.dateString) || prev);
  };

  const selectedDate = (date: DateData) => {
    setCalendarSelectedDate(date.dateString);
    const timestamp = moment(date.timestamp);
    // Format the moment object to ISO 8601 string
    const isoString = timestamp.toISOString();
    onDateSelected(isoString);
  };

  const wheelPickerDateChange = (date: string) => {
    setCalendarSelectedDate(moment(date).format('YYYY-MM-DD'));
    setCurrentDate((prev) => moment(date).format('YYYY-MM-DD') || prev);
    onDateSelected(date);
  };
  const calendarTheme = {
    todayTextColor: colors.primary.primary500,
    selectedDayBackgroundColor: colors.primaryWithOpacity,
    selectedDayTextColor: colors.primary.primary500,
  };
  return (
    <IPayView>
      <Calendar
        initialDate={moment(currentDate).format('YYYY-MM-DD')}
        onDayPress={selectedDate}
        enableSwipeMonths
        hideArrows
        renderHeader={renderHeader}
        onMonthChange={onMonthChange}
        markedDates={{
          [calendarSelectedDate as string]: { selected: true },
        }}
        theme={calendarTheme}
      />
      {showDatePicker && (
        <IPayDatePicker
          onDateChange={wheelPickerDateChange}
          style={styles.datePicker}
          androidStyle={styles.datePickerAndroidStyle}
        />
      )}
    </IPayView>
  );
};

export default IPayCalendar;

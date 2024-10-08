/**
 * Defines variants types used for date time formats.
 */

enum DateTimeFormat {
  // Date formats
  FullDate = 'dddd, MMMM D, YYYY', // Format date to "Monday, June 15, 2023"
  TimeAndDate = 'HH:mm - DD/MM/YYYY',
  DateAndTime = 'DD/MM/YYYY - HH:mm',
  DateMonthYear = 'DD / MM / YYYY', // Format date to "01 / 01 / 2024",
  DateMonthYearWithoutSpace = 'DD/MM/YYYY',
  ShortDate = 'MM/DD/YYYY', // Format date to "06/15/2023"
  YearMonth = 'YYYY-MM', // Format date to "2023-06"
  ISODate = 'YYYY-MM-DD', // Format date to "2023-06-15"
  MonthDay = 'MMMM D', // Format date to "June 15"
  DayMonth = 'D MMMM', // Format date to "15 June"
  DayMonthYear = 'D MMMM YYYY', // Format date to "15 June 2023"
  WeekdayShortDate = 'ddd, MMM D', // Format date to "Mon, Jun 15"
  ShortMonthYear = 'MMM YYYY', // Format date to "Jun 2023"
  ShortMonthDayYear = 'MMM D, YYYY', // Format date to "Jun 15, 2023"
  ShortDayMonthYear = 'D MMM YYYY', // Format date to "15 Jun 2023"
  ShortDayMonth = 'D MMM', // Format date to "15 Jun"
  MonthYear = 'MM/YY', // Format date to "June 15"
  YearMonthDate = 'YYYY-MM-DDTHH:mm:ss',
  MonthDateFormat = 'MM-DD-YYYY',
  DayMonthYearAndTime = 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ',
  ShortDateWithDash = 'DD-MM-YYYY', // Format date to "16-09-2024"

  // Time formats
  HourMinute = 'hh:mm A', // Format time to "08:00 AM"
  HourMinuteSecond = 'hh:mm:ss A', // Format time to "08:00:00 AM"
  HourMinute24 = 'HH:mm', // Format time to "08:00" in 24-hour format
  HourMinuteSecond24 = 'HH:mm:ss', // Format time to "08:00:00" in 24-hour format
  ShortHourMinute = 'h:mm A', // Format time to "8:00 AM"
  ShortHourMinuteSecond = 'h:mm:ss A', // Format time to "8:00:00 AM"
  ShortMilitaryTime = 'H:mm', // Format time to "8:00" in 24-hour format
}

export default DateTimeFormat;

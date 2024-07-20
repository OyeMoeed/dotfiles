import moment from 'moment';
import dateTimeFormat from './date.const';

function formatDateAndTime(date?: Date, format?: dateTimeFormat): string {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format(dateTimeFormat.DayMonthYear); // fallback
}
function formatYearToLastTwoDigits(year: string) {
  // Convert the input to a string
  const yearString = year.toString();

  // Extract the last two digits
  const lastTwoDigits = yearString.slice(-2);

  return lastTwoDigits;
}
const formatCountdownTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export { formatCountdownTime, formatDateAndTime, formatYearToLastTwoDigits };

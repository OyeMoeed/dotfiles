import moment from 'moment';
import dateTimeFormat from './date.const';

const FORMAT_1 = 'DD/MM/YYYY';

function formatDateAndTime(date?: string, format?: dateTimeFormat): string {
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

export { FORMAT_1, formatDateAndTime, formatYearToLastTwoDigits };

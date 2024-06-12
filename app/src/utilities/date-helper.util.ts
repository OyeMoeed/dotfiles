import moment from 'moment';
import dateTimeFormat from './date.const';

function formatDateAndTime(date?: Date, format?: dateTimeFormat): string {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format(dateTimeFormat.DayMonthYear); // fallback
}

export default { formatDateAndTime };

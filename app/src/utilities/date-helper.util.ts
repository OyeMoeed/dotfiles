import moment from 'moment';
import dateTimeFormat from './date.const';

const FORMAT_1 = 'DD/MM/YYYY';
const FORMAT_2 = 'DD / MM / YYYY';

const formatDateAndTime = (date?: Date, format?: dateTimeFormat): string => {
  if (format) {
    return moment(date).format(format);
  }
  return moment(date).format(dateTimeFormat.DayMonthYear); // fallback
};

const formatYearToLastTwoDigits = (year: string) => {
  // Convert the input to a string
  const yearString = year.toString();

  // Extract the last two digits
  const lastTwoDigits = yearString.slice(-2);

  return lastTwoDigits;
};

const formatTimeAndDate = (dateString: string) => moment(dateString).format(dateTimeFormat.TimeAndDate);

const formatCountdownTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
function minutesToSeconds(minutes: string | number) {
  const min = parseInt(minutes);
  return min * 60;
}

const checkDateValidation = (date: string, dateFormate: string) => moment(date, dateFormate, true);

export {
  FORMAT_1,
  FORMAT_2,
  checkDateValidation,
  formatCountdownTime,
  formatDateAndTime,
  formatTime,
  formatTimeAndDate,
  formatYearToLastTwoDigits,
  minutesToSeconds,
};

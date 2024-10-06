import moment from 'moment';
import dateTimeFormat from './date.const';

enum DateFieldTypes {
  Hijri = 'hijri',
  Future = 'Future',
  Past = 'Past',
  Other = 'other',
}
const FORMAT_1 = 'DD/MM/YYYY';

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
const getFormattedDate = (date: string | Date, dateFormat: string, inputFormat?: string) => {
  return inputFormat
    ? moment(date, inputFormat).format(dateFormat) 
    : moment(date).format(dateFormat); 
};
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
  const min = parseInt(String(minutes), 10);
  return min * 60;
}

const checkDateValidation = (date: string, dateFormate: string) => moment(date, dateFormate, true);

const getDateFormate = (date: string | Date, dateFormate: string) => moment(date).format(dateFormate);

/**
 * Format date string to 'DD/MM/YYYY - HH:mm'
 * @param dateStr - Date string in ISO format
 * @returns Formatted date string
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

const formatSlashDateTime = (tisoDate?: any): string => {
  const date = new Date(tisoDate);
  const hours = date?.getHours();
  const minutes = date?.getMinutes();
  let strMin: string | number = '';
  strMin = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${strMin}`;
  return strTime;
};

export {
  DateFieldTypes,
  FORMAT_1,
  checkDateValidation,
  formatCountdownTime,
  formatDate,
  formatDateAndTime,
  formatSlashDateTime,
  formatTime,
  formatTimeAndDate,
  formatYearToLastTwoDigits,
  getDateFormate, getFormattedDate, minutesToSeconds
};


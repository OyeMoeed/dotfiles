/**
 * Exports a collection of utils files for easy import.
 */
import {
  clearAsyncStorage,
  getValueFromAsyncStorage,
  removeValueFromAsyncStorage,
  setValueToAsyncStorage,
  StorageKeys,
} from './storage-helper.util';
import openPhoneNumber from './open-phone-number.util';
import copyText from './clip-board.util';
import getCustomSheetThreshold from './custom-sheet-helper.utils';
import dateTimeFormat from './date.const';
import FilterSelectedValue from './filter-interface.utils';
import toggleAppRating from './rate-app';
import customInvalidateQuery from './invalidate-queries';

export { default as shortString } from './string-functions.utils';
export { default as getBankIconByCode } from './bank-logo';
export { default as validateAmountInput } from './validate-amount-input';

export * from './date-helper.util';
export * from './enums.util';
export * from './string-helper';

export {
  clearAsyncStorage,
  getValueFromAsyncStorage,
  removeValueFromAsyncStorage,
  setValueToAsyncStorage,
  StorageKeys,
  openPhoneNumber,
  copyText,
  getCustomSheetThreshold,
  dateTimeFormat,
  FilterSelectedValue,
  toggleAppRating,
  customInvalidateQuery,
};

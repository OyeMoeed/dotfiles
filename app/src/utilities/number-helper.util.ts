/**
 * This fucntion is used to get comma seprated number.
 * It expexts a param which can be either number of string and it returns that value in string form.
 * @param {number | string} number
 * @returns {string}
 */
const commaSeparatedNumber = (number: number | string): string => {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '0';
};
const formatNumberWithCommas = (value: number | string): string => {
  if (value) {
    if (typeof value === 'string') {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return value.toLocaleString();
  }
  return '';
};

const removeCommas = (input: string): string => input.replace(/,/g, '');
const isMultipleOfHundred = (amount: number) => amount % 100 === 0;

export { commaSeparatedNumber, formatNumberWithCommas, isMultipleOfHundred, removeCommas };

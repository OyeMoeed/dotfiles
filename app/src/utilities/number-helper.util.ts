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

const removeCommas = (input: string): string => input.replace(/,/g, '');

export { commaSeparatedNumber, removeCommas };

const isNumber = (n: string) => /^-?\d{1,3}(,\d{3})*(\.\d+)?([eE][-+]?\d+)?$/.test(n);
const isUpperCase = (str: string) => str === str.toUpperCase();

export { isNumber, isUpperCase };

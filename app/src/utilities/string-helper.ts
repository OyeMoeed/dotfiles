const isNumber = (n: string) => /^-?[\d.]+(?:e-?\d+)?$/.test(n);
const isUpperCase = (str: string) => str === str.toUpperCase();

export { isNumber, isUpperCase };

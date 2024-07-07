const formatCurrencyValue = (value: string): string => {
    return parseFloat(value.replace(/,/g, '')).toLocaleString('en-US');
};
export {formatCurrencyValue}
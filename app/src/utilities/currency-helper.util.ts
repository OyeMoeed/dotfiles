const formatCurrencyValue = (value: string): string => parseFloat(value.replace(/,/g, '')).toLocaleString('en-US');

const formatAmount = (amount: string): string | number => {
  const floatAmount = parseFloat(amount);

  if (Number.isInteger(floatAmount)) {
    return Math.round(floatAmount);
  }
  return amount;
};
export { formatAmount, formatCurrencyValue };

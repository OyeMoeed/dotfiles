const validateAmountInput = (value: string | number, amountValue: string | number) => {
  // Split the value by the decimal point
  const [integerPart, decimalPart] = String(value).split('.');

  if (integerPart?.length > 5) {
    return amountValue;
  }

  if (decimalPart?.length > 2) {
    return amountValue;
  }

  // If both checks pass, return the new value
  return value;
};

export default validateAmountInput;

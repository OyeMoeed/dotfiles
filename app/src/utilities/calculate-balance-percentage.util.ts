const getBalancePercentage = (currentBalance, availableBalance) => {
  if (currentBalance === 0) {
    return 0;
  }
  const percentage = (availableBalance * 100) / currentBalance;
  return Math.ceil(percentage);
};

export default getBalancePercentage;

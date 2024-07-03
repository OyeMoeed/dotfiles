export const formatNumberWithCommas = (value: number | string): string => {
  if (typeof value === 'string') {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else return value.toLocaleString();
};

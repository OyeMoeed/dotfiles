import { TransactionHistoryFilter } from './enums.util';

/**
 * return calculated gutter for sheet according to platform
 */
const renderFilterInputImage = (
  filters: TransactionHistoryFilter[],
  type: string,
  getValues: (payload?: string | string[]) => Object,
) => {
  const filter = filters?.find((item) => item.type === type);
  const includingImageFilters = filter?.filterValues.filter((item) => item.image);

  if (includingImageFilters) {
    const selectedImageFilter = includingImageFilters?.find((item) => item?.value === getValues(type));
    if (selectedImageFilter) {
      return selectedImageFilter.image;
    }
  }
  return false;
};

export default renderFilterInputImage;

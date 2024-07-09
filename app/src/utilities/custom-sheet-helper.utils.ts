import { verticalScale } from 'react-native-size-matters';
import { isIosOS, isTablet } from './constants';

/**
 * return calculated gutter for sheet according to platform
 */
export const getCustomSheetThreshold = () => {
  if (isIosOS) {
    return verticalScale(120);
  }
  if (isTablet) {
    return verticalScale(90);
  }
  return verticalScale(75);
};

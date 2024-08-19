import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const getSelectedFilterListStyles = (colors: Colors) =>
  createStyleSheet({
    filterWrapper: {
      height: verticalScale(27),
      marginTop: moderateScale(24),
    },
    chipContainer: {
      marginLeft: moderateScale(10),
      backgroundColor: colors.secondary.secondary100,
    },
    chipHeading: {
      gap: moderateScale(10),
      color: colors.secondary.secondary500,
    },
  });
export default getSelectedFilterListStyles;

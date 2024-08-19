import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const allOrdersStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: moderateScale(22, 0.3),
      marginVertical: moderateScale(22),
    },
    filterWrapper: {
      height: verticalScale(20),
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

export default allOrdersStyles;

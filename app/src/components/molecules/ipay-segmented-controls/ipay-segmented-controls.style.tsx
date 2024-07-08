import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';
const tabStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    selectedTab: {
      backgroundColor: colors.primary.primary500,
      flex: 1,
      borderRadius: moderateScale(18),
    },
    unSelectedTab: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    selected: {
      color: colors.natural.natural0,
    },
    unselected: {
      color: colors.natural.natural500,
    },
    tabBaseStyles: {
      textAlign: 'center',
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(8),
    },
    scrollContainer: {
      flexDirection: 'row',
      borderColor: colors.primary.primary100,
      borderWidth: 1,
      borderRadius: moderateScale(12),
      alignItems: 'center',
    },
  });
export default tabStyles;

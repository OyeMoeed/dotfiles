import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const tabStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    selectedTab: {
      backgroundColor: colors.primary.primary500,
      borderRadius: moderateScale(10),
      height: '100%',
      width: '50%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    unSelectedTab: {
      backgroundColor: colors.backgrounds.transparent,
      height: '100%',
      width: '50%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selected: {
      color: colors.natural.natural0,
    },
    unselected: {
      color: colors.natural.natural500,
      alignSelf: 'center',
    },
    tabBaseStyles: {
      textAlign: 'center',
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(6),
      textTransform: 'none',
    },
    scrollContainer: {
      flexDirection: 'row',
      borderRadius: moderateScale(12),
      alignItems: 'center',
      padding: moderateScale(1),
      borderWidth: 1,
      borderColor: colors.primary.primary100,
    },
  });
export default tabStyles;

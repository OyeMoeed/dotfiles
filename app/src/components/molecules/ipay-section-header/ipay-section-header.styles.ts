import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const sectionHeaderStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: moderateScale(12),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      fontSize: moderateScale(13),
      marginRight: moderateScale(8),
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(6),
    },
    dotView: {
      width: moderateScale(5),
      height: moderateScale(5),
      borderRadius: moderateScale(4),
      backgroundColor: colors.primary.primary500,
      marginRight: moderateScale(8),
    },
  });

export default sectionHeaderStyles;

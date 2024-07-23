import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale } from 'react-native-size-matters';

const requestMoneyStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      marginBottom: moderateScale(22),
    },
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: moderateScale(8),
      marginBottom: moderateScale(24),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(10) },
    noResult: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    noResultContent: { gap: scaleSize(12) },
    requestButton: {
      backgroundColor: colors.primary.primary500,
      marginTop: scaleSize(12),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(10),
      borderRadius: scaleSize(16),
    },
    flatList: {
      flex: 0,
    },
    listContainer: {
      flex: 1,
      marginHorizontal: moderateScale(22),
    },
    listView: {
      marginBottom: moderateScale(8),
    },
  });

export default requestMoneyStyles;

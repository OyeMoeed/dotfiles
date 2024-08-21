import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const requestMoneyStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      marginBottom: moderateScale(22),
    },
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: scaleSize(8),
      marginBottom: moderateScale(24),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(10) },
    noResult: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    noResultContent: { gap: 12 },
    requestButton: {
      backgroundColor: colors.primary.primary500,
      marginVertical: verticalScale(12),
      justifyContent: 'center',
      paddingHorizontal: scaleSize(20),
      paddingVertical: verticalScale(10),
      height: scaleSize(50),
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

export default requestMoneyStyles;

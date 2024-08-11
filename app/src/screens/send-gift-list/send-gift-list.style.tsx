import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sendGiftStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: moderateScale(8),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(10) },
    noResult: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    filterWrapper: {
      height: verticalScale(27),
      marginTop: moderateScale(24),
      marginLeft: moderateScale(14),
    },
    chipContainer: {
      marginLeft: moderateScale(10),
      backgroundColor: colors.secondary.secondary100,
    },
    chipHeading: {
      gap: moderateScale(10),
      color: colors.secondary.secondary500,
    },
    sendButton: {
      backgroundColor: colors.primary.primary500,
      marginTop: scaleSize(20),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(10),
      borderRadius: scaleSize(16),
    },
    listView: {
      marginBottom: moderateScale(8),
    },
    flexStyle: {
      flex: 0,
    },
    view: {
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(16),
      flex: 1,
      justifyContent: 'space-between',
    },
    btnStyle: {
      marginBottom: moderateScale(24),
    },
  });

export default sendGiftStyles;

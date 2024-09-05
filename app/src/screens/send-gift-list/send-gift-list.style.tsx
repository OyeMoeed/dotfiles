import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const sendGiftStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: moderateScale(8),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: themeColors.natural.natural0, borderRadius: moderateScale(10) },
    noResult: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    filterWrapper: {
      height: verticalScale(27),
      marginTop: moderateScale(24),
      marginLeft: moderateScale(14),
    },
    chipContainer: {
      marginLeft: moderateScale(10),
      backgroundColor: themeColors.secondary.secondary100,
    },
    chipHeading: {
      gap: moderateScale(10),
      color: themeColors.secondary.secondary500,
    },
    sendButton: {
      backgroundColor: themeColors.primary.primary500,
      marginTop: moderateScale(20),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(10),
      borderRadius: moderateScale(16),
    },
    listView: {
      marginBottom: moderateScale(16),
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
      marginBottom: moderateScale(41),
      justifyContent: 'center',
    },
    titleWrapper: { width: scaleSize(150) },
  });

export default sendGiftStyles;

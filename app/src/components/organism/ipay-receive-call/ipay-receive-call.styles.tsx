import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const receiveCallStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      gap: verticalScale(16),
      alignItems: 'center',
      paddingTop: scaleSize(20),
    },

    listContainer: { backgroundColor: colors.primary.primary10 },
    childrenStyles: {
      marginBottom: moderateScale(16),
      marginHorizontal: moderateScale(16),
    },
    desStyle: {
      color: colors.primary.primary800,
      textAlign: 'center',
      marginBottom: moderateScale(8),
    },
    stepStyle: {
      color: colors.primary.primary800,
    },
    stepViewStyle: {
      backgroundColor: colors.primary.primary10,
      padding: moderateScale(8),
      width: moderateScale(35),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(11),
    },
    containerStyle: {
      borderRadius: moderateScale(28),
    },
    newCallStyles: {
      color: colors.natural.natural500,
    },
    expiredTimerStyle: {
      color: colors.error.error500,
      bottom: verticalScale(8),
    },
    timerStyle: {
      color: colors.natural.natural900,
      bottom: verticalScale(8),
    },
    refreshIcon: {
      height: moderateScale(22),
      width: moderateScale(22),
    },
    progressBar: {
      height: verticalScale(4),
    },
  });

export default receiveCallStyles;

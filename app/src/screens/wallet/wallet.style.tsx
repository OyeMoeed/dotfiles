import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';

import { moderateScale, verticalScale } from 'react-native-size-matters';

const walletStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    mainWrapper: {
      flex: 1,
    },
    toastContainerStyle: {
      backgroundColor: colors.secondary.secondary500,
      borderColor: colors.secondary.secondary500,
    },
    container: {
      paddingHorizontal: moderateScale(20),
    },
    progressBarContainer: {
      flexDirection: 'row',
    },
    rightTextStyle: {
      color: colors.primary.primary900,
      fontSize: scaleFont(11),
    },
    codeBarImageStyle: {
      width: 78,
      height: 78,
    },
    codeBarTextStyle: {
      fontSize: scaleFont(16),
      fontWeight: '400',
      color: colors.primary.primary500,
      marginRight: scaleFont(4),
    },
    buttonContainer: {
      minWidth: moderateScale(320),
      width: '100%',
      height: verticalScale(50),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: scaleFont(1),
      borderColor: colors.primary.primary500,
      borderRadius: scaleFont(16),
      marginTop: scaleFont(12),
    },
    limitContainer: {
      alignItems: 'center',
      marginTop: scaleFont(20),
    },
    progressContainer: {
      width: scaleSize(201),
      height: verticalScale(170),
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientBarStyle: {
      width: scaleSize(100),
      maxHeight: verticalScale(1),
      marginVertical: verticalScale(12),
    },
    limitTextStyle: {
      marginBottom: verticalScale(4),
    },
    arcStyle: {
      borderRadius: scaleFont(100),
    },
    toastContainer: {
      position: 'absolute',
      bottom: verticalScale(20),
      left: verticalScale(15),
      right: verticalScale(15),
    },
    amountStyle: {
      color: colors.primary.primary800,
    },
    listTextStyle: {
      color: colors.primary.primary900,
    },
    titleStyle: {
      color: colors.natural.natural500,
    },
  });

export default walletStyles;

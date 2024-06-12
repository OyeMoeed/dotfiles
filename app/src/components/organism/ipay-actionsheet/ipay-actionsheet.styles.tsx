import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const styles = (colors: any) =>
  createStyleSheet({
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.4,
      backgroundColor: colors.overlays.primaryBackDrop,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: moderateScale(16),
    },

    body: {
      flex: 1,
      alignSelf: 'flex-end',

      bottom: moderateScale(54),
    },
    body1: {
      backgroundColor: colors.overlays.primaryBackDrop,
      borderRadius: moderateScale(34),
      padding: moderateScale(16),
    },
    cancelBody: {
      height: moderateScale(48),
    },
    titleBox: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    rightSvg: {
      alignItems: 'center',
      justifyContent: 'center',
      height: moderateScale(48),
    },
    titleText: {
      color: colors.primary.primary900,
    },
    messageBox: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageText: {
      color: colors.primary.primary900,
      textAlign: 'center',
    },
    messageFrame: {
      paddingVertical: moderateScale(8),
      paddingHorizontal: moderateScale(12),
      gap: moderateScale(2),
    },
    buttonBox: {
      height: moderateScale(48),
      borderRadius: moderateScale(12),
      marginTop: moderateScale(8),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.natural.natural0,
    },
    buttonText: {
      color: colors.primary.primary500,
    },
    destructive: {
      color: colors.redPalette.red500,
    },
    cancelButtonBox: {
      height: moderateScale(48),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(12),
      backgroundColor: colors.grey.grey100,
      borderRadius: moderateScale(16),
    },
  });

export default styles;

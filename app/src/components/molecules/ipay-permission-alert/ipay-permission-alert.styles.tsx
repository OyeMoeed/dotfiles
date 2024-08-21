import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const alertStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    rowStyles: {
      flexDirection: 'row',
      borderTopWidth: 0.5,
      borderColor: colors.natural.natural300,
    },
    textColor: { color: colors.critical.critical850, textAlign: 'center' },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBox: {
      width: '65%',
      paddingTop: verticalScale(20),
      backgroundColor: colors.natural.natural250,
      borderRadius: moderateScale(10),
      alignItems: 'center',
    },
    title: {
      marginBottom: verticalScale(8),
    },
    message: {
      marginBottom: verticalScale(15),
      textAlign: 'center',
      paddingHorizontal: moderateScale(20),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelBtn: {
      width: '50%',
      borderRightWidth: 0.5,
      borderColor: colors.natural.natural300,
      alignItems: 'center',
      padding: verticalScale(8),
    },
    settignsBtn: { width: '50%', padding: verticalScale(8) },
  });
export default alertStyles;

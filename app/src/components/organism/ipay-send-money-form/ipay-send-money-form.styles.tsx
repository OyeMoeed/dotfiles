import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_15, FONT_SIZE_16, FONT_SIZE_20 } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const sendMoneyFormStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    gradientView: {
      marginTop: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      paddingBottom: moderateScale(24),
      paddingHorizontal: moderateScale(24),
      justifyContent: 'space-between',
      gap: moderateScale(8),
      borderRadius: moderateScale(28),
    },
    formHeader: {
      flexDirection: 'row',
    },
    titleText: {
      color: themeColors.primary.primary600,
    },
    subtitleText: {
      color: themeColors.natural.natural900,
    },
    inputText: {
      fontSize: FONT_SIZE_20,
      lineHeight: moderateScale(20),
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateScale(1),
      borderColor: themeColors.primary.primary100,
      borderRadius: moderateScale(20),
      paddingTop: moderateScale(12),
    },
    currencyStyle: {
      fontSize: FONT_SIZE_16,
      marginHorizontal: moderateScale(3),
    },
    inputField: {
      backgroundColor: themeColors.natural.natural0,
      paddingRight: moderateScale(50),
    },
    btnText: {
      color: colors.primary.primary500,
    },
    chipContainer: {
      backgroundColor: colors.secondary.secondary100,
      marginTop: moderateScale(12),
      alignSelf: 'center',
      borderRadius: moderateScale(12),
    },
    chipText: {
      color: colors.secondary.secondary800,
      fontSize: FONT_SIZE_15,
    },
    container: {
      flex: 1,
    },
    alinmaLogo: {
      wdith: moderateScale(18),
      height: moderateScale(18),
      magrinLeft: moderateScale(50),
    },
    alinmaContainer: {
      marginLeft: moderateScale(30),
    },
    headerContainer: {
      paddingHorizontal: moderateScale(0),
    },
  });

export default sendMoneyFormStyles;

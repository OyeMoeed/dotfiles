import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import {
  FONT_SIZE_12,
  FONT_SIZE_15,
  FONT_SIZE_17,
  FONT_SIZE_20,
  FONT_WEIGHT_BOLD,
} from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const IPaySendMoneyFormStyles = (themeColors: typeof colors) =>
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
      fontSize: FONT_SIZE_12,
      color: themeColors.primary.primary600,
    },
    subtitleText: {
      fontSize: FONT_SIZE_15,
      color: themeColors.natural.natural900,
    },
    inputText: {
      fontSize: FONT_SIZE_20,
      fontWeight: FONT_WEIGHT_BOLD,
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
      fontSize: FONT_SIZE_17,
      marginHorizontal: moderateScale(3),
      lineheight: moderateScale(22),
    },
    inputField: {
      backgroundColor: themeColors.natural.natural0,
      paddingRight: moderateScale(50),
    },
    btnText: {
      fontSize: FONT_SIZE_15,
      color: colors.primary.primary500,
    },
    chipContainer: {
      backgroundColor: colors.secondary.secondary100,
      marginTop: moderateScale(12),
      alignSelf: 'center',
    },
    chipText: {
      color: colors.secondary.secondary800,
    },
    container: {
      marginHorizontal: moderateScale(16),
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

export default IPaySendMoneyFormStyles;

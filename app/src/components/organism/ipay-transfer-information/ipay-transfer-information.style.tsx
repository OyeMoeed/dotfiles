import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_16, FONT_SIZE_20 } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const transferInfoStyles = (themeColors: typeof colors) =>
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
      lineHeight: moderateScale(22),
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateScale(1),
      borderColor: themeColors.primary.primary100,
      borderRadius: moderateScale(22),
      paddingTop: moderateScale(12),
    },
    currencyStyle: {
      fontSize: FONT_SIZE_16,
      marginHorizontal: moderateScale(3),
    },
    reasonsView: {
      marginVertical: moderateScale(8),
    },
    inputField: {
      backgroundColor: themeColors.natural.natural0,
      borderColor: themeColors.primary.primary100,
      borderRadius: moderateScale(22),
      paddingRight: moderateScale(45),
    },
    btnText: {
      color: themeColors.primary.primary500,
    },
    chipContainer: {
      alignSelf: 'center',
      marginBottom: moderateScale(12),
    },
    amountInput: {
      ...Platform.select({
        android: {
          marginVertical: moderateScale(8),
        },
        ios: {
          marginVertical: 0,
        },
      }),
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
    headingView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(24),
      marginBottom: moderateScale(8),
    },
    bankDetailsView: {
      marginStart: moderateScale(16, 0.3),
    },
    bankTitleView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    letterCount: {
      textAlign: 'right',
      color: colors.natural.natural500,
    },
    bankLogo: {
      width: moderateScale(24),
      height: moderateScale(24),
    },
    btn: {
      marginTop: moderateScale(16),
    },
  });

export default transferInfoStyles;

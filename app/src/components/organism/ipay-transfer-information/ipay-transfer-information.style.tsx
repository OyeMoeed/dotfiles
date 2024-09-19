import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_16, FONT_SIZE_20 } from '@app/styles/typography.styles';
import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const transferInfoStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    chipContainerNotWallet: {
      marginTop: moderateScale(24),
    },
    chipColors: {
      alignSelf: 'stretch',
      backgroundColor: themeColors.secondary.secondary100,
      color: themeColors.secondary.secondary500,
    },
    gradientView: {
      marginTop: moderateScale(12),
      backgroundColor: themeColors.natural.natural0,
      paddingBottom: moderateScale(24),
      paddingHorizontal: moderateScale(24),
      justifyContent: 'space-between',
      gap: moderateScale(8),
      borderRadius: moderateScale(28),
    },
    text: {
      marginBottom: moderateScale(8),
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
      lineHeight: moderateScale(30),
      minWidth: moderateScale(45),
      textAlign: 'right',
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateScale(1),
      borderColor: themeColors.primary.primary100,
      borderRadius: moderateScale(22),
      paddingTop: moderateScale(12),
    },
    focusedContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateScale(1),
      borderColor: themeColors.primary.primary500,
      borderRadius: moderateScale(22),
      paddingTop: moderateScale(12),
    },

    currencyStyle: {
      fontSize: FONT_SIZE_16,
      ...Platform.select({
        android: {
          marginTop: moderateScale(5),
        },
        ios: {
          marginVertical: 0,
        },
      }),
      lineHeight: moderateScale(30),
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
    focusedField: {
      backgroundColor: themeColors.natural.natural0,
      borderColor: themeColors.primary.primary500,
      borderRadius: moderateScale(22),
      paddingRight: moderateScale(45),
    },

    btnText: {
      color: themeColors.primary.primary500,
    },
    chipContainer: {
      marginBottom: moderateScale(10),
      marginTop: moderateScale(-2),
      alignSelf: 'center',
    },
    amountInput: {
      paddingBottom: moderateScale(8),
      ...Platform.select({
        android: {
          marginTop: moderateScale(-10),
          marginBottom: moderateScale(-10),
        },
        ios: {
          marginTop: moderateScale(-5),
          marginBottom: moderateScale(-1),
        },
      }),
    },
    alinmaLogo: {
      wdith: moderateScale(18),
      height: moderateScale(18),
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
      marginTop: moderateScale(10),
    },
  });

export default transferInfoStyles;

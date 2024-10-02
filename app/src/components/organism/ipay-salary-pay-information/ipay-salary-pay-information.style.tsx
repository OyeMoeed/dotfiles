import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_16, FONT_SIZE_20 } from '@app/styles/typography.styles';
import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const salaryPayInformation = (themeColors: typeof colors) =>
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
    text: {
      marginBottom: moderateScale(8),
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
    deductInputContainer: {
      justifyContent: 'center',
      paddingHorizontal: moderateScale(20),
    },
    deductAmountInput: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateScale(1),
      borderColor: themeColors.primary.primary100,
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
    deductChipContainer: {
      marginVertical: moderateScale(8),
    },
    payExtraChipContainer: {
      padding: 14,
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
    headerContainer: {
      paddingHorizontal: moderateScale(0),
    },
    width50: { width: '49%' },
    width100: { width: '100%' },
    datePickerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    titleStyle: {
      color: themeColors.natural.natural700,
    },
    listTextStyle: {
      color: themeColors.natural.natural700,
    },
  });

export default salaryPayInformation;

import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_16, FONT_SIZE_20 } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const priceCalculatorStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    textStyles: {
      textAlign: 'center',
    },
    innerContainer: {
      flex: 1,
      padding: moderateScale(12),
      gap: moderateScale(8),
      marginTop: moderateScale(8),
    },
    itemDetails: {
      gap: moderateScale(8),
    },
    rowStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(5),
    },
    logoStyles: {
      width: moderateScale(20),
      height: moderateScale(20),
      resizeMode: 'contain',
    },
    cardStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.natural.natural0,
      marginHorizontal: moderateScale(10),
      marginVertical: moderateScale(5),
      borderRadius: moderateScale(16),
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18),
    },
    textColor: {
      color: theme.natural.natural900,
    },
    inputContainerStyle: {
      width: '100%',
      paddingLeft: moderateScale(20),
      paddingRight: moderateScale(40),
      backgroundColor: theme.natural.natural0,
      borderColor: theme.primary.primary100,
    },
    chipColor: {
      paddingHorizontal: moderateScale(2),
      backgroundColor: theme.natural.natural100,
    },
    inputContainer: {
      padding: moderateScale(12),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: moderateScale(1),
      borderColor: theme.primary.primary100,
      borderRadius: moderateScale(20),
    },
    lightTextColor: {
      color: theme.natural.natural700,
    },
    gradientView: {
      backgroundColor: theme.natural.natural0,
      paddingVertical: moderateScale(24),
      paddingHorizontal: moderateScale(24),
      justifyContent: 'space-between',
      gap: moderateScale(8),
      borderRadius: moderateScale(28),
      marginHorizontal: moderateScale(12),
    },
    pressableStyles: {
      flexDirection: 'row',
      gap: moderateScale(6),
    },
    inputText: {
      fontSize: FONT_SIZE_20,
      lineHeight: moderateScale(20),
    },
    amountInput: {
      marginVertical: 0,
    },
    buttonStyles: { margin: moderateScale(12) },
    currencyStyle: {
      fontSize: FONT_SIZE_16,
      marginHorizontal: moderateScale(3),
    },
  });

export default priceCalculatorStyles;

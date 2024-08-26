import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ipayBillActivationStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: moderateScale(48),
      backgroundColor: themeColors.natural.natural50,
      marginVertical: moderateScale(16),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(24),
    },
    minFlex: {
      flex: 0,
    },
    conatinerStyles: {
      borderRadius: moderateScale(22),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(15),
      backgroundColor: themeColors.natural.natural0,
    },
    optionsStyle: { backgroundColor: themeColors.primary.primary10 },
    billContainer: {
      paddingHorizontal: 0,
      backgroundColor: themeColors.natural.natural0,
      paddingBottom: moderateScale(0),
    },
    btnStyle: {
      justifyContent: 'center',
      height: moderateScale(50),
    },
    headingStyle: {
      textAlign: 'center',
      width: scaleSize(220),
      marginBottom: verticalScale(12),
    },
    footerView: {
      marginTop: verticalScale(12),
    },
  });

export default ipayBillActivationStyles;

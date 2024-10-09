import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const addBeneficiaryStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    cardStyle: {
      backgroundColor: themeColors.natural.natural0,
      marginHorizontal: moderateScale(10),
      marginVertical: verticalScale(5),
      borderRadius: moderateScale(16),
      paddingVertical: verticalScale(12),
      paddingHorizontal: moderateScale(18),
      gap: moderateScale(12),
    },
    rowStylesOuter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(5),
    },
    logoStyles: {
      width: moderateScale(20),
      height: verticalScale(20),
      resizeMode: 'contain',
      marginRight: moderateScale(8),
    },
    textColor: {
      color: themeColors.natural.natural900,
    },
    btnStyles: {
      marginHorizontal: moderateScale(10),
      marginVertical: verticalScale(5),
      marginTop: verticalScale(20),
    },
    textStyle: {
      marginHorizontal: moderateScale(10),
      marginVertical: verticalScale(5),
      marginTop: verticalScale(20),
    },
    outerContainer: {
      marginHorizontal: moderateScale(10),
    },
    flagStyle: {
      width: scaleSize(22),
      height: verticalScale(22),
    },
  });

export default addBeneficiaryStyles;

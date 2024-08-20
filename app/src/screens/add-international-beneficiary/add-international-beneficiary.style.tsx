import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const addBeneficiaryStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    cardStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors.natural.natural0,
      marginHorizontal: moderateScale(10),
      marginVertical: verticalScale(5),
      borderRadius: moderateScale(16),
      paddingVertical: verticalScale(12),
      paddingHorizontal: moderateScale(18),
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
  });

export default addBeneficiaryStyles;

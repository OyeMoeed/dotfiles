import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (theme: any) =>
  createStyleSheet({
    btnLarge: {
      borderWidth: moderateScale(1),
      justifyContent: 'center',
      paddingHorizontal: moderateScale(24, 0.3),
      height: verticalScale(50),
      paddingVertical: verticalScale(14),
      borderRadius: moderateScale(20),
    },
    btnMedium: {
      paddingHorizontal: moderateScale(14, 0.3),
      alignItems: 'center',
      justifyContent: 'center',
      height: verticalScale(34),
      borderRadius: moderateScale(14),
      borderWidth: moderateScale(1),
    },
    btnSmall: {
      paddingHorizontal: moderateScale(6, 0.3),
      paddingVertical: verticalScale(4),
      justifyContent: 'center',
      height: verticalScale(28),
      borderRadius: moderateScale(8),
      borderWidth: moderateScale(1),
    },
    childContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnTextView: {
      marginHorizontal: moderateScale(6, 0.3),
    },
  });

export default genratedStyles;

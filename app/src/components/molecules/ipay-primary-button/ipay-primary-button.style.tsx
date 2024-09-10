import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (theme: any) =>
  createStyleSheet({
    btnLarge: {
      paddingHorizontal: moderateScale(24, 0.3),
      height: verticalScale(50),
      paddingVertical: verticalScale(14),
      justifyContent: 'center',
      borderRadius: moderateScale(20),
    },
    btnMedium: {
      paddingHorizontal: moderateScale(14, 0.3),
      paddingVertical: verticalScale(7),
      justifyContent: 'center',
      height: verticalScale(34),
      borderRadius: moderateScale(14),
    },
    btnSmall: {
      paddingHorizontal: moderateScale(6, 0.3),
      paddingVertical: verticalScale(4),
      height: verticalScale(28),
      justifyContent: 'center',
      borderRadius: moderateScale(8),
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

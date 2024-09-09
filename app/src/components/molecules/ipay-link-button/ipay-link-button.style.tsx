import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (theme: any) =>
  createStyleSheet({
    btnLarge: {
      paddingHorizontal: moderateScale(24, 0.3),
      justifyContent: 'center',
      height: verticalScale(50),
      paddingVertical: verticalScale(14),
    },
    btnMedium: {
      paddingHorizontal: moderateScale(14, 0.3),
      justifyContent: 'center',
      paddingVertical: verticalScale(7),
      height: verticalScale(34),
    },
    btnSmall: {
      paddingHorizontal: moderateScale(6, 0.3),
      paddingVertical: verticalScale(4),
      justifyContent: 'center',
      height: verticalScale(28),
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

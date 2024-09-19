import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardDetailStyles = () =>
  createStyleSheet({
    container: {
      gap: verticalScale(6),
      marginTop: moderateScale(30),
      paddingHorizontal: moderateScale(24),
      marginBottom: moderateScale(10),
    },
  });

export default cardDetailStyles;

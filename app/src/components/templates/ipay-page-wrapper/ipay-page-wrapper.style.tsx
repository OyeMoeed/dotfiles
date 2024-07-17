import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const pageWrapperStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(24, 0.3),
      paddingBottom: moderateScale(12),
    },
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
      alignSelf: 'center',
    },
  });

export default pageWrapperStyles;

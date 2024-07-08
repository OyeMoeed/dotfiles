import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardOptionsStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    listTitleText: {
      color: colors.natural.natural500,
      marginTop: verticalScale(28),
      marginBottom: verticalScale(8),
    },
    scrollView: {
      marginHorizontal: moderateScale(24, 0.3),
    },
    deleteButtonStyle: {
      marginTop: verticalScale(28),
    },
  });

export default cardOptionsStyles;

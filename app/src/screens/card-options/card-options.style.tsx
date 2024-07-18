import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardOptionsStyles = (colors: any) =>
  createStyleSheet({
    bottomMarginStyles: {
      marginBottom: verticalScale(15),
    },
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
    toastContainerStyle: {
      bottom: verticalScale(20),
    },
    changeTextContainer: {
      flexDirection: 'row',
      gap: moderateScale(4),
    },
  });

export default cardOptionsStyles;

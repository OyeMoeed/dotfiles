import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const genratedStyles = (colors: any) =>
  createStyleSheet({

    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
    },
    container: {
      flex: 1,
    }

  })

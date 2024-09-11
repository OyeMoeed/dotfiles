import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const generatedStyles = () =>
  createStyleSheet({
    logoStyles: {
      width: verticalScale(84),
      height: verticalScale(28),
    },
    container: {
      flex: 1,
    },
  });

export default generatedStyles;

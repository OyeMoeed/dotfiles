import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = () =>
  createStyleSheet({
    topTitle: {
      marginTop: verticalScale(24),
      marginBottom: verticalScale(4),
    },
    descriprtionText: {
      marginTop: verticalScale(4),
      marginBottom: verticalScale(24),
    },
    alignTextCenter: {
      textAlign: 'center',
    },
    bodyContainer: {
      paddingHorizontal: scale(24),
      width: '100%',
    },
  });

export default styles;

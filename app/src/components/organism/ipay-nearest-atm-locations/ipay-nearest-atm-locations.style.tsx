import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const mapViewStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      borderTopEndRadius: moderateScale(20),
      borderTopStartRadius: moderateScale(20),
      overflow: 'hidden',
    },
    mapView: {
      flex: 1,
    },
    marker: {
      width: moderateScale(30),
      height: moderateScale(30),
    },
  });

export default mapViewStyles;

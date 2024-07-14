import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const qrCodeScannerComponentStyles = () =>
  createStyleSheet({
    fill: {
      flex: 1,
    },
    fullHeightWidth: {
      height: '100%',
      width: '100%',
    },
    loaderContainer: {
      alginItems: 'center',
      justifyContent: 'center',
    },
    scannerMarkerContainer: {
      height: moderateScale(250),
      width: moderateScale(250),
      alginItems: 'center',
    },
    cameraContainerStyles: {
      marginTop: verticalScale(32),
      borderTopRightRadius: moderateScale(50),
      borderTopLeftRadius: moderateScale(50),
      overflow: 'hidden',
    },
    markerAnimatedBar: {
      width: moderateScale(196),
      height: moderateScale(13),
      backgroundColor: 'white',
      position: 'absolute',
      alignSelf: 'center',
      borderRadius: 30,
      marginTop: '75%',
    },
  });

export default qrCodeScannerComponentStyles;

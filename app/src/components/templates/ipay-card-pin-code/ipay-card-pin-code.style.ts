import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const cardPinCodeStyle = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: scaleFont(12),
    },
    securityIconWrapper: {
      marginTop: scaleFont(20),
      alignItems: 'center',
    },
    securityIcon: {
      height: verticalScale(40),
      width: scaleSize(40),
    },
    headingView: {
      alignItems: 'center',
      marginTop: scaleFont(15),
      marginBottom: scaleFont(40),
    },
    toast: {
      marginBottom: scaleFont(60),
    },
  });

export default cardPinCodeStyle;

import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const cardPinCodeStyle = () =>
  createStyleSheet({
    container: {
      flex: 1,
      marginTop: scaleFont(12),
    },
    securityIcon: {
      marginTop: scaleFont(20),
      alignItems: 'center',
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

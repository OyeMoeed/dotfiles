import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const IPayServiceErrorToastStyles = () =>
  createStyleSheet({
    toast: {
      alignSelf: 'center',
      bottom: scaleSize(20),
      left: scaleSize(15),
      right: scaleSize(20),
      zIndex: 200000,
    },
    messageStyle: {
      textAlign: 'left',
    },
  });

export default IPayServiceErrorToastStyles;

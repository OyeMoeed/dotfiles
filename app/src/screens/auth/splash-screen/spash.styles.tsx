import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const splashStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: scaleSize(150),
      height: scaleSize(150),
    },
  });

export default splashStyles;

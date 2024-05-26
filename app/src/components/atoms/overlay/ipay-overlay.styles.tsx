import createStyleSheet from '@app/styles/scaled-sheet.styles';

import { useTheme } from '@app/styles/hooks/theme.hook';
interface Colors {
  backgrounds: {
    backdrop: string;
  };
}

const overlayStyles = (colors:Colors) =>
  createStyleSheet({
    overlay: {
      zindex: 2000,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.backgrounds.backdrop,
    },
  });

export default overlayStyles;

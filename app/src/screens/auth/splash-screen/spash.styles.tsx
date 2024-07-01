import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
export const splashStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: colors.lightColorPalette.white,
    },
    logo: {
      width: scaleSize(150),
      height: scaleSize(150),
    },
  });

import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_2 } from '@app/styles/spacing.const';

export const spinnerStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginLeft: SCALE_2,
      color: colors.darkColorPalette.black,
      fontSize: scaleFont(4),
    },
  });

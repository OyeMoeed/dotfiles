import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_5 } from '@app/styles/spacing.const';

export const alertStyles = (colors: any) =>
  createStyleSheet({
    container: {
      height: 5,
      backgroundColor: colors.natural.natural200,
      borderRadius: SCALE_5,
      overflow: 'hidden',
      width: '70%',
    },
    progress: {
      height: '100%',
      borderRadius: SCALE_5,
    },
  });

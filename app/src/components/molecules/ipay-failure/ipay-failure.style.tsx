import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';

const ipayFailerStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    failedVariant: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    failedText: {
      marginVertical: scaleSize(8),
      color: colors.error.error500,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    failedSubtitle: {
      alignItems: 'center',
      textAlign: 'center',
      color: colors.primary.primary800,
    },
  });

export default ipayFailerStyles;

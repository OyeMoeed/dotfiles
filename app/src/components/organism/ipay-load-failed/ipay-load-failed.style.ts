import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_15, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';

const loadFailedStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: scaleSize(12) },
    messageText: { fontWeight: FONT_WEIGHT_BOLD, fontSize: FONT_SIZE_15, marginTop: scaleSize(12) },
    refresh: {
      backgroundColor: colors.primary.primary500,
      marginTop: scaleSize(6),
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(8),
      borderRadius: scaleSize(16),
    },
  });

export default loadFailedStyles;

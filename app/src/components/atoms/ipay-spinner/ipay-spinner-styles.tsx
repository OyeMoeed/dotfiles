import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_2 } from '@app/styles/spacing.const';

const spinnerStyles = (themeColors: typeof colors, hasBackgroundColor: boolean) =>
  createStyleSheet({
    container: {
      flex: 1,
      backgroundColor: hasBackgroundColor ? themeColors.backgrounds.backdrop : themeColors.backgrounds.transparent,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 2001,
    },
    text: {
      marginLeft: SCALE_2,
      color: themeColors.natural.natural1000,
      fontSize: scaleFont(4),
    },
  });

export default spinnerStyles;

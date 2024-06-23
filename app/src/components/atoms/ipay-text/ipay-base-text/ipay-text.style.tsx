import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_15 } from '@app/styles/spacing.const';

const styles = (_getFontFamily: string) =>
  createStyleSheet({
    textStyle: {
      // fontFamily: _getFontFamily,
    },
    primary: {
      //   color: colors.natural.natural900,
      fontSize: SCALE_15,
    },
    natural: {
      //   color: colors.natural.natural500,
      fontSize: SCALE_15,
    },
  });

export default styles;

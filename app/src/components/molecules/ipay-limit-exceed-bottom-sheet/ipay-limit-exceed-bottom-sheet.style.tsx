import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';

const limitExceedStyle = () =>
  createStyleSheet({
    container: {
      paddingHorizontal: scaleSize(0),
      justifyContent: 'center',
      gap: scaleSize(30),
      width: '85%',
    },
    detail: { alignItems: 'center', justifyContent: 'center', gap: scaleSize(8) },
    description: {
      textAlign: 'center',
    },
    actionButtons: {
      gap: scaleSize(8),
    },
    fontBold: { fontWeight: FONT_WEIGHT_BOLD },
  });

export default limitExceedStyle;

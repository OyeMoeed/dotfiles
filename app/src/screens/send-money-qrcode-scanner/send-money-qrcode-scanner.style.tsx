import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { typography } from '@app/styles/typography.styles';

const qrCodeScannerStyles = () =>
  createStyleSheet({
    fill: {
      flex: 1,
    },
    headerTitle: {
      fontSize: typography.FONT_SIZE_15,
      fontWeight: '700',
    },
  });

export default qrCodeScannerStyles;

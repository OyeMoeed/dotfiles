import createStyleSheet from '@app/styles/scaled-sheet.styles';

const qrCodeScannerStyles = () =>
  createStyleSheet({
    fill: {
      flex: 1,
    },
    headerTitle: {
      textTransform: 'normal',
    },
  });

export default qrCodeScannerStyles;

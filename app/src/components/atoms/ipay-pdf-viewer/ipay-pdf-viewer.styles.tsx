import createStyleSheet from '@app/styles/scaled-sheet.styles';

const pdfViewerStyles = () =>
  createStyleSheet({
    container: {
      width: '100%',
      height: '100%',
    },
  });

export default pdfViewerStyles;

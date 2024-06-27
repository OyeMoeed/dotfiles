import createStyleSheet from '@app/styles/scaled-sheet.styles';

const webViewStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default webViewStyles;

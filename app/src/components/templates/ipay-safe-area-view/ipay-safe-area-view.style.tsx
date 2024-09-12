import createStyleSheet from '@app/styles/scaled-sheet.styles';

const safeAreaViewStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
  });

export default safeAreaViewStyles;

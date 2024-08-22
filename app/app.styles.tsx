import createStyleSheet from '@app/styles/scaled-sheet.styles';

const appStyles = () =>
  createStyleSheet({
    rootView: { flexGrow: 1 },
    kavStyle: { flex: 1 },
  });
export default appStyles;

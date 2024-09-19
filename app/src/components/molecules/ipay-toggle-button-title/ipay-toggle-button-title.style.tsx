import createStyleSheet from '@app/styles/scaled-sheet.styles';

const toggleTitleStyles = () =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default toggleTitleStyles;

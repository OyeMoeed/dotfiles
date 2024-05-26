import createStyleSheet from '@app/styles/scaled-sheet.styles';

const swithToggleStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  });

export default swithToggleStyles;

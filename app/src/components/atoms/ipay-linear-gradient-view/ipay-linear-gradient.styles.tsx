import createStyleSheet from '@app/styles/scaled-sheet.styles';

const linearGradientStyles = (colors: any) =>
  createStyleSheet({
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default linearGradientStyles;

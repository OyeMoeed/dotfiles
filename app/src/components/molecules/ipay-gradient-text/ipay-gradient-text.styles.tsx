import createStyleSheet from '@app/styles/scaled-sheet.styles';

const gradientStyles = () =>
  createStyleSheet({
    text: {
      textAlign: 'center',
    },
    opacity0: { opacity: 0 },
  });

export default gradientStyles;

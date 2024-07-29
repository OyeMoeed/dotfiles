import createStyleSheet from '@app/styles/scaled-sheet.styles';

const flipCardStyles = () =>
  createStyleSheet({
    container: {},
    flipCard: {
      backfaceVisibility: 'hidden',
    },
    flipCardBack: {
      position: 'absolute',
      top: 0,
    },
    flipText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default flipCardStyles;

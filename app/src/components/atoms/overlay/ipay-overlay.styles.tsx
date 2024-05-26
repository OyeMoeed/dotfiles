import createStyleSheet from '@app/styles/scaled-sheet.styles';

const overlayStyles = (colors: any) =>
  createStyleSheet({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.backgrounds.backdrop,
    },
  });

export default overlayStyles;

import createStyleSheet from '@app/styles/scaled-sheet.styles';

const styles = (_getFontFamily: string) =>
  createStyleSheet({
    textStyle: {
      fontFamily: _getFontFamily
    }
  });

export default styles;

import createStyleSheet from '@app/styles/scaled-sheet.styles';

const styles = createStyleSheet({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default styles;

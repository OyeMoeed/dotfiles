import createStyleSheet from '@app/styles/scaled-sheet.styles';

export const styles = createStyleSheet({
  container: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    width: '70%',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
});

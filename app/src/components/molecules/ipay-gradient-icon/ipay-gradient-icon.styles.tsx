import createStyleSheet from '@app/styles/scaled-sheet.styles';

const gradientIconStyle = (scaledSize: number) =>
  createStyleSheet({
    container: { width: scaledSize, height: scaledSize, overflow: 'visible' },
    maskElement: { width: scaledSize, height: scaledSize, justifyContent: 'center', alignItems: 'center' },
    maskview: { flex: 1 },
  });

export default gradientIconStyle;

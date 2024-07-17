import createStyleSheet from '@app/styles/scaled-sheet.styles';

const circularProgressbarStyles = (padding: number, size: number, sizePadding: number) =>
  createStyleSheet({
    childrenStyle: {
      position: 'absolute',
      top: padding,
      left: padding,
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circularView: {
      width: sizePadding,
      height: sizePadding,
    },
  });

export default circularProgressbarStyles;

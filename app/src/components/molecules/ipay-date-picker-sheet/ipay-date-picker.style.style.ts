import { Colors } from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const styles = (colors: Colors) =>
  createStyleSheet({
    inputStyle: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary100,
    },
    sheetContainerStyle: {
      flex: undefined,
      alignItems: undefined,
      minHeight: 10,
    },
  });

export default styles;

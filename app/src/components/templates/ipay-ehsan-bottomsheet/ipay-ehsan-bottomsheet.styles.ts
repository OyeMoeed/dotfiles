import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const ehsanBottomSheetStyles = () =>
  createStyleSheet({
    itemContainer: {
      alignItems: 'center',
    },
    itemContent: {
      padding: 24,
    },
    itemText: {},
    iconContainer: {
      padding: 24,
      gap: 10,
      backgroundColor: colors.natural.natural0,
      borderRadius: 24,
      height: 132,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
  });

export default ehsanBottomSheetStyles;

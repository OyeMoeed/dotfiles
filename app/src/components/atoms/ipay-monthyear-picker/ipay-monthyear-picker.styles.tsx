import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const datePickerStyles = (themeColor: typeof colors) =>
  createStyleSheet({
    pickerContainer: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
    picker: {
      width: 150,
      backgroundColor: 'transparent',
      height: 200,
      fontWeight: 'bold'
    }
  });

export default datePickerStyles;

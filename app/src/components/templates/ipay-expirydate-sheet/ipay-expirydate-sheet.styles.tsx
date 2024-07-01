import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
const IPayExpiryDateStyles = (themeColor: typeof colors) =>
  createStyleSheet({
    headerText: {
      marginBottom: scaleSize(12),
      color: themeColor.primary.primary900
    },
    subTitleText: {
      color: themeColor.natural.natural900
    },
    sheetContainer: {
      flex: 1,
      marginBottom: scaleSize(30),
      width: '100%'
    },
    innerContainer: {
      marginTop: scaleSize(30),
      padding: scaleSize(20)
    },
    buttonStyles: { width: '100%' }
  });
export default IPayExpiryDateStyles;

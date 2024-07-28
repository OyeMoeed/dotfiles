import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const addSadadBillStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    contentContainer: {
      paddingHorizontal: scaleFont(24),
      marginTop: scaleFont(24),
      gap: scaleFont(16),
    },
    sheetContainer: {
      paddingHorizontal: scaleFont(20),
      maxHeight: verticalScale(90),
    },
    searchInputStyle: {
      height: verticalScale(36),
      marginTop: scaleFont(10),
      borderRadius: scaleFont(12),
      backgroundColor: themeColors.natural.natural0,
    },
    inputStyle: {
      height: verticalScale(36),
    },
    listImg: {
      height: verticalScale(24),
      width: scaleSize(24),
    },
    headerText: {
      textTransform: 'none',
    },
  });

export default addSadadBillStyles;

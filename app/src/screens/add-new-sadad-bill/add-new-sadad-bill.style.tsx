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
      paddingBottom: scaleFont(16),
    },
    searchInputStyle: {
      height: verticalScale(36),
      borderRadius: scaleFont(12),
      minWidth: '100%',
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
    invoiceSheetContentWrapper: {
      gap: scaleFont(16),
      alignItems: 'center',
      paddingHorizontal: scaleFont(24),
      marginTop: scaleFont(12),
    },
    textWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: scaleFont(8),
    },
    darkColor: {
      color: themeColors.primary.primary900,
    },
    messageText: {
      color: themeColors.primary.primary800,
      textAlign: 'center',
    },
    tryAgainBtn: {
      minWidth: '100%',
      marginTop: scaleFont(16),
      height: verticalScale(50),
      justifyContent: 'center',
    },
  });

export default addSadadBillStyles;

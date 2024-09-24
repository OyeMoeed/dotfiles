import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const newsadadBillStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingVertical: scaleFont(20),
      paddingHorizontal: scaleFont(20),
    },
    darkStyle: {
      color: themeColors.primary.primary900,
    },
    remainingText: {
      color: themeColors.natural.natural700,
    },
    currencyTextStyle: {
      color: themeColors.natural.natural1000,
    },
    sadadDetailStyle: {
      marginBottom: scaleFont(16),
    },
    footerBtn: {
      justifyContent: 'center',
    },
    payBtn: {
      marginBottom: verticalScale(12),
    },
  });

export default newsadadBillStyles;

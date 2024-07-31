import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scale } from 'react-native-size-matters';

const billBalanceStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      justifyContent: 'space-between',
      height: '93%',
      paddingBottom: scale(70),
    },
    containerHeight: {
      height: '96%',
    },
    accountBalance: {
      backgroundColor: themeColors.natural.natural3,
    },
    topWrapper: {
      height: '100%',
    },
    darkBlueText: {
      color: themeColors.primary.primary900,
    },
    progressBarBg: {
      backgroundColor: themeColors.success.success25,
    },
    redProgressBarBg: {
      backgroundColor: themeColors.error.error25,
    },
    greyText: {
      color: themeColors.natural.natural700,
    },
    billWrapper: {
      marginBottom: scale(12),
    },
    flatlist: {
      flex: 0,
    },
    darkText: {
      color: themeColors.natural.natural900,
    },
    listWrapper: {
      flex: 1,
    },
  });

export default billBalanceStyles;

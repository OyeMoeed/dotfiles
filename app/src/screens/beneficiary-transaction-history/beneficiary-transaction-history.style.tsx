import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { scale, verticalScale } from 'react-native-size-matters';

const transactionHistoryStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      height: '100%',
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: scale(4),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    contentContainer: {
      paddingHorizontal: scale(24),
      paddingVertical: verticalScale(16),
      paddingBottom: verticalScale(50),
      height: '100%',
    },
    flatlist: {
      flex: 0,
      marginTop: verticalScale(6),
    },
  });

export default transactionHistoryStyles;

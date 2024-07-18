import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const transactionHistoryStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      height: '100%',
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: scaleFont(4),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    contentContainer: {
      paddingHorizontal: scaleFont(24),
      paddingVertical: scaleFont(16),
      paddingBottom: scaleFont(50),
      height: '100%',
    },
    flatlist: {
      flex: 0,
      marginTop: scaleFont(6),
    },
  });

export default transactionHistoryStyles;

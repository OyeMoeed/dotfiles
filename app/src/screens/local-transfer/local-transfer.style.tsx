import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const localTransferStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    headerRightContent: {
      flexDirection: 'row',
      gap: scaleFont(4),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    noResultContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      gap: verticalScale(24),
      paddingBottom: scaleFont(100),
    },
    noResult: {
      gap: verticalScale(12),
    },
    btnStyle: {
      width: scaleSize(227),
      height: verticalScale(34),
    },
  });

export default localTransferStyles;

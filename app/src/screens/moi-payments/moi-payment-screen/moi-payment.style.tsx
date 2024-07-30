import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moiPaymentStyles = () =>
  createStyleSheet({
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      marginTop: moderateScale(6, 0.3),
    },
    contentContainer: {
      marginTop: scaleFont(24),
      gap: scaleFont(16),
    },
  });

export default moiPaymentStyles;

import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const sendMoneyFormStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    inncerContainer: {
      margin: moderateScale(16),
      flex: 1,
    },
    listContainer: {
      marginHorizontal: moderateScale(16),
    },
  });

export default sendMoneyFormStyles;

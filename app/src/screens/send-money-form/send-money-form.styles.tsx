import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const sendMoneyFormStyles = (theme: any) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    inncerContainer: {
      marginHorizontal: moderateScale(16),
      flex: 1,
    },
  });

export default sendMoneyFormStyles;

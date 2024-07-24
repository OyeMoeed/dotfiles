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
    buttonBackground: {
      flex: 0,
      backgroundColor: theme.appGradient.buttonBackground,
      borderRadius: moderateScale(24),
      padding: moderateScale(16),
      marginBottom: moderateScale(10),
    },
    alert:{
      marginBottom: moderateScale(32)
    }
  });

export default sendMoneyFormStyles;

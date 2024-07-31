import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const allOrdersStyles = () =>
  createStyleSheet({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: moderateScale(22, 0.3),
      marginVertical: moderateScale(22),
    },
  });

export default allOrdersStyles;

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const sadadBillsStyles = (colors: any) =>
  createStyleSheet({
    screenTitle: {
      textTransform: 'none',
    },
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    footerView: {
      marginHorizontal: moderateScale(24, 0.3),
      marginBottom: moderateScale(24, 0.3),
    },
  });

export default sadadBillsStyles;

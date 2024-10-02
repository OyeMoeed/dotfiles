import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const newBeneficiaryStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    btnStyle: {
      height: verticalScale(50),
    },
  });

export default newBeneficiaryStyles;

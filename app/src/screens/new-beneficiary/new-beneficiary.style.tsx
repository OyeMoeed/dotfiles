import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const newBeneficiaryStyles = () =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingTop: scaleFont(16),
    },
    capitalizeTitle: {
      textTransform: 'capitalize',
    },
    btnStyle: {
      height: verticalScale(50),
    },
  });

export default newBeneficiaryStyles;

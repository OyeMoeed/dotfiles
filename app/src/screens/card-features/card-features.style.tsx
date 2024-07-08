import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const cardFeaturesStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      backgroundColor: colors.natural.natural900,
    },
  });

export default cardFeaturesStyles;

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { heightPercent, widthPercent } from '@app/styles/mixins';
import { moderateScale } from 'react-native-size-matters';

const cardFeaturesStyles = (colors: any) =>
  createStyleSheet({
    background: {
      width: widthPercent('100%'),
      height: heightPercent('35%'),
      resizeMode: 'stretch',
      justifyContent: 'flex-start',
    },
    animatedContainer: {
      backgroundColor: colors.natural.natural100,
      flex: 1,
    },
    heightedView: {
      height: moderateScale(50),
      backgroundColor: colors.natural.natural100,
    },
  });

export default cardFeaturesStyles;

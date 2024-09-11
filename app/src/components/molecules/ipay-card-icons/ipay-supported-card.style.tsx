import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const ipaySupportedCardStyles = () =>
  createStyleSheet({
    cardIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },

    imageStyles: { width: scaleSize(28), height: scaleSize(20) },
  });

export default ipaySupportedCardStyles;

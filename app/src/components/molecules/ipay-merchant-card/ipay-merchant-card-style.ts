import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const merchantCardStyles = (theme: typeof colors) =>
  createStyleSheet({
    cardContainer: {
      backgroundColor: theme.natural.natural0,
      borderRadius: scaleSize(20),
      padding: scaleSize(10),
      width: moderateScale(100),
      height: moderateScale(130),
      gap: scaleSize(12),
    },
    imageContainer: {
      backgroundColor: theme.primary.primary10,
      borderRadius: scaleSize(8),
      alignItems: 'center',
      paddingHorizontal: scaleSize(18),
      paddingVertical: scaleSize(8),
    },
    cardImage: { width: moderateScale(48), height: moderateScale(48) },
    title: { textAlign: 'center' },
  });

export default merchantCardStyles;

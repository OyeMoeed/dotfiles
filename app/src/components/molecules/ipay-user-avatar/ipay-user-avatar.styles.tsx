import colors from '@app/styles/colors.const';

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale } from 'react-native-size-matters';

const userAvatarStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    image: {
      width: scale(80),
      height: scale(80),
      borderRadius: moderateScale(28),
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.natural.natural0,
    },
  });

export default userAvatarStyles;

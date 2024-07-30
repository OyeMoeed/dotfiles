import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const categoryCardStyle = (theme: typeof colors) =>
  createStyleSheet({
    cardBackground: {
      backgroundColor: theme.natural.natural0,
      borderRadius: moderateScale(1000),
      padding: moderateScale(20),
    },
    cardContainer: {
      gap: moderateScale(8),
      justifyContent: 'center',
      alignItems: 'center',
      //   width: moderateScale(110),
      //   marginVertical: moderateScale(20, 0.4),
    },
    image: {
      height: moderateScale(40),
      width: moderateScale(40),
    },
  });

export default categoryCardStyle;

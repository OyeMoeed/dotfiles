import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const giftListStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      backgroundColor: theme.natural.natural0,
      padding: moderateScale(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: moderateScale(20),
    },

    normalIconBackground: {
      backgroundColor: theme.primary.primary10,
      paddingVertical: moderateScale(20),
      padding: moderateScale(8),
      borderRadius: moderateScale(11),
      alignSelf: 'center',
    },
    iconBackground: {
      backgroundColor: theme.warning.warning25,
      paddingVertical: moderateScale(20),
      padding: moderateScale(8),
      borderRadius: moderateScale(11),
      alignSelf: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      gap: moderateScale(8),
    },
    leftContainer: {
      gap: moderateScale(4),
      alignItems: 'center',
    },
    textContainer: {
      gap: moderateScale(4),
    },
  });
export default giftListStyles;

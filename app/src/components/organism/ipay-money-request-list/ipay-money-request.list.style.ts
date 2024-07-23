import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moneyRequestListStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      backgroundColor: theme.natural.natural0,
      padding: moderateScale(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: moderateScale(20),
    },

    iconBackground: {
      backgroundColor: theme.primary.primary10,
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
    text: {
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
    },
    statusView: {
      borderRadius: moderateScale(8),
    },
  });
export default moneyRequestListStyles;

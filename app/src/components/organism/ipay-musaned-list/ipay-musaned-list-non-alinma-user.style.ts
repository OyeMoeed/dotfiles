import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const moneyRequestListStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      backgroundColor: theme.natural.natural0,
      padding: moderateScale(16),
      flexDirection: 'row',
      borderRadius: moderateScale(12),
      gap: moderateScale(12),
      justifyContent: 'space-between',
    },
    iconBackground: {
      backgroundColor: theme.primary.primary10,
      padding: moderateScale(10),
      borderRadius: moderateScale(15),
      alignSelf: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      gap: moderateScale(8),
    },
    leftContainer: {
      gap: moderateScale(4),
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    textContainer: {
      gap: moderateScale(4),
      justifyContent: 'space-between',
    },
    logoIcon: {
      height: scaleSize(22.5),
      width: scaleSize(22.5),
    },
    text: {
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
    },
    statusView: {
      borderRadius: moderateScale(8),
    },
    listContainer: {
      alignSelf: 'center',
    },
  });
export default moneyRequestListStyles;

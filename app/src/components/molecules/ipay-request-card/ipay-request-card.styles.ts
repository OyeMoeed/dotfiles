import { Colors } from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const getRequestCardStyles = (colors: Colors) =>
  createStyleSheet({
    cardContainer: {
      backgroundColor: colors.natural.natural0,
      padding: moderateScale(18),
      flexDirection: 'row',
      borderRadius: moderateScale(28),
      marginBottom: moderateScale(10),
    },
    requestInfo: {
      flex: 1,
    },
    iconTextRow: {
      flexDirection: 'row',
      gap: moderateScale(8),
      marginBottom: moderateScale(9),
    },
    actionInfo: {
      justifyContent: 'space-between',
      marginLeft: moderateScale(16),
    },
    statusContainer: {
      paddingVertical: moderateScale(2),
      paddingHorizontal: moderateScale(10),
      borderRadius: moderateScale(8),
      alignSelf: 'flex-end',
    },
    dateStyle: {
      marginTop: moderateScale(12),
    },
  });

export default getRequestCardStyles;

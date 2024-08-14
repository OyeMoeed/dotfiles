import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const IPayOrdersCardStyle = (theme: typeof colors) =>
  createStyleSheet({
    cardBackground: {
      gap: moderateScale(15),
    },
    flex: {
      flex: 0,
    },
    cardRow: {
      flexDirection: 'row',
      gap: moderateScale(16),
    },
    cardContainer: {
      width: '100%',
      marginVertical: moderateScale(8),
      padding: moderateScale(24),
      backgroundColor: theme.natural.natural0,
      borderRadius: moderateScale(24),
    },
    itemContainer: {
      flexDirection: 'row',
    },
    image: {
      height: moderateScale(90),
      width: moderateScale(90),
    },
    textView: {
      width: moderateScale(200),
      gap: moderateScale(8),
    },
    couponRow: {
      flexDirection: 'row',
      gap: moderateScale(10),
    },
    dateRow: {
      flexDirection: 'row',
      gap: moderateScale(4),
    },
    buttonRow: {
      paddingTop: moderateScale(9),
      flexDirection: 'row',
      gap: moderateScale(8),
      justifyContent: 'space-between',
    },
    buttonStyles: {
      flex: 1 / 2,
    },
  });

export default IPayOrdersCardStyle;

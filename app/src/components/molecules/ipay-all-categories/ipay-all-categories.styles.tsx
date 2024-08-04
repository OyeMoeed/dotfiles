import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const IPayAllCategoriesStyle = (theme: typeof colors) =>
  createStyleSheet({
    cardBackground: {
      backgroundColor: theme.natural.natural0,
      borderRadius: moderateScale(1000),
      padding: moderateScale(20),
    },
    flex: {
      flex: 0,
    },
    cardContainer: {
      gap: moderateScale(8),
      justifyContent: 'center',
      alignItems: 'center',
      width: moderateScale(110),
      marginVertical: moderateScale(20, 0.4),
    },
    itemContainer: {
      flexDirection: 'row',
    },
    image: {
      height: moderateScale(40),
      width: moderateScale(40),
    },
  });

export default IPayAllCategoriesStyle;

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
      width: moderateScale(110),
      marginVertical: moderateScale(20, 0.4),
    },
    itemContainer: {
      flexDirection: 'row',
    },
  });

export default IPayAllCategoriesStyle;

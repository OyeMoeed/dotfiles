import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const shopCategoriesStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      marginTop: moderateScale(14),
      marginHorizontal: moderateScale(13, 0.2),
      gap: moderateScale(15),
    },
    tabs: {
      marginHorizontal: moderateScale(24),
      gap: moderateScale(8),
      marginBottom: moderateScale(10),
      marginTop: moderateScale(14),
    },
    unselectedTab: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(10) },
    background: {
      backgroundColor: theme.natural.natural0,
      justifyContent: 'center',
      width: moderateScale(300),
      height: moderateScale(40),
    },
    searchRow: {
      gap: moderateScale(12),
      marginHorizontal: moderateScale(24, 0.2),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default shopCategoriesStyles;

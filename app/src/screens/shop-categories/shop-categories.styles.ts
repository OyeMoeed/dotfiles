import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const shopCategoriesStyles = (theme: typeof colors) =>
  createStyleSheet({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
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
    background: { backgroundColor: theme.natural.natural0, justifyContent: 'center', width: moderateScale(300) },
    searchRow: {
      gap: moderateScale(12),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default shopCategoriesStyles;

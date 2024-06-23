import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { variants } from '@app/utilities/enums.util';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = (colors) =>
  createStyleSheet({
    container: {
      borderRadius: moderateScale(10),
      padding: moderateScale(16),
      marginVertical: moderateScale(8),
      marginHorizontal: moderateScale(16),
    },
    [variants.NORMAL]: {
      shadowColor: colors.natural.natural1000,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(5),
      elevation: 3,
    },
    [variants.PRIMARY]: {
      shadowColor: colors.natural.natural1000,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: moderateScale(10),
      elevation: 5,
    },
    [variants.SECONDARY]: {
      shadowColor: colors.natural.natural1000,
      shadowOffset: { width: 0, height: verticalScale(10) },
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(20),
      elevation: moderateScale(10),
    },
  });

export default styles;

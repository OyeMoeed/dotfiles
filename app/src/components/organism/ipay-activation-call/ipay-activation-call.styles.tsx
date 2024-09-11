import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const activationCallStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      gap: verticalScale(16),
      alignItems: 'center',
      paddingTop: scaleSize(20),
    },
    iconWrapper: {
      backgroundColor: colors.primary.primary500,
      justifyContent: 'center',
      alignItems: 'center',
      width: scaleSize(46),
      height: scaleSize(34),
      borderRadius: moderateScale(15),
    },

    listContainer: { backgroundColor: colors.primary.primary10 },
    childrenStyles: {
      marginBottom: moderateScale(16),
      marginHorizontal: moderateScale(16),
    },
    desStyle: {
      color: colors.primary.primary800,
      textAlign: 'center',
      marginBottom: moderateScale(8),
    },
    stepStyle: {
      color: colors.primary.primary800,
    },
    stepViewStyle: {
      backgroundColor: colors.primary.primary10,
      padding: moderateScale(8),
      width: moderateScale(35),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(11),
    },
    containerStyle: { backgroundColor: colors.natural.natural0, borderRadius: moderateScale(28) },
    curveStyle: { borderRadius: moderateScale(28) },
  });

export default activationCallStyles;

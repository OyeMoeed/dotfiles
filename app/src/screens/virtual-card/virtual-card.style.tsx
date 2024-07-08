import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { moderateScale, verticalScale } from 'react-native-size-matters';
const virtualCardStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    headerGap: {
      marginVertical: verticalScale(8),
    },
    background: {
      width: wp('100%'),
      height: hp('30%'),
      resizeMode: 'stretch',
      justifyContent: 'flex-start',
    },
    animatedContainer: {
      backgroundColor: colors.natural.natural100,
      flex: 1,
      padding: moderateScale(24),
    },
    bottomContainer: {
      justifyContent: 'flex-end',
      padding: moderateScale(24),
      backgroundColor: colors.natural.natural100,
    },
    marginStyles: { marginBottom: verticalScale(12) },
    expandedBorderRadius: {
      borderTopLeftRadius: moderateScale(48),
      borderTopRightRadius: moderateScale(48),
    },
    outStyles: {
      marginTop: verticalScale(24),
    },
    naturalBg: { backgroundColor: colors.natural.natural100 },
  });

export default virtualCardStyles;

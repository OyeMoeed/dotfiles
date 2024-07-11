import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const statusSuccessStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    headerView: {
      width: '100%',
      alignItems: 'center',
    },
    linearGradientTextView: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: moderateScale(16),
      marginBottom: moderateScale(12),
    },
    innerLinearGradientView: {
      borderRadius: moderateScale(48),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: scaleSize(20),
      paddingTop: moderateScale(40),
      paddingBottom: scaleSize(20),
      width: '100%',
      paddingHorizontal: moderateScale(20, 0.3),
    },
    successIcon: {
      width: moderateScale(80),
      height: moderateScale(80),
    },
    linearGradientText: {
      fontSize: moderateScale(22),
      fontFamily: fonts.BOLD,
      marginBottom: moderateScale(12),
      color: colors.primary.primary800,
    },
    gradientTextSvg: {
      width: '100%',
      paddingHorizontal: moderateScale(24, 0.3),
      marginBottom: moderateScale(12),
    },
    dataView: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      marginTop: moderateScale(24),
    },
    itemSeparatorStyle: {
      height: verticalScale(8),
    },
    dataCardView: {
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      height: moderateScale(48),
      paddingHorizontal: moderateScale(18, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailsView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginStart: moderateScale(8, 0.3),
    },
    buttonsView: {
      flex: 0.5,
      width: '100%',
    },
  });

export default statusSuccessStyles;

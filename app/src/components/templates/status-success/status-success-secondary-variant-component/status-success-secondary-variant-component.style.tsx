import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { fonts } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const statusSuccessSecondaryVariantStyles = (colors: any) =>
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
  });

export default statusSuccessSecondaryVariantStyles;

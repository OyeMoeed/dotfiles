import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_WEIGHT_BOLD, fonts } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const cardStyles = (colors: any) =>
  createStyleSheet({
    atmCardView: {
      height: moderateScale(75, 0.4),
      marginHorizontal: moderateScale(24, 0.3),
      marginVertical: moderateScale(16, 0.3),
    },
    atmCardImg: {
      height: moderateScale(75, 0.4),
      width: '100%',
      alignItems: 'centers',
    },
    cartInfoView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'cneter',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(16, 0.1),
    },
    titleAndCardNumberView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(5),
    },
    cardNumberText: {
      marginStart: moderateScale(6, 0.3),
    },
    cashBackText: {
      fontFamily: fonts.BOLD,
      fontSize: moderateScale(8, 0.4),
      fontStyle: 'normal',
      fontWeight: FONT_WEIGHT_BOLD,
      lineHeight: scaleSize(13),
      letterSpacing: scaleSize(3),
    },
    cardlogoView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    visaLogoView: {
      marginStart: moderateScale(8, 0.3),
      marginEnd: moderateScale(12, 0.3),
    },
    gradientLogo: {
      width: verticalScale(11),
      height: verticalScale(16),
    },
  });

export default cardStyles;

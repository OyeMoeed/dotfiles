import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_8 } from '@app/styles/spacing.const';
import { FONT_SIZE_10, typography } from '@app/styles/typography.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (colors: any) =>
  createStyleSheet({
    container: {
      minHeight: verticalScale(310),
      width: scaleSize(320),
      borderRadius: moderateScale(48),
      paddingHorizontal: moderateScale(32),
      paddingTop: moderateScale(32),
      paddingBottom: moderateScale(16),
      backgroundColor: colors.natural.natural0,
    },
    tagViewContainer: {
      backgroundColor: colors.secondary.secondary100,
      paddingHorizontal: scaleSize(8),
      paddingVertical: scaleSize(3),
      borderRadius: 100,
      position: 'absolute',
      right: scale(6),
      top: scale(0),
      zIndex: 1111,
    },
    tagViewText: {
      fontSize: SCALE_8,
      color: colors.secondary.secondary500,
    },
    eyeCon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textStyle: {
      marginRight: moderateScale(8),
      color: colors.natural.natural700,
    },
    commonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textBold: {
      fontWeight: typography.BOLD_TEXT_STYLES.fontWeight,
    },
    balanceContainer: {
      flexDirection: 'row',
    },
    currencyStyle: {
      alignSelf: 'flex-end',
    },
    btnStyle: {
      minHeight: moderateScale(34),
      width: moderateScale(99),
      height: 'auto',
      backgroundColor: colors.primary.primary500,
      borderRadius: moderateScale(12),
      justifyContent: 'center',
    },
    gap: {
      marginTop: moderateScale(12),
    },
    lineBorderStyle: {
      borderWidth: 1,
      borderColor: colors.secondary.secondary100,
      width: '100%',
      marginVertical: moderateScale(16),
    },
    balanceTextStyle: {
      fontWeight: '900',
    },
    iconConStyle: {
      width: moderateScale(48),
      minHeight: moderateScale(48),
      borderRadius: moderateScale(18),
      backgroundColor: colors.backgrounds.greyOverlay,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: moderateScale(8),
    },
    carouselContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: moderateScale(8),
      borderWidth: moderateScale(1),
      borderColor: 'red',
    },
    subContainer: {
      width: scaleSize(90),
      height: verticalScale(70),
      alignItems: 'center',
    },
    paginationStyle: {
      width: moderateScale(30),
      height: moderateScale(4),
    },
    iconTextStyle: {
      fontSize: FONT_SIZE_10,
      fontWeight: '400',
      color: colors.primary.primary900,
    },
    spaceAround: {
      justifyContent: 'space-around',
      marginBottom: moderateScale(6),
    },
    spaceBetween: {
      justifyContent: 'space-between',
      marginBottom: moderateScale(6),
    },
  });

export default genratedStyles;

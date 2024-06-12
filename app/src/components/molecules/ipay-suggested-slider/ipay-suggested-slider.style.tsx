import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_16, SCALE_28, SCALE_48, SCALE_70, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_13, FONT_SIZE_15 } from '@app/styles/typography.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const genratedStyles = (colors: any) =>
  createStyleSheet({
    mainContainer: {
      width: spacing.CUSTOME_SCALE(270),
      height: spacing.CUSTOME_SCALE(270),
      borderRadius: SCALE_48,
      marginVertical: moderateScale(16),
      marginHorizontal: moderateScale(10),
    },
    container: {
      paddingVertical: SCALE_28,
      paddingHorizontal: spacing.CUSTOME_SCALE(23),
      borderRadius: SCALE_48,
      justifyContent: 'space-between',
    },
    flexContainer: {
      width: '100%',
    },
    commonConStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imagContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      width: spacing.CUSTOME_SCALE(192),
      height: spacing.CUSTOME_SCALE(153),
    },
    footnoteTextStyle: {
      fontWeight: '400',
      fontSize: FONT_SIZE_13,
      color: colors.natural.natural900,
      lineHeight: verticalScale(18),
      marginLeft: moderateScale(4),
    },
    captionTextStyle: {
      fontSize: FONT_SIZE_11,
      alignSelf: 'center',
      lineHeight: verticalScale(13),
    },
    largeTextStyle: {
      fontWeight: '700',
      color: colors.natural.natural900,
      fontSize: moderateScale(34),
      lineHeight: verticalScale(41),
    },
    subHeadingTextStyle: {
      fontSize: FONT_SIZE_15,
      fontWeight: '400',
      color: colors.natural.natural900,
      lineHeight: verticalScale(20),
    },
    historyContStyle: {
      width: '100%',
      height: SCALE_70,
      borderRadius: SCALE_28,
      backgroundColor: colors.white,
      marginVertical: SCALE_16,
    },
  });

export default genratedStyles;

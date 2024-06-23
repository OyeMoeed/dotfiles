import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_18, SCALE_28, SCALE_8, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_11, FONT_SIZE_12 } from '@app/styles/typography.styles';

const bannerAnimationStyles = (colors: any) =>
  createStyleSheet({
    container: {
      minWidth: '100%',
      height: spacing.CUSTOME_SCALE(90),
      backgroundColor: colors.natural.natural200,
      borderRadius: SCALE_28,
      paddingRight: spacing.CUSTOME_SCALE(17),
      overflow: 'hidden',
      marginVertical: spacing.CUSTOME_SCALE(16),
    },
    subContainerStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.natural.natural200,
      borderRadius: SCALE_28,
      paddingRight: spacing.CUSTOME_SCALE(17),
      overflow: 'hidden',
    },
    bannerContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: SCALE_28,
      padding: SCALE_18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      width: spacing.CUSTOME_SCALE(18),
      height: spacing.CUSTOME_SCALE(18),
      marginRight: SCALE_8,
    },
    footnoteTextStyle: {
      fontWeight: '700',
      fontSize: FONT_SIZE_12,
      color: colors.natural.natural900,
    },
    commonContainer: {
      flexDirection: 'row',
    },
    captionStyle: {
      fontWeight: '400',
      fontSize: FONT_SIZE_11,
      color: colors.natural.natural900,
      marginTop: SCALE_8,
    },
    buttonStyle: {
      width: 92,
      height: 34,
      backgroundColor: colors.primary.primary500,
      borderRadius: spacing.CUSTOME_SCALE(12),
      justifyContent: 'center',
    },
  });

export default bannerAnimationStyles;

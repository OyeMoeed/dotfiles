import createStyleSheet from '@app/styles/scaled-sheet.styles';
import {
  SCALE_10,
  SCALE_100,
  SCALE_12,
  SCALE_16,
  SCALE_32,
  SCALE_4,
  SCALE_48,
  SCALE_8,
  spacing,
} from '@app/styles/spacing.const';

const latestOfferStyles = (colors: any) =>
  createStyleSheet({
    container: {
      minHeight: spacing.CUSTOME_SCALE(124),
      width: spacing.CUSTOME_SCALE(263),
      height: 'auto',
      borderRadius: SCALE_16,
      marginVertical: SCALE_16,
      overflow: 'hidden',
      marginBottom: SCALE_48,
      marginHorizontal: SCALE_8,
    },
    imageStyle: {
      width: spacing.CUSTOME_SCALE(36),
      height: spacing.CUSTOME_SCALE(36),
      borderRadius: SCALE_8,
    },
    lineImageStyle: {
      width: spacing.CUSTOME_SCALE(2),
      height: spacing.CUSTOME_SCALE(76),
    },
    commonContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftCircleStyle: {
      width: SCALE_32,
      height: SCALE_32,
      backgroundColor: colors.backgrounds.greyOverlay,
      borderRadius: SCALE_100,
      marginLeft: spacing.CUSTOME_SCALE(-15),
    },
    rightCircleStyle: {
      width: SCALE_32,
      height: SCALE_32,
      backgroundColor: colors.backgrounds.greyOverlay,
      borderRadius: SCALE_100,
      marginRight: spacing.CUSTOME_SCALE(-15),
    },
    footnoteTextStyle: {
      fontSize: SCALE_12,
      fontWeight: '400',
      color: colors.primary.primary800,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SCALE_4,
    },
    headingTextStyle: {
      fontSize: SCALE_16,
      fontWeight: '700',
      color: colors.primary.primary800,
    },
    captionTextStyle: {
      fontSize: SCALE_12,
      fontWeight: '700',
      color: colors.primary.primary800,
    },
    captionsTextStyle: {
      fontWeight: '400',
      fontSize: SCALE_10,
      color: colors.primary.primary900,
    },
    detailsWrapperView: {
      height: spacing.CUSTOME_SCALE(74),
      justifyContent: 'space-between',
    },
  });

export default latestOfferStyles;
